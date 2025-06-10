import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    type: 'phone',
    notes: '',
    followUp: {
      required: false,
      date: '',
      notes: '',
    },
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const [customerResponse, contactsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          axios.get(`http://localhost:5000/api/contacts/customer/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);
        setCustomer(customerResponse.data);
        setContacts(contactsResponse.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleAddContact = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/contacts',
        {
          ...newContact,
          customer: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setContacts([...contacts, response.data]);
      setOpenDialog(false);
      setNewContact({
        type: 'phone',
        notes: '',
        followUp: {
          required: false,
          date: '',
          notes: '',
        },
      });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  if (!customer) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Customer Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Name: {customer.name}</Typography>
              <Typography variant="subtitle1">Email: {customer.email}</Typography>
              <Typography variant="subtitle1">Phone: {customer.phone}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Car Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Make: {customer.carDetails?.make}
              </Typography>
              <Typography variant="subtitle1">
                Model: {customer.carDetails?.model}
              </Typography>
              <Typography variant="subtitle1">
                Year: {customer.carDetails?.year}
              </Typography>
              <Typography variant="subtitle1">
                Modifications: {customer.carDetails?.modifications?.join(', ')}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Contact History</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Add Contact
              </Button>
            </Box>
            <List>
              {contacts.map((contact, index) => (
                <React.Fragment key={contact._id}>
                  <ListItem>
                    <ListItemText
                      primary={`${contact.type} - ${new Date(
                        contact.createdAt
                      ).toLocaleDateString()}`}
                      secondary={contact.notes}
                    />
                  </ListItem>
                  {index < contacts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="Contact Type"
              value={newContact.type}
              onChange={(e) =>
                setNewContact({ ...newContact, type: e.target.value })
              }
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 2 }}
            >
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="in-person">In Person</option>
              <option value="other">Other</option>
            </TextField>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              value={newContact.notes}
              onChange={(e) =>
                setNewContact({ ...newContact, notes: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Follow-up Date"
              value={newContact.followUp.date}
              onChange={(e) =>
                setNewContact({
                  ...newContact,
                  followUp: { ...newContact.followUp, date: e.target.value },
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained" color="primary">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerDetail; 