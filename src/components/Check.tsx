import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";

const Check: FC<{
  checked?: boolean;
  userName?: string;
  timestamp?: string;
}> = ({ checked, userName, timestamp }) => {
  return checked ? (
    <Tooltip title={`${userName} - ${timestamp}`}>
      <Box height={20}>
        <FaCircleCheck color="green" />
      </Box>
    </Tooltip>
  ) : (
    <Box height={20}>
      <BsQuestionCircle />
    </Box>
  );
};

export default Check;
