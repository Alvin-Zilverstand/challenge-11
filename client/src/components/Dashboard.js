import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me');
        setIsAdmin(response.data.role === 'admin');
      } catch (err) {
        console.error('Error checking admin status:', err);
      }
    };
    checkAdminStatus();
  }, []);

  const menuItems = [
    {
      title: 'Customers',
      description: 'Manage customer information and car details',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: '/customers',
    },
    {
      title: 'Car Modifications',
      description: 'Browse available car modifications and upgrades',
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      path: '/modifications',
    },
    {
      title: 'Contact History',
      description: 'View and manage customer interactions',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      path: '/contacts',
    },
    ...(isAdmin ? [{
      title: 'User Management',
      description: 'Manage system users and permissions',
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
      path: '/users',
    }] : []),
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => navigate(item.path)}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                  color: 'primary.main',
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 