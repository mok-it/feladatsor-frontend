import {
  FunkyPoolDocument,
  useFunkyPoolQuery,
  useVoteOnDeveloperMutation,
} from "@/generated/graphql";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useEffect, useRef, useState } from "react";
import DinoGame from "react-chrome-dino-ts";
import "react-chrome-dino-ts/index.css";

type DinoRunner = {
  audioContext: AudioContext | null;
  play: () => void;
  resizeTimerId_: ReturnType<typeof setInterval> | null;
  stop: () => void;
  stopListening: () => void;
};

type DinoRunnerConstructor = {
  instance_?: DinoRunner | null;
};

const getDinoRunner = () =>
  (window as Window & { Runner?: DinoRunnerConstructor }).Runner;

const cleanupDinoRunner = (runner: DinoRunner | null | undefined) => {
  if (!runner) {
    return;
  }

  runner.stop();
  runner.stopListening();

  // The package registers bound focus handlers that cannot be removed.
  // Prevent them from restarting this unmounted runner.
  runner.play = () => undefined;

  if (runner.resizeTimerId_) {
    clearInterval(runner.resizeTimerId_);
  }

  const { audioContext } = runner;
  if (audioContext && audioContext.state !== "closed") {
    void audioContext.close();
  }

  const Runner = getDinoRunner();
  if (Runner?.instance_ === runner) {
    Runner.instance_ = null;
  }
};

export const Page404: FC = () => {
  const [choice, setChoice] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const cleanupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (cleanupTimer.current) {
      clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }

    return () => {
      // Deferring lets React Strict Mode's immediate effect replay cancel the
      // cleanup while still cleaning up after an actual navigation.
      const runner = getDinoRunner()?.instance_;
      cleanupTimer.current = setTimeout(() => cleanupDinoRunner(runner));
    };
  }, []);

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
        <DinoGame
          instructions={<Typography textAlign="center">SPACE</Typography>}
        />
      </Box>
    </Stack>
  );
};
