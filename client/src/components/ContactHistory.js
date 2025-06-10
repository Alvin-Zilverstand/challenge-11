import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const ContactHistory = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contacts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  const getContactTypeColor = (type) => {
    switch (type) {
      case 'phone':
        return 'primary';
      case 'email':
        return 'success';
      case 'in-person':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Contact History
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.customer?.name}</TableCell>
                <TableCell>
                  <Chip
                    label={contact.type}
                    color={getContactTypeColor(contact.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(contact.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {contact.notes.length > 50
                    ? `${contact.notes.substring(0, 50)}...`
                    : contact.notes}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleViewContact(contact)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedContact && (
          <>
            <DialogTitle>
              Contact Details - {selectedContact.customer?.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Type:</strong>{' '}
                  <Chip
                    label={selectedContact.type}
                    color={getContactTypeColor(selectedContact.type)}
                    size="small"
                  />
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Notes:</strong>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {selectedContact.notes}
                </Typography>
                {selectedContact.followUp?.required && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Follow-up Required:</strong>
                    </Typography>
                    <Typography variant="body1">
                      Date: {new Date(selectedContact.followUp.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Notes: {selectedContact.followUp.notes}
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ContactHistory; 