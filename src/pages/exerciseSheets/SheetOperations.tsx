import { CommentSection } from "@/components/CommentSection";
import { ExerciseSheetQuery } from "@/generated/graphql";
import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography variant="subtitle2">Feladatsor kommentek</Typography>
            <Tooltip title="Komment az egész feladatsorhoz">
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
    </>
  );
};
