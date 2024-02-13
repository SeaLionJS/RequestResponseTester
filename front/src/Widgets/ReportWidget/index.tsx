import { Button } from "@mui/material";
import { IReportProps } from "../../types/types";
import "./style.css";
import ReportItem from "./ReportItem";

export default function ReportWidget({ handleClose, messages }: IReportProps) {
  return (
    <div className="app-report">
      <div className="articles">
        {messages.map((e, ind) => (
          <ReportItem
            key={ind}
            id={ind}
            requestNum={e.requestNum}
            code={e.code}
          />
        ))}
      </div>
      <Button
        variant="contained"
        onClick={handleClose}
        sx={{ m: 2 }}
        color="primary"
      >
        Закрити
      </Button>
    </div>
  );
}
