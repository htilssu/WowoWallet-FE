import { Button, Typography, Box, Grid, TextField } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { RiExchangeFill, RiSearchLine } from "react-icons/ri";

const LayoutTransaction = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '95vh',
        minWidth: '100%',
        background: 'linear-gradient(to right, #38bdf8, #34d399)',
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', mb: 4 }}>
        Quản lý Giao dịch
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={6} sm={3}>
          <NavLink to="/admin1/transaction-manage/current-transaction"> 
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem', 
                borderRadius: '12px', 
                transition: 'all 0.3s ease',
                backgroundColor: '#3f51b5', 
                color: '#fff', 
                '&:hover': {
                  backgroundColor: '#303f9f', 
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', 
                },
              }}
            >
              <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
              Giao dịch hiện hành
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={6} sm={3}>
          <NavLink to="/admin1/transaction-manage/wallet-transaction">
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem', 
                borderRadius: '12px', 
                transition: 'all 0.3s ease', 
                backgroundColor: '#8e24aa', 
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#7b1fa2', 
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', 
                },
              }}
            >
              <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
              Giao dịch ví
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={6} sm={3}>
          <NavLink to="/admin1/transaction-manage/bank-transaction">
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem', 
                borderRadius: '12px', 
                transition: 'all 0.3s ease', 
                backgroundColor: '#1976d2', 
                color: '#fff', 
                '&:hover': {
                  backgroundColor: '#1565c0', 
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
              Giao dịch ngân hàng
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={6} sm={3}>
          <NavLink to="/admin1/transaction-manage/service-transaction">
            <Button
              variant="contained"
              sx={{
                width: '100%',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem', 
                borderRadius: '12px', 
                transition: 'all 0.3s ease', 
                backgroundColor: '#0d47a1', 
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#0a368a',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', 
                },
              }}
            >
              <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
              Giao dịch dịch vụ liên kết
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LayoutTransaction;