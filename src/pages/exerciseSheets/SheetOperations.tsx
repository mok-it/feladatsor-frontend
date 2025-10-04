import Container from "@/components/compose/Container";
import { ExerciseSheetQuery } from "@/generated/graphql";
import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { MdEdit } from "react-icons/md";
import { useToggle } from "react-use";
import { SheetStatusSelector } from "./SheetStatusSelector";
import { TalonModal } from "./TalonModal";

export const SheetOperations: FC<{
  sheet: ExerciseSheetQuery["exerciseSheet"];
}> = ({ sheet }) => {
  sheet = sheet!;
  const [openTalon, toggleOpenTalon] = useToggle(false);

  return (
    <>
      <Card sx={{ borderRadius: { xs: 0, md: 1 } }}>
        <Stack p={2} gap={2}>
          <SheetStatusSelector
            sheetId={sheet.id}
            currentStatus={sheet.status}
          />
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pb={1.5}
          px={2}
          mt={-0.5}
          gap={1}
        >
          <IconButton sx={{ visibility: "hidden" }}>
            <MdEdit size={16} />
          </IconButton>
          <Typography variant="body1" textAlign={"center"}>
            Talon
          </Typography>
          <IconButton onClick={toggleOpenTalon}>
            <MdEdit size={16} />
          </IconButton>
          <TalonModal
            sheetId={sheet.id}
            open={openTalon}
            onClose={() => toggleOpenTalon(false)}
          />
        </Stack>
        <Box px={2}>
          <Container id={"talon"} />
        </Box>
      </Card>
    </>
  );
};
