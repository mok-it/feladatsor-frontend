import {
  LoginWithGoogleDocument,
  User as TotalUser,
} from "@/generated/graphql.tsx";
import { createApolloClient } from "@/main";
import { auth } from "@/util/firebase";
import dayjs from "dayjs";
import { signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSnackbar } from "notistack";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Updater } from "use-immer";

type User = Omit<TotalUser, "exercises" | "__typename" | "comments" | "stats">;

type AuthContextType = {
  isLoggedIn: boolean | null;
  user: User | null;
  token: string | null;
  authMethod: "password" | "firebase" | null;
};
type AuthContextActions = {
  setAuthState: Updater<AuthContextType>;
  signOut: () => void;
};

const defaultValue: AuthContextType & AuthContextActions = {
  isLoggedIn: null,
  user: null,
  token: null,
  authMethod: null,
  setAuthState: () => {},
  signOut: () => {},
};

const AuthContext = createContext<AuthContextType & AuthContextActions>(
  defaultValue,
);

const atom = withImmer(
  atomWithStorage<AuthContextType>(
    "auth",
    defaultValue,
    createJSONStorage<AuthContextType>(() => sessionStorage),
  ),
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [value, setAuthState] = useAtom(atom);
  const { token, authMethod } = value;

  const getToken = useCallback(async () => {
    const googleToken = await auth.currentUser?.getIdToken();
    const client = createApolloClient({ token: null, enqueueSnackbar });
    const ownLoginResponse = await client.mutate({
      mutation: LoginWithGoogleDocument,
      variables: {
        googleToken: googleToken,
      },
    });
    if (!ownLoginResponse.errors && !!ownLoginResponse.data) {
      setAuthState((draft) => {
        draft.authMethod = "firebase";
        draft.isLoggedIn = true;
        draft.user = ownLoginResponse.data?.loginWithGoogle?.user ?? null;
        draft.token = ownLoginResponse.data?.loginWithGoogle?.token ?? null;
      });
      if (import.meta.env.DEV) {
        console.log(
          "User token:",
          ownLoginResponse.data.loginWithGoogle?.token,
        );
      }
    }
  }, [enqueueSnackbar, setAuthState]);

  useEffect(() => {
    if (authMethod === "password") return;
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log(`logged ${user ? "in" : "out"}`);
      if (user) {
        getToken();
      } else {
        setAuthState((draft) => {
          draft.authMethod = null;
          draft.isLoggedIn = false;
          draft.user = null;
          draft.token = null;
        });
      }
    });
    return () => unsub();
  }, [authMethod, getToken, setAuthState]);

  const tokenExpired = useCallback(() => {
    if (authMethod === null) return;
    if (authMethod === "firebase") {
      getToken();
    } else if (authMethod === "password") {
      setAuthState((draft) => {
        draft.authMethod = null;
        draft.isLoggedIn = false;
        draft.user = null;
        draft.token = null;
      });
    }
  }, [authMethod, getToken, setAuthState]);

  useEffect(() => {
    if (!token) return;
    let decoded: JwtPayload;
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      console.log(e);
      return;
    }
    if (!decoded.exp) return;
    if (import.meta.env.DEV) {
      console.log(
        "token exp",
        dayjs(decoded.exp * 1000).format("YYYY-MM-DD HH:mm:ss"),
      );
    }
    const delay = dayjs(decoded.exp * 1000).diff(dayjs(), "ms");
    if (delay <= 0) {
      tokenExpired();
      return;
    }
    const timeout = setTimeout(tokenExpired, delay);
    return () => clearTimeout(timeout);
  }, [token, tokenExpired]);

  const signOut = () => {
    if (authMethod === "firebase") {
      firebaseSignOut(auth);
    } else if (authMethod === "password") {
      setAuthState((draft) => {
        draft.authMethod = null;
        draft.isLoggedIn = false;
        draft.user = null;
        draft.token = null;
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...value, setAuthState, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
