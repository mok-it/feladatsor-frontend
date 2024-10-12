import { TableCell, TableRow } from "@mui/material";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useEffectOnce, useIntersection } from "react-use";

type Props<T> = {
  data: T[];
  isInitialLoading: boolean;
  isFetchingNextPage: boolean;
  hasMore: boolean;
  fetchNextPage: () => void;
  children: (item: T) => ReactNode;
};

export function InfiniteLoad<T>({
  children,
  data,
  isFetchingNextPage,
  hasMore,
  isInitialLoading,
  fetchNextPage,
}: Props<T>) {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const checkIntersection = useCallback(() => {
    if (intersection?.isIntersecting && !isFetchingNextPage && hasMore) {
      fetchNextPage();
    }
  }, [
    intersection?.isIntersecting,
    isFetchingNextPage,
    hasMore,
    fetchNextPage,
  ]);

  useEffectOnce(() => {
    fetchNextPage();
  });

  useEffect(() => {
    checkIntersection();
  }, [data.length, checkIntersection, intersection?.isIntersecting]);

  return (
    <>
      {isInitialLoading ? (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      ) : (
        <>
          {data.map((row, index) => {
            const isLoaderRow = index > data.length - 1;
            return !isLoaderRow && children(row as T);
          })}
          {hasMore && (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
        </>
      )}
      {!hasMore && !isFetchingNextPage && (
        <TableRow>
          <TableCell>
            {data.length > 0 ? "A végére értél" : "Nincs találat"}
          </TableCell>
        </TableRow>
      )}
      <TableRow
        ref={intersectionRef}
        style={{
          position: "relative",
          bottom: 600,
          height: 500,
          background: "red",
          pointerEvents: "none",
        }}
      ></TableRow>
    </>
  );
}
