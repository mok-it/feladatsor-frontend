import { ExerciseCheckType } from "@/generated/graphql";
import { translateCheck } from "@/util/const";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { FC } from "react";
import {
  FaCircleCheck,
  FaCircleQuestion,
  FaCircleXmark,
  FaRegCircle,
} from "react-icons/fa6";

const Check: FC<{
  response: ExerciseCheckType | null;
  userName: string;
  timestamp: string;
  hideTooltip?: boolean;
}> = ({ response, userName, timestamp, hideTooltip }) => {
  const tootltip = `${response && translateCheck(response)} - ${userName} - ${dayjs(+timestamp!).format("YYYY-MM-DD HH:mm")}`;
  return (
    <>
      {response === "GOOD" && (
        <Tooltip title={!hideTooltip && tootltip}>
          <Box height={20}>
            <FaCircleCheck color="green" size={20} />
          </Box>
        </Tooltip>
      )}
      {response === "TO_DELETE" && (
        <Tooltip title={!hideTooltip && tootltip}>
          <Box height={20}>
            <FaCircleXmark color="red" size={20} />
          </Box>
        </Tooltip>
      )}
      {response === "CHANGE_REQUIRED" && (
        <Tooltip title={!hideTooltip && tootltip}>
          <Box height={20}>
            <FaCircleQuestion color="orange" size={20} />
          </Box>
        </Tooltip>
      )}
      {!response && (
        <Box height={20}>
          <FaRegCircle size={20} />
        </Box>
      )}
    </>
  );
};

export default Check;
