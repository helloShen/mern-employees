import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  Button,
} from '@mui/material';

export default function Navbar() {
  return (
    <div className="navbar">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1}}
            >
              <Link className="nav-link" to="/mern-employees/">
                <span className="logo">
                  MERN = MongoDB + Express + React + Node
                </span>
              </Link>
            </Typography>
            <Link className="nav-link" to="/mern-employees/create">
              <Button color="inherit">Add Record</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
