import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Import SVG icons
import engineIcon from '../assets/icons/engine.svg';
import exhaustIcon from '../assets/icons/exhaust.svg';
import suspensionIcon from '../assets/icons/suspension.svg';
import brakesIcon from '../assets/icons/brakes.svg';
import wheelsIcon from '../assets/icons/wheels.svg';

const CarModifications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample modifications data - in a real app, this would come from an API
  const modifications = [
    {
      id: 1,
      name: 'Performance Chip',
      description: 'Increase engine power and torque with our custom ECU tuning',
      price: '€299',
      icon: engineIcon,
      category: 'Engine',
    },
    {
      id: 2,
      name: 'Sport Exhaust System',
      description: 'High-flow exhaust system for better sound and performance',
      price: '€599',
      icon: exhaustIcon,
      category: 'Exhaust',
    },
    {
      id: 3,
      name: 'Lowering Springs',
      description: 'Sport suspension lowering springs for improved handling',
      price: '€399',
      icon: suspensionIcon,
      category: 'Suspension',
    },
    {
      id: 4,
      name: 'Cold Air Intake',
      description: 'Improved air flow for better engine performance',
      price: '€199',
      icon: engineIcon,
      category: 'Engine',
    },
    {
      id: 5,
      name: 'Sport Brake Kit',
      description: 'Upgraded brake system for better stopping power',
      price: '€899',
      icon: brakesIcon,
      category: 'Brakes',
    },
    {
      id: 6,
      name: 'Wheel Spacers',
      description: 'Improve stance and handling with wheel spacers',
      price: '€149',
      icon: wheelsIcon,
      category: 'Wheels',
    },
  ];

  const filteredModifications = modifications.filter((mod) =>
    mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mod.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Car Modifications
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search modifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredModifications.map((mod) => (
          <Grid item xs={12} sm={6} md={4} key={mod.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'primary.main',
                  color: 'white',
                }}
              >
                <img
                  src={mod.icon}
                  alt={mod.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {mod.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {mod.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {mod.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {mod.category}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarModifications; 