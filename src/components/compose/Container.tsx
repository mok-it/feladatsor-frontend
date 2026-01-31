import { createContext, type FC } from "react";

import { composeAtom, sheetItemIdsAtom, sheetIdAtom } from "@/util/atoms";
import { Stack, Box } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomFamily, selectAtom } from "jotai/utils";
import { Item } from "./Item";
import { CommentSection } from "@/components/CommentSection";

export const ContainerContext = createContext<string | null>(null);

const atomSelector = atomFamily((id: string) =>
  selectAtom(composeAtom, (state) => state[id]),
);

const Container: FC<{
  id: string;
}> = ({ id }) => {
  const items = useAtomValue(atomSelector(id));
  const sheetItemIds = useAtomValue(sheetItemIdsAtom);
  const sheetId = useAtomValue(sheetIdAtom);
  const sheetItemId = sheetItemIds[id];

  return (
    <ContainerContext.Provider value={id}>
      <Stack alignItems={"center"} gap={1} pb={2} position="relative">
        <Box position="absolute" right={-40} top={0}>
           {sheetId && (
             <CommentSection 
                targetId={sheetItemId || `sheet-${sheetId}`} //todo Fallback or logic?
                mode={sheetItemId ? "graphql-sheet" : "local-context"}
                sheetId={sheetId}
                sheetCommentTarget="SheetItem"
             />
           )}
        </Box>
        {items.map(({ id, cardId }, i) => (
          <Item key={cardId} order={i} id={id} cardId={cardId} />
        ))}
      </Stack>
    </ContainerContext.Provider>
  );
};

export default Container;
