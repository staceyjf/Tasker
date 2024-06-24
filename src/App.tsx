import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ColoursContextProvider from "./context/ColourContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import theme from "./styling/theme";
import TodoIndex from "./pages/TodoIndex/TodoIndex";
import AddTodoPage from "./pages/AddTodoPage/AddTodoPage";
import UpdateTodoPage from "./pages/UpdateTodoPage/UpdateTodoPage";
import "./App.scss";
import { Container, Box } from "@mui/material";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <ThemeProvider theme={theme}>
          {/* Normalization add  */}
          <CssBaseline />
          <Box
            height="100vh"
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container
              maxWidth="sm"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                rowGap: "0.25rem",
                backgroundColor: "white",
                mx: "auto",
                borderRadius: "1rem",
                padding: 5,
              }}
            >
              <ColoursContextProvider>
                <BrowserRouter>
                  <Header />
                  <Box
                    flexGrow={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={1}
                    mb={1}
                    px={3}
                    width="100%"
                  >
                    <Routes>
                      <Route path="/todo" element={<TodoIndex />} />
                      <Route path="/todo/new" element={<AddTodoPage />} />
                      <Route
                        path="/todo/:id/edit"
                        element={<UpdateTodoPage />}
                      />
                    </Routes>
                  </Box>
                </BrowserRouter>
              </ColoursContextProvider>
            </Container>
          </Box>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
