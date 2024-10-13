import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useAtomValue } from "jotai/index";
import { userAtom } from "@/util/atoms.ts";
import { Formik, useFormikContext } from "formik";
import { useUpdateUserMutation } from "@/generated/graphql.tsx";
import { FC } from "react";

const ProfileChangeForm: FC<{ handleClose: () => void }> = (props) => {
  const { submitForm, values, setFieldValue } =
    useFormikContext<ProfileModifyData>();

  return (
    <>
      <DialogTitle>Profil módosítása</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <Stack direction={"column"} spacing={2}>
          <TextField
            autoFocus
            id="name"
            name="name"
            label={"Name"}
            value={values.name}
            onChange={(e) => {
              setFieldValue("name", e.target.value);
            }}
            type="text"
            variant={"standard"}
          />
          <TextField
            id="username"
            name="userName"
            value={values.userName}
            onChange={(e) => {
              setFieldValue("userName", e.target.value);
            }}
            label="Username"
            type="text"
            variant={"standard"}
          />
          <TextField
            autoFocus
            id="email"
            name="email"
            value={values.email}
            onChange={(e) => {
              setFieldValue("email", e.target.value);
            }}
            label="Email Address"
            type="email"
            variant="standard"
          />
          <TextField
            autoFocus
            id="password"
            name="password"
            value={values.password}
            onChange={(e) => {
              setFieldValue("password", e.target.value);
            }}
            label="Password"
            type="password"
            variant="standard"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Mégse</Button>
        <Button onClick={submitForm}>Mentés</Button>
      </DialogActions>
    </>
  );
};

export type ProfileModifyData = {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
};

export const ProfileModify = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  //const [values, setValues] = useState({});
  const user = useAtomValue(userAtom);
  const [updateUser] = useUpdateUserMutation();

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Formik<ProfileModifyData>
        initialValues={{
          name: user?.user?.name,
          userName: user?.user?.userName,
          email: user?.user?.email,
          password: undefined,
        }}
        onSubmit={(values) => {
          updateUser({
            variables: {
              data: {
                name: values.name,
                userName: values.userName,
                email: values.email,
                password: values.password,
              },
            },
          });
          props.handleClose();
        }}
      >
        <ProfileChangeForm handleClose={props.handleClose} />
      </Formik>
    </Dialog>
  );
};
