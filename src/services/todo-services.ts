import { TodoFormData } from "../components/TodoForm/TodoSchema";
import { baseUrl } from "./api-config";
import { TodoResponse } from "./api-responses.interfaces";

// Helper function to convert date strings to Date objects
const convertDates = (todo: TodoResponse): TodoResponse => {
  todo.createdAt = new Date(todo.createdAt);
  todo.dueDate = new Date(todo.dueDate);
  return todo;
};

export const getAllTodos = async (): Promise<TodoResponse[]> => {
  const response: Response = await fetch(baseUrl + "/todos");
  if (!response.ok) {
    console.warn(response.status);
    throw new Error("Failed to fetch all Todos. Please try again later");
  }

  const data = await response.json();
  return data.map(convertDates);
};

export const getTodoById = async (id: number): Promise<TodoResponse> => {
  const response = await fetch(`${baseUrl}/todos/${id}`);

  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      `Failed to fetch Todo with id: ${id}. Please try again later`
    );
  }

  const data = await response.json();
  return convertDates(data);
};

export const createTodo = async (data: TodoFormData): Promise<TodoResponse> => {
  const response = await fetch(baseUrl + "/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      "Oops, something went wrong while trying to create a new Todo. Please try again."
    );
  }

  const responseData = await response.json();
  return convertDates(responseData);
};

export const updateTodoById = async (
  id: number,
  data: TodoFormData
): Promise<TodoResponse> => {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      `Oops, something went wrong while trying to update Todo with id: ${id}. Please try again.`
    );
  }
  const responseData = await response.json();
  return convertDates(responseData);
};

export const updateStatusById = async (
  id: number,
  isCompleteUpdated: boolean
) => {
  const response = await fetch(`${baseUrl}/todos/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isComplete: isCompleteUpdated }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      `Oops, something went wrong while trying to update Todo's status with id: ${id}. Please try again.`
    );
  }
};

export const deleteTodoById = async (id: number) => {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 204) {
    // Spring is sending back a 204 No Content HTTP request
    console.warn(response.status);
    throw new Error(
      `Oops, something went wrong while trying to delete Todo with id: ${id}. Please try again.`
    );
  }
};
