import { createContext, type FC } from "react";

import { composeAtom } from "@/util/atoms";
import { Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { atomFamily, selectAtom } from "jotai/utils";
import { Item } from "./Item";

export const ContainerContext = createContext<string | null>(null);

const atomSelector = atomFamily((id: string) =>
  selectAtom(composeAtom, (state) => state[id]),
);

const Container: FC<{
  id: string;
}> = ({ id }) => {
  const items = useAtomValue(atomSelector(id));

  return (
    <ContainerContext.Provider value={id}>
      <Stack alignItems={"center"} gap={1} pb={4}>
        {items.map(({ id, cardId }, i) => (
          <Item key={cardId} order={i} id={id} cardId={cardId} />
        ))}
      </Stack>
    </ContainerContext.Provider>
  );
};

export default Container;
