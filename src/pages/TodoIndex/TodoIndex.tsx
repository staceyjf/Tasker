import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTodos,
  deleteTodoById,
  updateStatusById,
} from "../../services/todo-services";
import { TodoResponse } from "../../services/api-responses.interfaces";

import TodoCard from "../../components/TodoCard/TodoCard";
import DeleteConfirmationModel from "../../components/DeleteConfirmationModal/DeleteConfirmationModel";
import { Alert, Backdrop, Box, Skeleton, Snackbar } from "@mui/material";

const TodoIndex = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [fetchStatus, setFetchStatus] = useState<String>("LOADING");
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  // get all todos
  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const allTodos = await getAllTodos();
      setFetchStatus("SUCCESS");
      setTodos(allTodos);
    } catch (e: any) {
      setError(new Error("Failed to fetch todos. Please try again."));
      setFetchStatus("FAILED");
      console.error(e);
    }
  };

  const handleTodoDelete = async (id: number | undefined) => {
    if (id === undefined) {
      console.error("Id is undefined for deleting a todo by id");
      throw new Error(`Unable to delete todo  with id: ${id}`);
    }

    try {
      await deleteTodoById(id);
      setTodos(todos.filter((item) => item.id !== id));
      setOpenModal(false);
    } catch (e: any) {
      setError(new Error("Failed to delete todo. Please try again."));
      setFetchStatus("FAILED");
      console.error(e);
    }
  };

  const deleteTodoOnClick = (id: number | undefined) => {
    if (id !== undefined) {
      setTodoId(id);
      setOpenModal(true);
    } else {
      console.error("Id is undefined for deleting a todo by id");
      throw new Error(`Unable to find todo with: ${id}`);
    }
  };

  const handleTodoEdit = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/todo/${id}/edit`);
    } else {
      console.error("Id is undefined for updating a todo by id");
      throw new Error(`Unable to update todo with id: ${id}`);
    }
  };

  const handleIsComplete = async (
    id: number | undefined,
    isComplete: boolean
  ) => {
    if (id === undefined) {
      console.error("Id is undefined for updating task status");
      throw new Error(`Unable to update todo status with id: ${id}`);
    }

    try {
      await updateStatusById(id, isComplete);
      setTodos(await getAllTodos()); //update all todos
    } catch (e: any) {
      setError(new Error("Failed to update todo status. Please try again."));
      setFetchStatus("FAILED");
      console.error(e);
    }
  };

  return (
    <section style={{ width: "85%" }}>
      {fetchStatus === "LOADING" && (
        <>
          <Box
            display="flex"
            flexDirection="column"
            rowGap="0.5rem"
            justifyContent="center"
          >
            <Skeleton data-testid="loading" />
            <Skeleton width="80%" />
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
            <Skeleton variant="rounded" width="100%" height={60}></Skeleton>
          </Box>
        </>
      )}
      {fetchStatus === "FAILED" && (
        <Backdrop open={true} sx={{ color: "#fff", zIndex: 1 }}>
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
              aria-live="assertive"
              data-testid="error-alert"
            >
              {error?.message}
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
      {fetchStatus === "SUCCESS" && (
        <>
          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2em" }}>MY TODOS</h1>
          {todos.map((todo: TodoResponse) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              createdAt={todo.createdAt}
              dueDate={todo.dueDate}
              isComplete={todo.isComplete}
              title={todo.title}
              task={todo.task}
              colourHexCode={todo.colour.hexCode}
              deleteOnClick={deleteTodoOnClick}
              handleEdit={handleTodoEdit}
              handleIsComplete={handleIsComplete}
            />
          ))}
        </>
      )}
      {openModal && (
        <DeleteConfirmationModel
          todoId={todoId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleDelete={handleTodoDelete}
        />
      )}
    </section>
  );
};

export default TodoIndex;
