import { createTheme, responsiveFontSizes } from "@mui/material";

// adding a new custom colour variable
declare module "@mui/material/styles" {
  interface Theme {
    highlightOne: { main: string };
  }
  interface ThemeOptions {
    highlightOne?: { main?: string };
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#073B4C",
      light: "#06D6A0",
    },
    secondary: {
      main: "#FFF",
    },
  },
  highlightOne: {
    main: "#EF476F",
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          fontWeight: 400,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
          fontWeight: 500,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
          fontWeight: 400,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
  },
});

// adjusted based on the predefined breakpoints
theme = responsiveFontSizes(theme);

export default theme;
