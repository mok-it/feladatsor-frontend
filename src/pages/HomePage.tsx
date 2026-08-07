import { ProfileStatCard } from "@/components/profile/ProfileStatCard.tsx";
import { StatCard } from "@/components/StatCard.tsx";
import { useStatsQuery } from "@/generated/graphql.tsx";
import { LeaderBoardCard } from "@/pages/home/LeaderBoardCard.tsx";
import {
  Box,
  Grid2,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { lightBlue, lightGreen } from "@mui/material/colors";
import { CategoryScale, Chart, LinearScale } from "chart.js/auto";
import { useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import { FaCheck } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa6";
import { useToggle } from "react-use";
import { useAuth } from "./AuthContext";

export const HomePage = () => {
  const { user } = useAuth();
  const [show, toggle] = useToggle(false);

  const { data, loading } = useStatsQuery();
  const { mode } = useColorScheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
  }, []);

  const contributionCalendarData = useMemo(() => {
    const calendar = data?.globalStats?.contributionCalendar;
    if (!calendar) return [];

    const entriesByDate = new Map(
      calendar.data.map((entry) => [entry.date, entry]),
    );
    const paddedData: Array<{ date: string; count: number; level: number }> = [];
    const currentYear = new Date().getFullYear();
    const current = new Date(`${currentYear}-01-01T00:00:00`);
    const end = new Date(`${currentYear}-12-31T00:00:00`);

    while (current <= end) {
      const isoDate = current.toISOString().slice(0, 10);
      paddedData.push(
        entriesByDate.get(isoDate) || {
          date: isoDate,
          count: 0,
          level: 0,
        },
      );
      current.setDate(current.getDate() + 1);
    }

    return paddedData;
  }, [data?.globalStats?.contributionCalendar]);

  return (
    <Box>
      <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
        Szia{user ? `, ${user.name}` : ""}
      </h1>
      {user?.email === "emerichkeen@gmail.com" && (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  overflowX: "auto",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {contributionCalendarData.length > 0 ? (
                  <ActivityCalendar
                    data={contributionCalendarData}
                    colorScheme={mode === "dark" ? "dark" : "light"}
                    weekStart={1}
                    showWeekdayLabels
                    blockRadius={2}
                    blockSize={isMobile ? 10 : 12}
                    fontSize={isMobile ? 10 : 12}
                    labels={{
                      months: [
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
                      ],
                      weekdays: [
                        "Vasárnap",
                        "Hétfő",
                        "Kedd",
                        "Szerda",
                        "Csütörtök",
                        "Péntek",
                        "Szombat",
                      ],
                      totalCount: "{{count}} feladat az elmúlt évben",
                      legend: {
                        less: "Kevesebb",
                        more: "Több",
                      },
                    }}
                    theme={{
                      light: [
                        "#ebedf0",
                        "#9be9a8",
                        "#40c463",
                        "#30a14e",
                        "#216e39",
                      ],
                      dark: [
                        "#161b22",
                        "#0e4429",
                        "#006d32",
                        "#26a641",
                        "#39d353",
                      ],
                    }}
                    tooltips={{
                      activity: {
                        text: (activity) =>
                          `${activity.date}: ${activity.count} feladat beküldve`,
                        placement: "top",
                        offset: 6,
                        hoverRestMs: 300,
                        transitionStyles: {
                          duration: 100,
                        },
                        withArrow: true,
                      },
                    }}
                  />
                ) : (
                  <Typography color="text.secondary">
                    Még nincs megjeleníthető beküldési aktivitás.
                  </Typography>
                )}
              </Box>
            </StatCard>
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
};
