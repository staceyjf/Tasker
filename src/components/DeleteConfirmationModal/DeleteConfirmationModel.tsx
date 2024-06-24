import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";

interface DeleteConfirmationModelProps {
  todoId: number | undefined;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  handleDelete: (id: number | undefined) => void;
}

const DeleteConfirmationModel = ({
  todoId,
  openModal,
  setOpenModal,
  handleDelete,
}: DeleteConfirmationModelProps) => {
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="Delete"
        aria-describedby="Delete a Todo"
      >
        <DialogTitle id="dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure you want to delete todo id:{todoId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleDelete(todoId)}
            autoFocus
          >
            Delete Todo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteConfirmationModel;
