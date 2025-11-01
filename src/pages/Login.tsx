import {
  useLoginMutation,
  useLoginWithGoogleMutation,
} from "@/generated/graphql.tsx";
import { LoginLayout } from "@/layout/LoginLayout.tsx";
import { tokenAtom, userAtom } from "@/util/atoms";
import { auth, authProvider } from "@/util/firebase";
import { LoadingButton } from "@mui/lab";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetAtom } from "jotai";
import { FC, FormEvent, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [emailAuthLoading, setEmailAuthLoading] = useState(false);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ownLogin] = useLoginWithGoogleMutation();
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
          setUser({
            isLoggedIn: true,
            user: loginResponse.data.login.user,
          });
          setToken(loginResponse.data.login?.token);
          console.log("User token:", loginResponse.data.login.token);
          navigate("/");
        }
      } finally {
        setEmailAuthLoading(false);
      }
    },
    [login, username, password, setUser, setToken, navigate],
  );

  const signInWithGoogle = useCallback(async () => {
    setGoogleAuthLoading(true);
    await signInWithPopup(auth, authProvider)
      .then(async (googleAuthResult) => {
        const googleToken = await googleAuthResult.user.getIdToken();
        console.log("Google token:", googleToken);
        const ownLoginResponse = await ownLogin({
          variables: {
            googleToken: googleToken,
          },
        });
        if (
          !ownLoginResponse.errors &&
          ownLoginResponse.data?.loginWithGoogle?.user
        ) {
          setUser({
            isLoggedIn: true,
            user: ownLoginResponse.data.loginWithGoogle.user,
          });
          setToken(ownLoginResponse.data.loginWithGoogle.token);
          console.log(
            "User token:",
            ownLoginResponse.data.loginWithGoogle.token,
          );
        }
      })
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
  }, [setUser, setToken, ownLogin]);

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
