import {
  useLoginMutation,
  useLoginWithGoogleMutation,
} from "@/generated/graphql.tsx";
import { tokenAtom, userAtom } from "@/util/atoms";
import { auth, authProvider } from "@/util/firebase";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetAtom } from "jotai";
import { Link } from "react-router-dom";
import { FC, useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

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
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "url(https://picsum.photos/1920/1080)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          position: "absolute",
        }}
      />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Card
            sx={{
              p: 2,
              width: {
                xs: "90%",
                sm: "50%",
                md: "30%",
                lg: "20%",
              },
              height: "auto",
            }}
          >
            <Stack justifyContent="center" gap={2} height="100%">
              <Typography variant="h4" textAlign="center">
                Bejelentkezés
              </Typography>
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
                <Typography
                  textAlign="right"
                  mt="auto"
                  sx={{ cursor: "pointer" }}
                >
                  Regisztráció
                </Typography>
              </Link>
            </Stack>
          </Card>
        </Stack>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Login;
