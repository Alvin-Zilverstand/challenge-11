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
    {
      id: 7,
      name: 'Turbocharger Kit',
      description: 'Complete turbo upgrade kit for significant power gains',
      price: '€2499',
      icon: engineIcon,
      category: 'Engine',
    },
    {
      id: 8,
      name: 'Cat-Back Exhaust',
      description: 'Performance exhaust system with sport sound',
      price: '€799',
      icon: exhaustIcon,
      category: 'Exhaust',
    },
    {
      id: 9,
      name: 'Coilover Suspension',
      description: 'Fully adjustable suspension system for perfect handling',
      price: '€1299',
      icon: suspensionIcon,
      category: 'Suspension',
    },
    {
      id: 10,
      name: 'Big Brake Kit',
      description: '6-piston caliper upgrade with larger rotors',
      price: '€1499',
      icon: brakesIcon,
      category: 'Brakes',
    },
    {
      id: 11,
      name: 'Forged Wheels',
      description: 'Lightweight forged alloy wheels for better performance',
      price: '€1999',
      icon: wheelsIcon,
      category: 'Wheels',
    },
    {
      id: 12,
      name: 'Stage 2 Tune',
      description: 'Advanced ECU remap for maximum power gains',
      price: '€499',
      icon: engineIcon,
      category: 'Engine',
    },
    {
      id: 13,
      name: 'Downpipe',
      description: 'High-flow downpipe for improved exhaust flow',
      price: '€349',
      icon: exhaustIcon,
      category: 'Exhaust',
    },
    {
      id: 14,
      name: 'Sway Bars',
      description: 'Upgraded sway bars for reduced body roll',
      price: '€299',
      icon: suspensionIcon,
      category: 'Suspension',
    },
    {
      id: 15,
      name: 'Brake Pads',
      description: 'High-performance brake pads for better stopping',
      price: '€199',
      icon: brakesIcon,
      category: 'Brakes',
    },
    {
      id: 16,
      name: 'Wheel Bearings',
      description: 'Upgraded wheel bearings for smoother rotation',
      price: '€249',
      icon: wheelsIcon,
      category: 'Wheels',
    },
    {
      id: 17,
      name: 'Intercooler Upgrade',
      description: 'Larger intercooler for better cooling efficiency',
      price: '€699',
      icon: engineIcon,
      category: 'Engine',
    },
    {
      id: 18,
      name: 'Exhaust Manifold',
      description: 'Equal-length exhaust manifold for better flow',
      price: '€449',
      icon: exhaustIcon,
      category: 'Exhaust',
    },
    {
      id: 19,
      name: 'Strut Brace',
      description: 'Front strut brace for improved chassis rigidity',
      price: '€199',
      icon: suspensionIcon,
      category: 'Suspension',
    },
    {
      id: 20,
      name: 'Brake Lines',
      description: 'Stainless steel braided brake lines',
      price: '€149',
      icon: brakesIcon,
      category: 'Brakes',
    },
    {
      id: 21,
      name: 'Wheel Locks',
      description: 'Security wheel locks to prevent theft',
      price: '€89',
      icon: wheelsIcon,
      category: 'Wheels',
    }
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