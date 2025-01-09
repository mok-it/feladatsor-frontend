import { Box, Card, Modal, Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import { useToggle } from "react-use";

export const ImageViewer: FC<{ src: string; button?: ReactNode }> = ({
  src,
  button,
}) => {
  const [open, toggle] = useToggle(false);

  return (
    <>
      <Modal keepMounted open={open} onClose={toggle}>
        <Stack
          position={"absolute"}
          sx={{ inset: 0 }}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={toggle}
        >
          {open && (
            <Card sx={{ width: "80vw", height: "80vh" }}>
              <img
                src={src}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Card>
          )}
        </Stack>
      </Modal>
      {!open && (
        <Box onClick={toggle} style={{ cursor: "pointer" }}>
          {button || <img src={src}></img>}
        </Box>
      )}
    </>
  );
};
