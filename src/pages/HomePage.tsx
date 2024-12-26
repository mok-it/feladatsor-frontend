import { userAtom } from "@/util/atoms.ts";
import { Grid2 } from "@mui/material";
import { useAtomValue } from "jotai";
import { useToggle } from "react-use";
import { useStatsQuery } from "@/generated/graphql.tsx";
import { LeaderBoardCard } from "@/pages/home/LeaderBoardCard.tsx";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  const [show, toggle] = useToggle(false);

  const { data, loading } = useStatsQuery();

  return (
    <div>
      <h1>Szia, {user && user.user ? user.user.name : " - "}</h1>
      {user?.user?.email === "emerichkeen@gmail.com" && (
        <div style={{ visibility: show ? "visible" : "hidden" }}>
          <p>Ezt neked küldjük speciálba, Balázs❤️</p>
          <iframe
            width="560"
            height="315"
            allow="autoplay"
            src="https://www.youtube.com/embed/FuXNumBwDOM?autoplay=1&start=78"
            onLoad={() => {
              toggle(true);
            }}
          ></iframe>
        </div>
      )}
      <Grid2 container>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <LeaderBoardCard loading={loading} stats={data?.globalStats} />
        </Grid2>
      </Grid2>
    </div>
  );
};
