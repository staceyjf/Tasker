import { Box, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import logo from "../../assets/SpringTaskerLogoSmall.png";

const Header = () => {
  const theme = useTheme();

  return (
    <header style={{ width: "100%" }}>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
        mb={1}
        px={3}
      >
        <NavLink to="/todo">
          <img src={logo} alt="Spring Tasker Logo" />
        </NavLink>
        <NavLink to="/todo/new">
          <AddCircleIcon
            aria-label="Add a todo"
            style={{ fontSize: 40, color: theme.highlightOne.main }}
          />
        </NavLink>
      </Box>
    </header>
  );
};

export default Header;
