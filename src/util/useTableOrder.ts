import {
  parseExerciseSorting,
  writeExerciseSorting,
} from "@/util/exerciseSearchParams";
import type {
  ExerciseSortDirection,
  ExerciseSortKey,
} from "@/util/exerciseSearchParams";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type TableOrder<T> = {
  orderBy: keyof T | null;
  order: "asc" | "desc";
  setOrderBy: (key: keyof T) => void;
  setOrder: (dir: "asc" | "desc") => void;
  setSorting: (key: keyof T | null, dir: "asc" | "desc") => void;
};

export const useTableOrder = <T>(options?: {
  persistInUrl?: boolean;
  allowedOrderBy?: readonly (keyof T)[];
}): TableOrder<T> => {
  const [localOrderBy, setLocalOrderBy] = useState<keyof T | null>(null);
  const [localOrder, setLocalOrder] = useState<ExerciseSortDirection>("asc");
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSorting = useMemo(
    () => parseExerciseSorting(searchParams),
    [searchParams],
  );
  const urlOrderBy = options?.allowedOrderBy?.includes(
    urlSorting.orderBy as keyof T,
  )
    ? (urlSorting.orderBy as keyof T)
    : null;

  const orderBy = options?.persistInUrl ? urlOrderBy : localOrderBy;
  const order = options?.persistInUrl ? urlSorting.order : localOrder;

  const setSorting = useCallback(
    (key: keyof T | null, direction: ExerciseSortDirection) => {
      if (!options?.persistInUrl) {
        setLocalOrderBy(key);
        setLocalOrder(direction);
        return;
      }

      const nextParams = new URLSearchParams(searchParams);
      writeExerciseSorting(
        nextParams,
        key as ExerciseSortKey | null,
        direction,
      );
      setSearchParams(nextParams);
    },
    [options?.persistInUrl, searchParams, setSearchParams],
  );

  const setOrderBy = useCallback(
    (key: keyof T) => setSorting(key, order),
    [order, setSorting],
  );
  const setOrder = useCallback(
    (direction: ExerciseSortDirection) => setSorting(orderBy, direction),
    [orderBy, setSorting],
  );

  return { orderBy, order, setOrderBy, setOrder, setSorting };
};
