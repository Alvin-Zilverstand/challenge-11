import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4, background: 'none' }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'Orbitron, Inter, Roboto, Helvetica, Arial, sans-serif' }}>
          Xatec CRM
        </Typography>
        <Box>
          <Button color="primary" variant="contained" onClick={handleLogout} sx={{ fontWeight: 700, ml: 2 }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 