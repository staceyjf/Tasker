import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { TodoFormData } from "../../components/TodoForm/TodoSchema";
import { createTodo } from "../../services/todo-services";

import TodoForm from "../../components/TodoForm/TodoForm";
import { Alert, Backdrop, Snackbar } from "@mui/material";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);
  const [open, setOpen] = useState(false);

  const defaultValues = {
    title: "Keep me short and sweet",
    task: "Add a task",
    dueDate: new Date().toISOString(), // convert to a string with the relevant format
    isComplete: false,
    colourId: "",
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit: SubmitHandler<TodoFormData> = async (data) => {
    try {
      await createTodo(data);
      navigate("/todo");
      setError(null);
    } catch (e) {
      setError(new Error("Failed to submit your new todo. Please try again."));
      setOpen(true);
      console.error(e);
    }
  };

  return (
    <div style={{ width: "80%" }}>
      <h1 style={{ margin: "0 0 0.5rem 0" }}>Create a new Todo task</h1>
      {error && (
        <Backdrop open={open} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              severity="error"
              variant="filled"
              onClose={handleClose}
              sx={{ width: "100%" }}
              data-testid="error-alert"
            >
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
      <TodoForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        mode="Create"
      />
    </div>
  );
};

export default AddTodoPage;
