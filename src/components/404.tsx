import {
  FunkyPoolDocument,
  useFunkyPoolQuery,
  useVoteOnDeveloperMutation,
} from "@/generated/graphql";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ChromeDinoGame from "react-chrome-dino";

export const Page404: FC = () => {
  const [choice, setChoice] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  const { data } = useFunkyPoolQuery();
  const [mutate] = useVoteOnDeveloperMutation({
    refetchQueries: [FunkyPoolDocument],
  });

  const snackbar = useSnackbar();

  const totalVotes =
    data?.funkyPool.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <Stack
      height={"100%"}
      alignItems="center"
      justifyContent={"center"}
      gap={2}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">Nem található</Typography>
      <Stack>
        <p>Szerinted kit rúgjunk ki ezért a hibáért?</p>
        {voted
          ? data?.funkyPool.map((funky) => (
              <Box sx={{ mt: 1 }}>
                {funky?.name} - {funky.count}
                <LinearProgress
                  variant="determinate"
                  value={(funky.count / totalVotes) * 100}
                />
              </Box>
            ))
          : data?.funkyPool.map((funky) => (
              <label htmlFor={funky.id}>
                <input
                  id={funky.id}
                  type="radio"
                  name="fav_dev"
                  value={funky?.id}
                  onChange={(e) => setChoice(e.target.value)}
                />
                {funky?.name}
              </label>
            ))}
        {!voted && (
          <button
            disabled={!choice}
            onClick={async () => {
              if (!choice) {
                return;
              }
              await mutate({
                variables: {
                  voteOnDeveloperId: choice,
                },
                awaitRefetchQueries: true,
              });
              snackbar.enqueueSnackbar("Akkor a kurva anyádat!", {
                variant: "success",
              });
              setVoted(true);
            }}
          >
            Elküld
          </button>
        )}
      </Stack>
      <Box width={600} height={300}>
        <ChromeDinoGame />
      </Box>
    </Stack>
  );
};
