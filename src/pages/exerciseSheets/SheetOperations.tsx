import { ExerciseSheetQuery } from "@/generated/graphql";
import { Card, Stack } from "@mui/material";
import { FC } from "react";
import { SheetStatusSelector } from "./SheetStatusSelector";

export const SheetOperations: FC<{
  sheet: ExerciseSheetQuery["exerciseSheet"];
}> = ({ sheet }) => {
  sheet = sheet!;

  return (
    <>
      <Card
        sx={{ borderRadius: { xs: 0, md: 1 }, border: "1px solid #e0e0e0" }}
      >
        <Stack p={2} gap={2}>
          <SheetStatusSelector
            sheetId={sheet.id}
            currentStatus={sheet.status}
          />
        </Stack>
      </Card>
    </>
  );
};
