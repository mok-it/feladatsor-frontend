import { userAtom } from '@/util/atoms';
import { auth, authProvider } from '@/util/firebase';
import { Button, Stack } from '@mui/material';
import { AuthError, GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import { FC, useCallback } from 'react';

const Login: FC = () => {
  const setUser = useSetAtom(userAtom)

  const signIn = useCallback(() => {
    signInWithPopup(auth, authProvider)
      .then((result) => {
        const userData: User = result.user;
        userData.getIdToken().then((token) => {
          console.log('Sign-in success', token);
        });
        setUser(userData);
      })
      .catch((error: AuthError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Sign-in error:' + errorCode, errorMessage, email, credential);
      });
  }, [setUser]);

  return <Stack alignItems={"center"} justifyContent={"center"}>
    <Button onClick={signIn}>
      Bejelentkezés
    </Button>

  </Stack>
}

export default Login;