import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { FC, useCallback, useState } from "react";
import { useRegisterMutation } from "@/generated/graphql.tsx";
import { Link, useNavigate } from "react-router-dom";
import { LoginLayout } from "@/layout/LoginLayout.tsx";
import { Formik, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type RegisterFormFieldTypes = {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: FC = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onRegister = useCallback(
    async (values: RegisterFormFieldTypes) => {
      await register({
        variables: {
          data: {
            email: values.email,
            name: values.name,
            password: values.password,
            userName: values.userName,
          },
        },
      });
      enqueueSnackbar("Sikeres regisztráció", { variant: "success" });

      navigate("/login");
    },
    [register],
  );

  return (
    <LoginLayout headerText={"Regisztráció"}>
      <Formik<RegisterFormFieldTypes>
        onSubmit={onRegister}
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          userName: "",
        }}
      >
        <RegisterFormFields />
      </Formik>
      <Link to="/login">
        <Typography textAlign="right" mt="auto" sx={{ cursor: "pointer" }}>
          Bejelentkezés
        </Typography>
      </Link>
    </LoginLayout>
  );
};

const RegisterFormFields: FC<object> = () => {
  const { values, setFieldValue, submitForm } =
    useFormikContext<RegisterFormFieldTypes>();
  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const typedSetFieldValue = setFieldValue as (
    field: keyof RegisterFormFieldTypes,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ) => void;

  return (
    <>
      <TextField
        label="Név"
        variant="outlined"
        onChange={(event) => typedSetFieldValue("name", event.target.value)}
        name="name"
        value={values.name}
        size="small"
      />
      <TextField
        label="Felhasználónév"
        variant="outlined"
        onChange={(event) => typedSetFieldValue("userName", event.target.value)}
        name={"userName"}
        value={values.userName}
        size="small"
      />
      <TextField
        label="Email"
        variant="outlined"
        name={"email"}
        value={values.email}
        size="small"
        onChange={(event) => typedSetFieldValue("email", event.target.value)}
      />
      <TextField
        label="Jelszó"
        variant="outlined"
        onChange={(event) => typedSetFieldValue("password", event.target.value)}
        name={"password"}
        value={values.password}
        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
        size="small"
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Jelszó megerősítése"
        variant="outlined"
        name="confirmPassword"
        onChange={(event) =>
          typedSetFieldValue("confirmPassword", event.target.value)
        }
        type="password"
        value={values.confirmPassword}
        size="small"
      />
      {values.password !== values.confirmPassword && (
        <Typography color="error" variant="body2">
          Passwords do not match
        </Typography>
      )}

      <Button variant="contained" onClick={submitForm}>
        Regisztráció
      </Button>
    </>
  );
};

export default RegisterPage;
