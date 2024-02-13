import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./style.css";
import { useState } from "react";
import ErrorForm from "./ErrorForm";
import { IRequestProps } from "../../types/types";

export default function RequestWidget({ startRequestsFn }: IRequestProps) {
  const [requestsLimit, setRequestsLimit] = useState<string>("0");
  const [showErrorForm, setShowErrorForm] = useState<boolean>(false);

  const onClickHandler = () => {
    const value = Number(requestsLimit);
    if (value < 1 || value > 100) {
      setShowErrorForm(true);
      return;
    }
    startRequestsFn(value);
  };

  return (
    <>
      <Card variant="outlined" className="app-request">
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Початкове налаштування:
          </Typography>
          <TextField
            label="Введіть ліміт запитів:"
            variant="filled"
            fullWidth
            type="number"
            value={requestsLimit}
            onChange={(e) => setRequestsLimit(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            sx={{ margin: "0 20px 10px" }}
            variant="contained"
            color="success"
            onClick={onClickHandler}
          >
            Відправити
          </Button>
        </CardActions>
      </Card>
      <ErrorForm
        message={`Ви ввели число ${requestsLimit}, яке не відповідає діапазону 1 - 100`}
        isOpen={showErrorForm}
        handleClose={() => {
          setShowErrorForm(false);
        }}
      />
    </>
  );
}
