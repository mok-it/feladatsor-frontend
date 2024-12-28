import type { UniqueIdentifier } from "@dnd-kit/core";
import { createContext, memo, type FC } from "react";

import { Stack } from "@mui/material";
import { Item } from "./Item";

export const ContainerContext = createContext<string | null>(null);

const Container: FC<{
  items: { id: UniqueIdentifier | null; cardId: string }[];
  id: string;
}> = ({ items, id }) => {
  return (
    <ContainerContext.Provider value={id}>
      <Stack height={"100%"} alignItems={"center"} gap={1} pb={4}>
        {items.map(({ id, cardId }, i) => (
          <Item key={cardId} order={i} id={id} cardId={cardId} />
        ))}
      </Stack>
    </ContainerContext.Provider>
  );
};

const MemoizedContainer = memo(Container);
export default MemoizedContainer;
