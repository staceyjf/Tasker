import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { getTodoById, updateTodoById } from "../../services/todo-services";

import TodoForm from "../../components/TodoForm/TodoForm";
import { Alert, Backdrop, Box, Skeleton, Snackbar } from "@mui/material";

const UpdateTodoPage = () => {
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const todoId = Number(idParam);
  const [defaultValues, setDefaultValues] = useState<
    TodoFormData | undefined
  >();
  const [error, setError] = useState<Error | null>(null);
  const [fetchStatus, setFetchStatus] = useState<String>("LOADING");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTodoById(todoId)
      .then((data) => {
        setFetchStatus("SUCCESS");
        const newDefaultValues = {
          title: data.title,
          task: data.task,
          dueDate: data.dueDate.toISOString(), // convert to the relevant DatePicker format
          isComplete: data.isComplete,
          colourId: data.colour.id.toString(),
        };
        setDefaultValues(newDefaultValues);
      })
      .catch((e: Error) => {
        setError(new Error("Failed to update your todo. Please try again."));
        setOpen(true);
        setFetchStatus("FAILED");
        console.error(e);
      });
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit: SubmitHandler<TodoFormData> = (data) => {
    if (isNaN(todoId)) {
      console.error("Invalid Id");
      throw new Error("");
    }

    updateTodoById(todoId, data)
      .then((_data) => {
        navigate("/todo");
        setError(null);
      })
      .catch((e: Error) => {
        setError(
          new Error("Failed to submit your edited todo. Please try again.")
        );
        setOpen(true);
        console.error(e);
      });
  };

  return (
    <Box width="100%">
      {fetchStatus === "LOADING" && (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="0.5rem"
            justifyContent="center"
            data-testid="loading"
          >
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
          </Box>
        </>
      )}
      {fetchStatus === "FAILED" && (
        <Backdrop open={open} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              severity="error"
              variant="filled"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <h1>Edit `{defaultValues?.title}` Todo</h1>
          {error && (
            <Backdrop open={open} sx={{ color: "#fff", zIndex: 1 }}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  severity="error"
                  variant="filled"
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                >
                  {error?.message}
                </Alert>
              </Snackbar>
            </Backdrop>
          )}
          {defaultValues && (
            <TodoForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              mode="Edit"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default UpdateTodoPage;
