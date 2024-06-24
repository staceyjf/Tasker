import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import ColoursContextProvider from "../../context/ColourContextProvider";
import AddTodoPage from "./AddTodoPage";

// mock up of the colours context
vi.mock("../../services/colour-services", () => ({
  getAllColours: vi.fn(() => Promise.resolve([])),
}));

describe("AddTodoPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should navigate to /todo when todo is created successfully", async () => {
    // create a mock component to help us find the current location
    const LocationDisplay = () => {
      const location = useLocation();
      return <div data-testid="location-display">{location.pathname}</div>;
    };

    vi.mock("../../services/todo-services", () => ({
      createTodo: vi.fn(() => Promise.resolve()),
    }));

    render(
      <MemoryRouter initialEntries={["/todo/new"]}>
        <ColoursContextProvider>
          <Routes>
            <Route path="/todo" element={<LocationDisplay />} />
            <Route path="/todo/new" element={<AddTodoPage />} />
          </Routes>
        </ColoursContextProvider>
      </MemoryRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/task details/i), {
      target: { value: "Test Task" },
    });

    // stimulate the submit button being pressed in the form
    fireEvent.click(screen.getByTestId("submitbtn"));

    waitFor(() => {
      expect(screen.getByTestId("location-display")).toHaveTextContent("/todo");
    });
  });
});
