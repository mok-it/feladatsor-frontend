import { userAtom } from "@/util/atoms.ts";
import { Grid2 } from "@mui/material";
import { useAtomValue } from "jotai";
import { useToggle } from "react-use";
import { useStatsQuery } from "@/generated/graphql.tsx";
import { LeaderBoardCard } from "@/pages/home/LeaderBoardCard.tsx";
import { StatCard } from "@/components/StatCard.tsx";
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale } from "chart.js/auto";
import { useEffect } from "react";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  const [show, toggle] = useToggle(false);

  const { data, loading } = useStatsQuery();

  useEffect(() => {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
  }, []);

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
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <LeaderBoardCard loading={loading} stats={data?.globalStats} />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <StatCard title="Feladatbeküldések időbeni eloszlása">
            {data?.globalStats?.exerciseHourlyCount && (
              <Bar
                data={{
                  labels: data.globalStats.exerciseHourlyCount.map(
                    (e) => e.hour,
                  ),
                  datasets: [
                    {
                      data: data.globalStats.exerciseHourlyCount.map(
                        (e) => e.count,
                      ),
                      label: "Feladat db",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderRadius: 5,
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            )}
          </StatCard>
        </Grid2>
      </Grid2>
    </div>
  );
};
