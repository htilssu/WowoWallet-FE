import { Button, Typography, Box, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiExchangeFill, RiSearchLine } from "react-icons/ri";

const LayoutTransaction = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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

      {/* Thanh tìm kiếm */}
      <Box sx={{ position: 'relative', width: '80%', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm giao dịch..."
          sx={{
            width: 'calc(100% - 80px)', // Giảm chiều rộng
            bgcolor: 'white',
            borderRadius: '20px', // Bo góc
            boxShadow: 'none', // Bỏ viền
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Bỏ viền
            },
          }}
          InputProps={{
            startAdornment: (
              <RiSearchLine style={{ marginLeft: 10, color: '#888' }} />
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            right: 0,
            height: '100%',
            borderRadius: '20px', // Bo góc
            backgroundColor: '#6bbf6e', // Màu nền dịu hơn
            color: '#fff', // Màu chữ
            '&:hover': {
              backgroundColor: '#549e54', // Màu nền khi hover
            },
          }}
          onClick={() => {
            // Thêm logic tìm kiếm ở đây
          }}
        >
          Tìm
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            onClick={() => handleNavigation('/current-transaction')}
            sx={{
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem', // Kích thước font chữ lớn hơn
              borderRadius: '12px', // Bo góc nút
              transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
              backgroundColor: '#3f51b5', // Màu nền
              color: '#fff', // Màu chữ
              '&:hover': {
                backgroundColor: '#303f9f', // Màu nền khi hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Bóng đổ khi hover
              },
            }}
          >
            <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
            Giao dịch hiện hành
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            onClick={() => handleNavigation('/wallet-transaction')}
            sx={{
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem', // Kích thước font chữ lớn hơn
              borderRadius: '12px', // Bo góc nút
              transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
              backgroundColor: '#8e24aa', // Màu nền dịu hơn
              color: '#fff', // Màu chữ
              '&:hover': {
                backgroundColor: '#7b1fa2', // Màu nền khi hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Bóng đổ khi hover
              },
            }}
          >
            <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
            Giao dịch ví
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            onClick={() => handleNavigation('/bank-transaction')}
            sx={{
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem', // Kích thước font chữ lớn hơn
              borderRadius: '12px', // Bo góc nút
              transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
              backgroundColor: '#1976d2', // Màu nền dịu hơn
              color: '#fff', // Màu chữ
              '&:hover': {
                backgroundColor: '#1565c0', // Màu nền khi hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Bóng đổ khi hover
              },
            }}
          >
            <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
            Giao dịch ngân hàng
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            onClick={() => handleNavigation('/service-transaction')}
            sx={{
              width: '100%',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem', // Kích thước font chữ lớn hơn
              borderRadius: '12px', // Bo góc nút
              transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
              backgroundColor: '#0d47a1', // Màu nền dịu hơn
              color: '#fff', // Màu chữ
              '&:hover': {
                backgroundColor: '#0a368a', // Màu nền khi hover
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Bóng đổ khi hover
              },
            }}
          >
            <RiExchangeFill size={28} style={{ marginBottom: '8px' }} />
            Giao dịch dịch vụ liên kết
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LayoutTransaction;
