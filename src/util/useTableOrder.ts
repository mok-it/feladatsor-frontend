import { useState } from "react";

export type TableOrder<T> = {
  orderBy: keyof T | null;
  order: "asc" | "desc";
  setOrderBy: (key: keyof T) => void;
  setOrder: (dir: "asc" | "desc") => void;
};

export const useTableOrder = <T>(): TableOrder<T> => {
  const [orderBy, setOrderBy] = useState<keyof T | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  return { orderBy, order, setOrderBy, setOrder };
};
