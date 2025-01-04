import {
  useLoginMutation,
  useLoginWithGoogleMutation,
} from "@/generated/graphql.tsx";
import { tokenAtom, userAtom } from "@/util/atoms";
import { auth, authProvider } from "@/util/firebase";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoginLayout } from "@/layout/LoginLayout.tsx";

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ownLogin] = useLoginWithGoogleMutation();
  const [login] = useLoginMutation();

  const signIn = useCallback(async () => {
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
  }, [setUser, setToken, login, username, password]);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
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
      .finally(() => setLoading(false));
  }, [setUser, setToken, ownLogin]);

  return (
    <LoginLayout headerText="Bejelentkezés" loading={loading}>
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
      <Button variant="contained" fullWidth onClick={signIn}>
        Bejelentkezés
      </Button>
      <Divider />
      <Button
        variant="outlined"
        onClick={signInWithGoogle}
        startIcon={<FcGoogle />}
        disabled={loading}
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
