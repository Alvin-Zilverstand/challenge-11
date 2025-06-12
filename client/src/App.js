import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import CarModifications from './components/CarModifications';
import ContactHistory from './components/ContactHistory';
import CustomerManagement from './components/CustomerManagement';
import PrivateRoute from './components/PrivateRoute';
import UserManagement from './components/UserManagement';
import BackToHome from './components/BackToHome';
import Header from './components/Header';

// Create a dark, modern theme that matches xatec.nl's style
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E02D1B', // Darker vibrant red
      light: '#ff5a4d',
      dark: '#A81F0A',
    },
    secondary: {
      main: '#ffffff', // White for contrast
    },
    background: {
      default: '#111111', // True black background
      paper: '#181818', // Slightly lighter for cards
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontFamily: 'Orbitron, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2.7rem',
      color: '#ffffff',
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: 'Orbitron, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '2.1rem',
      color: '#ffffff',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: 'Orbitron, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.8rem',
      color: '#ffffff',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
      fontSize: '1.08rem',
      lineHeight: 1.7,
      color: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          fontSize: '1.08rem',
          padding: '14px 32px',
          backgroundColor: '#E02D1B',
          color: '#fff',
          boxShadow: '0 2px 12px rgba(224,45,27,0.10)',
          letterSpacing: '0.08em',
          margin: '8px 0',
          transition: 'box-shadow 0.2s, background 0.2s',
          '&:hover': {
            backgroundColor: '#A81F0A',
            boxShadow: '0 4px 20px rgba(224,45,27,0.18)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          backgroundColor: '#181818',
          padding: '32px 28px',
          margin: '24px 0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#181818',
          color: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333333',
            },
            '&:hover fieldset': {
              borderColor: '#E02D1B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E02D1B',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #222',
          padding: '18px 12px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <PrivateRoute>
                        <CustomerManagement />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers/:id"
                    element={
                      <PrivateRoute>
                        <CustomerDetail />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/modifications"
                    element={
                      <PrivateRoute>
                        <CarModifications />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/contacts"
                    element={
                      <PrivateRoute>
                        <ContactHistory />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <PrivateRoute>
                        <UserManagement />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </>
            }
          />
        </Routes>
        <BackToHome />
      </Router>
    </ThemeProvider>
  );
}

export default App;
