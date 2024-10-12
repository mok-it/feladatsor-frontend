import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { FC, useCallback, useState } from "react";
import { useRegisterMutation } from "@/generated/graphql.tsx";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  name: string;
  userName: string;
  email: string;
  password: string;
};

const RegisterPage: FC = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState<RegisterForm>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value); // Handle confirmPassword changes
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRegisterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onRegister = useCallback(async () => {
    setPasswordError(null);
    //Successful registration
    await register({
      variables: {
        data: {
          email: registerValues.email,
          name: registerValues.name,
          password: registerValues.password,
          userName: registerValues.userName,
        },
      },
    });

    setConfirmPassword(" ");
    setRegisterValues({
      name: "",
      userName: "",
      email: "",
      password: "",
    });
    navigate("/login");
  }, [registerValues]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ p: 2, width: 400 }}>
        <Typography variant="h4" align="center">
          Register
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            onChange={handleChange}
            name={"name"}
            value={registerValues.name}
          />
          <TextField
            label="Username"
            variant="outlined"
            onChange={handleChange}
            name={"userName"}
            value={registerValues.userName}
          />
          <TextField
            label="Email"
            variant="outlined"
            name={"email"}
            value={registerValues.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            onChange={handleChange}
            name={"password"}
            value={registerValues.password}
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            name={"confirmPassword"}
            onChange={(e) => {
              handleConfirmPasswordChange(e); // Call the function to update the state
              if (registerValues.password !== e.target.value) {
                setPasswordError("Passwords do not match");
              } else {
                setPasswordError(""); // Clear the error if passwords match
              }
            }}
            value={confirmPassword}
          />
          {passwordError && (
            <Typography color="error" variant="body2">
              {passwordError}
            </Typography>
          )}

          <Button variant="contained" onClick={onRegister}>
            Register
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default RegisterPage;
