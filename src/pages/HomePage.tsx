import { userAtom } from "@/util/atoms.ts";
import { Card, Grid2, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { useToggle } from "react-use";

export const HomePage = () => {
  const user = useAtomValue(userAtom);
  const [show, toggle] = useToggle(false);

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
        <Grid2 size={2}>
          <Card>
            <Typography variant="h4">Beküldött feladatok</Typography>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};
