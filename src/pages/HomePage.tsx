import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import { StatCard } from "@/components/StatCard.tsx";
import { useStatsQuery } from "@/generated/graphql.tsx";
import { LeaderBoardCard } from "@/pages/home/LeaderBoardCard.tsx";
import { userAtom } from "@/util/atoms.ts";
import {
  Box,
  Grid2,
  useColorScheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";
import { CategoryScale, Chart, LinearScale } from "chart.js/auto";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import GitHubCalendar from "react-github-contribution-calendar";
import { FaCheck } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa6";
import { useToggle } from "react-use";
import dayjs from "dayjs";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  const [show, toggle] = useToggle(false);

  const { data, loading } = useStatsQuery();
  const { mode } = useColorScheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
  }, []);

  return (
    <Box>
      <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
        Szia, {user && user.user ? user.user.name : " - "}
      </h1>
      {user?.user?.email === "emerichkeen@gmail.com" && (
        <div style={{ visibility: show ? "visible" : "hidden" }}>
          <p>Ezt neked küldjük speciálba, Balázs❤️</p>
          <iframe
            width="100%"
            height={isMobile ? "200" : "315"}
            style={{ maxWidth: "560px", aspectRatio: "16/9" }}
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
        <Grid2 container spacing={2}>
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
                <Box sx={{ height: isMobile ? 250 : 400, width: "100%" }}>
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
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      resizeDelay: 0,
                      plugins: {
                        legend: {
                          display: !isMobile,
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            maxRotation: isMobile ? 90 : 45,
                            minRotation: isMobile ? 45 : 0,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </StatCard>
          </Grid2>
          <Grid2 size={12}>
            <StatCard title="Feladatbeküldések éves eloszlása">
              <Box sx={{ overflowX: "auto", width: "100%", maxWidth: "100%" }}>
                <GitHubCalendar
                  values={
                    data?.globalStats?.contributionCalendar.data.reduce(
                      (acc, d) => {
                        acc[d.date] = d.count;
                        return acc;
                      },
                      {} as Record<string, number>,
                    ) || {}
                  }
                  until={
                    data?.globalStats?.contributionCalendar.toDate
                      ? dayjs(data.globalStats.contributionCalendar.toDate)
                          .endOf("year")
                          .format("YYYY-MM-DD")
                      : dayjs().endOf("year").format("YYYY-MM-DD")
                  }
                  weekNames={["V", "H", "K", "Sz", "Cs", "P", "Sz"]}
                  monthNames={[
                    "Jan",
                    "Feb",
                    "Már",
                    "Ápr",
                    "Máj",
                    "Jún",
                    "Júl",
                    "Aug",
                    "Szep",
                    "Okt",
                    "Nov",
                    "Dec",
                  ]}
                  weekLabelAttributes={{
                    fontSize: 9,
                    fill: mode === "light" ? "#000" : "#fff",
                  }}
                  monthLabelAttributes={{
                    fontSize: 10,
                    fill: mode === "light" ? "#000" : "#fff",
                  }}
                  panelAttributes={{
                    rx: 2,
                    ry: 2,
                  }}
                  panelColors={[
                    mode === "light" ? "#ebedf0" : "#161b22",
                    mode === "light" ? "#9be9a8" : "#0e4429",
                    mode === "light" ? "#40c463" : "#006d32",
                    mode === "light" ? "#30a14e" : "#26a641",
                    mode === "light" ? "#216e39" : "#39d353",
                  ]}
                />
              </Box>
            </StatCard>
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};
