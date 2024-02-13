import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ILoaderProps } from "../../types/types";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "inline-flex",
        top: "calc(50% - 100px)",
        left: "calc(50% - 100px)",
      }}
    >
      <CircularProgress variant="determinate" {...props} size={200} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontSize: 56 }}
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LoaderWidget({ percent }: ILoaderProps) {
  return <CircularProgressWithLabel value={percent} />;
}
