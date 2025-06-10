import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const carModels = [
  'BMW M3',
  'BMW M4',
  'Audi RS3',
  'Audi RS4',
  'Mercedes-AMG C63',
  'Mercedes-AMG E63',
  'Volkswagen Golf R',
  'Volkswagen Arteon R',
  'Toyota Supra',
  'Nissan GT-R',
  'Porsche 911',
  'Porsche Cayman',
  'Honda Civic Type R',
  'Subaru WRX STI',
  'Mitsubishi Lancer Evolution',
  'Other'
];

const categories = [
  'Engine',
  'Exhaust',
  'Suspension',
  'Brakes',
  'Wheels'
];

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModDialog, setOpenModDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    carModel: '',
    carYear: ''
  });
  const [modificationData, setModificationData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to fetch customers');
    }
  };

  const handleOpen = (customer = null) => {
    if (customer) {
      setFormData(customer);
      setSelectedCustomer(customer);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        carModel: '',
        carYear: ''
      });
      setSelectedCustomer(null);
    }
    setOpen(true);
  };

  const handleOpenModDialog = (customer) => {
    setSelectedCustomer(customer);
    setModificationData({
      name: '',
      description: '',
      price: '',
      category: ''
    });
    setOpenModDialog(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccess('');
  };

  const handleCloseModDialog = () => {
    setOpenModDialog(false);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleModInputChange = (e) => {
    setModificationData({
      ...modificationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCustomer) {
        await api.put(`/customers/${selectedCustomer._id}`, formData);
        setSuccess('Customer updated successfully');
      } else {
        await api.post('/customers', formData);
        setSuccess('Customer added successfully');
      }
      fetchCustomers();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleAddModification = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${selectedCustomer._id}/modifications`, modificationData);
      setSuccess('Modification added successfully');
      fetchCustomers();
      handleCloseModDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        setSuccess('Customer deleted successfully');
        fetchCustomers();
      } catch (err) {
        setError('Failed to delete customer');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Customer
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Car Year</TableCell>
              <TableCell>Modifications</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.carModel}</TableCell>
                <TableCell>{customer.carYear}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenModDialog(customer)}
                  >
                    Add Modification
                  </Button>
                  {customer.modifications && customer.modifications.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {customer.modifications.map((mod, index) => (
                        <Typography key={index} variant="body2">
                          {mod.name} - {mod.category}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(customer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(customer._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Customer Form Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Car Model</InputLabel>
                  <Select
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    label="Car Model"
                  >
                    {carModels.map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Car Year"
                  name="carYear"
                  type="number"
                  value={formData.carYear}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedCustomer ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modification Form Dialog */}
      <Dialog open={openModDialog} onClose={handleCloseModDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Modification</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddModification} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Modification Name"
                  name="name"
                  value={modificationData.name}
                  onChange={handleModInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={modificationData.description}
                  onChange={handleModInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={modificationData.price}
                  onChange={handleModInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={modificationData.category}
                    onChange={handleModInputChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModDialog}>Cancel</Button>
          <Button onClick={handleAddModification} variant="contained" color="primary">
            Add Modification
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerManagement; 