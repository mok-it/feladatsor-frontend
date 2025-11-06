import {
  LoginWithGoogleDocument,
  User as TotalUser,
} from "@/generated/graphql.tsx";
import { createApolloClient } from "@/main";
import { auth } from "@/util/firebase";
import dayjs from "dayjs";
import { onAuthStateChanged } from "firebase/auth";
import { useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { jwtDecode } from "jwt-decode";
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
};

const defaultValue: AuthContextType & AuthContextActions = {
  isLoggedIn: null,
  user: null,
  token: null,
  authMethod: null,
  setAuthState: () => {},
};

const AuthContext = createContext<AuthContextType & AuthContextActions>(
  defaultValue,
);

const atom = withImmer(
  atomWithStorage<AuthContextType>(
    "auth",
    defaultValue,
    createJSONStorage<AuthContextType>(() => localStorage),
  ),
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setAuthState] = useAtom(atom);
  const { token, authMethod } = value;

  const getToken = useCallback(async () => {
    const googleToken = await auth.currentUser?.getIdToken();
    const client = createApolloClient({ errorLink: null, token: null });
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
      console.log("User token:", ownLoginResponse.data.loginWithGoogle?.token);
    }
  }, [setAuthState]);

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
    const decoded = jwtDecode(token);
    if (!decoded.exp) return;
    console.log(
      "token exp",
      dayjs(decoded.exp * 1000).format("YYYY-MM-DD HH:mm:ss"),
    );
    const timeout = setTimeout(
      tokenExpired,
      dayjs(decoded.exp * 1000).diff(dayjs(), "ms"),
    );
    return () => clearTimeout(timeout);
  }, [token, tokenExpired]);

  return (
    <AuthContext.Provider value={{ ...value, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
