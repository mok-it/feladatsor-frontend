import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import { StatCard } from "@/components/StatCard.tsx";
import { useStatsQuery } from "@/generated/graphql.tsx";
import { LeaderBoardCard } from "@/pages/home/LeaderBoardCard.tsx";
import { userAtom } from "@/util/atoms.ts";
import { Box, Grid2, useColorScheme } from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";
import { CategoryScale, Chart, LinearScale } from "chart.js/auto";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ContributionCalendar } from "react-contribution-calendar";
import { FaCheck } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa6";
import { useToggle } from "react-use";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  const [show, toggle] = useToggle(false);

  const { data, loading } = useStatsQuery();
  const { mode } = useColorScheme();

  useEffect(() => {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
  }, []);

  return (
    <Box px={2}>
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
      {loading ? (
        "Loading..."
      ) : (
        <Grid2 container spacing={2} pb={2}>
          <Grid2 container size={12}>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <ProfileStatCard
                value={data?.globalStats?.totalExerciseCount + " db"}
                title="Összes feladat"
                icon={FaDiceD6}
                iconColor={lightBlue["600"]}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <ProfileStatCard
                value={data?.globalStats?.checkedExerciseCount + " db"}
                title="Ellenőrzött feladat"
                icon={FaCheck}
                iconColor={lightGreen["600"]}
              />
            </Grid2>
          </Grid2>
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
            <StatCard title="Feladatbeküldések napos gyakorisága">
              {data?.globalStats?.exerciseHourlyCount && (
                <Bar
                  data={{
                    labels: data.globalStats.exerciseHourlyCount.map(
                      (e) => e.hour + " óra",
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
          <StatCard title="Feladatbeküldések éves eloszlása">
            <ContributionCalendar
              data={
                data?.globalStats?.contributionCalendar.data.map((d) => ({
                  [d.date]: {
                    level: d.count,
                  },
                })) || []
              }
              startsOnSunday={false}
              start={data?.globalStats?.contributionCalendar.fromDate}
              end={data?.globalStats?.contributionCalendar.toDate}
              daysOfTheWeek={[
                "Vasárnap",
                "Hétfő",
                "Kedd",
                "Szerda",
                "Csütörtök",
                "Péntek",
                "Szombat",
              ]}
              textColor={mode === "light" ? "black" : "white"}
              includeBoundary={false}
              theme={mode === "light" ? "grass" : "dark_grass"}
              onCellClick={(_, data) => console.log(data)}
              scroll={false}
              hideDescription={false}
              hideMonthLabels={false}
              hideDayLabels={false}
            />
          </StatCard>
        </Grid2>
      )}
    </Box>
  );
};
