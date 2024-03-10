import { Link, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, PropsWithChildren } from "react";
import { useCopyToClipboard } from "react-use";

const FakeId: FC<PropsWithChildren> = ({ children }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Link
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (!children) return;
        const url = `${window.location.hostname}${window.location.port ? ":" + window.location.port : ""}/exercise/${children.toString()}`;
        copyToClipboard(url);
        enqueueSnackbar("Másolva a vágólapra");
      }}
    >
      <Typography color={"gray"}>#{children}</Typography>
    </Link>
  );
};

export default FakeId;
