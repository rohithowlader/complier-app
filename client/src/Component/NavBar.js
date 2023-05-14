import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Online Complier
            </Typography>
            <Link to="/">
              <Button color="inherit" sx={{ color: "black" }}>
                Node Compiler
              </Button>
            </Link>
            <Link to="/python">
              <Button color="inherit" sx={{ color: "black" }}>
                Python Compiler
              </Button>
            </Link>
            <Link to="/c">
              <Button color="inherit" sx={{ color: "black" }}>
                C Compiler
              </Button>
            </Link>
            <Link to="/cpp">
              <Button color="inherit" sx={{ color: "black" }}>
                C++ Compiler
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default NavBar;
