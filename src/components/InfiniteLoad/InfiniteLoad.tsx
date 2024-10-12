import { Box, TableCell, TableRow } from "@mui/material";
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
              <TableCell />
              <TableCell>Loading...</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </>
      )}
      {!hasMore && !isFetchingNextPage && (
        <TableRow>
          <TableCell />
          <TableCell>
            {data.length > 0 ? "A végére értél" : "Nincs találat"}
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
      )}
      <TableRow>
        <TableCell>
          <Box
            ref={intersectionRef}
            style={{
              position: "relative",
              bottom: 400,
              left: 0,
              height: 10,
              width: 10,
              pointerEvents: "none",
            }}
          ></Box>
        </TableCell>
      </TableRow>
    </>
  );
}
