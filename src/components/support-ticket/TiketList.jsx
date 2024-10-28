import { List, ListItem, ListItemText, Container, Typography, Box, Pagination, IconButton } from '@mui/material';
import { IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
    const tickets = [
        { id: 1, title: 'Ticket 1', description: 'Description for ticket 1', date: '2024-10-01' },
        { id: 2, title: 'Ticket 2', description: 'Description for ticket 2', date: '2024-10-02' },
        { id: 3, title: 'Ticket 3', description: 'Description for ticket 3', date: '2024-10-03' },
        { id: 4, title: 'Ticket 4', description: 'Description for ticket 4', date: '2024-10-04' },
        { id: 5, title: 'Ticket 5', description: 'Description for ticket 5', date: '2024-10-05' },
        { id: 6, title: 'Ticket 6', description: 'Description for ticket 6', date: '2024-10-06' },
        { id: 7, title: 'Ticket 7', description: 'Description for ticket 7', date: '2024-10-07' },
        { id: 8, title: 'Ticket 8', description: 'Description for ticket 8', date: '2024-10-08' },
        { id: 9, title: 'Ticket 9', description: 'Description for ticket 9', date: '2024-10-09' },
        { id: 10, title: 'Ticket 10', description: 'Description for ticket 10', date: '2024-10-10' },
    ];

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastTicket = page * itemsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const navigate = useNavigate();

    const goToCreateTicketRequest = (id) => {
        navigate(`/create-ticket/${id}`);
    };

    return (
        <Container style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'white', marginTop: '20px',  marginBottom: '20px' }}>

            <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                <List>
                    {currentTickets.map(ticket => (
                        <ListItem key={ticket.id} sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 2, padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
                            <ListItemText
                                primary={
                                    <div>
                                        <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: '#9e9e9e' }}>{ticket.date}</Typography>
                                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#3f51b5' }}>{ticket.title}</Typography>
                                    </div>
                                }
                                secondary={ticket.description}
                            />
                            <IconButton onClick={() => goToCreateTicketRequest(ticket.id)} aria-label="Go to details">
                                <IoIosArrowForward />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>

                <Pagination
                    count={Math.ceil(tickets.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}
                />
            </Box>
        </Container>
    );
};

export default TicketList;
