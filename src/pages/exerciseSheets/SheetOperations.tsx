import { CommentSection } from "@/components/CommentSection";
import { ExerciseSheetQuery } from "@/generated/graphql";
import { Box, Card, Stack, Tooltip } from "@mui/material";
import { FC } from "react";
import { ExerciseSheetList } from "./ExerciseSheetList";
import { SheetStatusSelector } from "./SheetStatusSelector";

export const SheetOperations: FC<{
  sheet: ExerciseSheetQuery["exerciseSheet"];
}> = ({ sheet }) => {
  sheet = sheet!;

  return (
    <Stack gap={2}>
      <Card
        sx={{ borderRadius: { xs: 0, md: 1 }, border: "1px solid #e0e0e0" }}
      >
        <Stack p={2} gap={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Tooltip title="Komment a feladatsorhoz">
              <Box display="flex">
                <CommentSection
                  targetId={sheet.id}
                  mode="graphql-sheet"
                  sheetId={sheet.id}
                  sheetCommentTarget="Sheet"
                  iconSize="small"
                />
              </Box>
            </Tooltip>
          </Box>
          <SheetStatusSelector
            sheetId={sheet.id}
            currentStatus={sheet.status}
          />
        </Stack>
      </Card>
      <Card
        sx={{
          borderRadius: { xs: 0, md: 1 },
          border: "1px solid #e0e0e0",
        }}
      >
        <ExerciseSheetList />
      </Card>
    </Stack>
  );
};
