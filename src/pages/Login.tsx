import { useLoginMutation } from "@/generated/graphql.tsx";
import { LoginLayout } from "@/layout/LoginLayout.tsx";
import { auth, authProvider } from "@/util/firebase";
import { LoadingButton } from "@mui/lab";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import {
  AuthError,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FC, FormEvent, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login: FC = () => {
  const { setAuthState } = useAuth();

  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [emailAuthLoading, setEmailAuthLoading] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const signIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setEmailAuthLoading(true);
      try {
        const loginResponse = await login({
          variables: {
            name: username,
            password: password,
          },
        });
        if (
          !loginResponse.errors &&
          loginResponse.data &&
          loginResponse.data.login
        ) {
          setAuthState((draft) => {
            draft.authMethod = "password";
            draft.isLoggedIn = true;
            draft.user = loginResponse.data?.login?.user ?? null;
            draft.token = loginResponse.data?.login?.token ?? null;
          });
          if (import.meta.env.DEV) {
            console.log("User token:", loginResponse.data.login.token);
          }
          navigate("/");
        }
      } finally {
        setEmailAuthLoading(false);
      }
    },
    [login, username, password, setAuthState, navigate],
  );

  const signInWithGoogle = useCallback(async () => {
    setGoogleAuthLoading(true);
    await auth.setPersistence(browserLocalPersistence);
    await signInWithPopup(auth, authProvider)
      .catch((error: AuthError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          "Sign-in error:" + errorCode,
          errorMessage,
          email,
          credential,
        );
      })
      .finally(() => setGoogleAuthLoading(false));
  }, []);

  return (
    <LoginLayout headerText="Bejelentkezés" loading={googleAuthLoading}>
      <form onSubmit={signIn}>
        <Stack justifyContent="center" gap={2} height="100%">
          <TextField
            required
            label="Felhasználónév"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            size="small"
          />
          <TextField
            required
            label="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="small"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={emailAuthLoading}
          >
            Bejelentkezés
          </LoadingButton>
        </Stack>
      </form>
      <Divider />
      <Button
        variant="outlined"
        onClick={signInWithGoogle}
        startIcon={<FcGoogle />}
        disabled={googleAuthLoading}
        sx={{ mt: 2 }}
      >
        Google
      </Button>
      <Link to="/register">
        <Typography textAlign="right" mt="auto" sx={{ cursor: "pointer" }}>
          Regisztráció
        </Typography>
      </Link>
    </LoginLayout>
  );
};

export default Login;
