import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IErrorProps } from "../../types/types";

export default function ErrorForm({
  message,
  isOpen,
  handleClose,
}: IErrorProps) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Увага!</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Зрозуміло</Button>
      </DialogActions>
    </Dialog>
  );
}
