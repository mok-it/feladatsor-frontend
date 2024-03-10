import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import {
  FaCircleCheck,
  FaCircleQuestion,
  FaCircleXmark,
  FaRegCircle,
} from "react-icons/fa6";

const Check: FC<{
  response?: "accepted" | "rejected" | "problematic";
  userName?: string;
  timestamp?: string;
}> = ({ response, userName, timestamp }) => {
  return (
    <>
      {response === "accepted" && (
        <Tooltip title={`${userName} - ${timestamp}`}>
          <Box height={20}>
            <FaCircleCheck color="green" size={20} />
          </Box>
        </Tooltip>
      )}
      {response === "rejected" && (
        <Tooltip title={`${userName} - ${timestamp}`}>
          <Box height={20}>
            <FaCircleXmark color="red" size={20} />
          </Box>
        </Tooltip>
      )}
      {response === "problematic" && (
        <Tooltip title={`${userName} - ${timestamp}`}>
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
