import { createContext, type FC, type ReactNode } from "react";

import { composeAtom } from "@/util/atoms";
import { Box, Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomFamily, selectAtom } from "jotai/utils";
import { Item } from "./Item";

export const ContainerContext = createContext<string | null>(null);

const atomSelector = atomFamily((id: string) =>
  selectAtom(composeAtom, (state) => state[id]),
);

const Container: FC<{
  id: string;
  categoryComment?: ReactNode;
}> = ({ id, categoryComment }) => {
  const items = useAtomValue(atomSelector(id));

  return (
    <ContainerContext.Provider value={id}>
      <Stack alignItems={"center"} gap={1} pb={2} position="relative">
        {categoryComment && (
          <Box position="absolute" top={-38} right={-8} zIndex={120}>
            {categoryComment}
          </Box>
        )}
        {items.map(({ id, cardId }, i) => (
          <Item key={cardId} order={i} id={id} cardId={cardId} />
        ))}
      </Stack>
    </ContainerContext.Provider>
  );
};

export default Container;
