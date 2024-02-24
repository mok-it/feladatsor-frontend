import { useLoginWithGoogleMutation } from "@/generated/graphql.tsx";
import { tokenAtom, userAtom } from "@/util/atoms";
import { auth, authProvider } from "@/util/firebase";
import {
  Box,
  Button,
  Card,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthError, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetAtom } from "jotai";
import { FC, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";

const Login: FC = () => {
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const [ownLogin] = useLoginWithGoogleMutation();

  const signIn = useCallback(async () => {
    await signInWithPopup(auth, authProvider)
      .then(async (googleAuthResult) => {
        const googleToken = await googleAuthResult.user.getIdToken();
        const ownLoginResponse = await ownLogin({
          variables: {
            googleToken: googleToken,
          },
        });
        if (
          !ownLoginResponse.errors &&
          ownLoginResponse.data?.loginWithGoogle?.user
        ) {
          setUser(ownLoginResponse.data.loginWithGoogle.user);
          setToken(ownLoginResponse.data.loginWithGoogle.token);
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
      });
  }, [setUser, setToken, ownLogin]);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          background: "url(https://source.unsplash.com/1920x1080/?landscape)",
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
                defaultValue=""
                size="small"
              />
              <TextField
                required
                label="Jelszó"
                defaultValue=""
                type="password"
                size="small"
              />
              <Button variant="contained" fullWidth>
                Bejelentkezés
              </Button>
              <Divider />
              <Button
                variant="outlined"
                onClick={signIn}
                startIcon={<FcGoogle />}
                sx={{ mt: 2 }}
              >
                Google
              </Button>
              <Link textAlign="right" mt="auto">
                Regisztráció
              </Link>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
