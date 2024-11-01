import { Typography, Paper, Button, Box, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MdFindReplace, MdContactSupport, MdOutlineErrorOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { TbClockEdit } from "react-icons/tb";

const TicketDetail = () => {
  const { searchId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const request = {
    date: '2023-10-31',
    searchId: searchId,
    title: 'Hỗ trợ hoàn trả giao dịch chuyển tiền',
    content: 'Chuyển tiền nhưng chưa nhận được tiền',
    status: 'Hoàn thành',
  };

  let statusColor, backgroundColor, icon;

  switch (request.status) {
    case 'Hoàn thành':
      statusColor = '#4caf50';
      backgroundColor = '#d0f0c0';
      icon = <FaCheck style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
    case 'Đang xử lý':
      statusColor = '#ff9800';
      backgroundColor = '#ffe0b2';
      icon = <TbClockEdit style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
    case 'Thất bại':
      statusColor = '#f44336';
      backgroundColor = '#ffcccb';
      icon = <MdOutlineErrorOutline style={{ marginRight: '8px', fontSize: '20px' }} />;
      break;
    default:
      statusColor = '#000';
      backgroundColor = '#f0f0f0';
      break;
  }

  const handleSupportRequest = () => {
    setOpenDialog(true);
  };

  const handleConfirmRequest = () => {
    toast.success("Yêu cầu hỗ trợ đã được xác nhận!");
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = () => {
    toast.success("Đã gửi yêu cầu hỗ trợ lại!");
    setOpenDialog(false);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: '30px',
        marginTop: '20px',
        borderRadius: '12px',
        background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#0d47a1', textAlign: 'center' }}>
        Chi tiết yêu cầu
      </Typography>
      <Divider sx={{ marginY: '15px' }} />
      <Box sx={{ lineHeight: '1.8', padding: '10px 20px' }}>
        <Typography variant="body1">
          <strong>Ngày yêu cầu:</strong> {request.date}
        </Typography>
        <Typography variant="body1">
          <strong>Mã tra cứu:</strong> {request.searchId}
        </Typography>
        <Typography variant="body1">
          <strong>Vấn đề:</strong> {request.title}
        </Typography>
        <Typography variant="body1">
          <strong>Chi tiết:</strong> {request.content}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
          <div style={{ color: statusColor, background: backgroundColor, padding: '5px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            {icon}
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {request.status}
            </Typography>
          </div>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="30px" gap="20px">
        <Button
          variant="contained"
          startIcon={<MdFindReplace />}
          onClick={handleSupportRequest}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            ':hover': { backgroundColor: '#0d47a1', transform: 'scale(1.05)' },
            padding: '12px 24px',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
        >
          Yêu cầu hỗ trợ lại
        </Button>
        <Button
          variant="contained"
          startIcon={<MdContactSupport />}
          onClick={handleConfirmRequest}
          sx={{
            backgroundColor: '#388e3c',
            color: 'white',
            ':hover': { backgroundColor: '#1b5e20', transform: 'scale(1.05)' },
            padding: '12px 24px',
            borderRadius: '10px',
            transition: 'transform 0.2s',
          }}
        >
          Hỗ trợ trực tiếp
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>Xác nhận yêu cầu hỗ trợ lại</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn gửi yêu cầu hỗ trợ lại không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TicketDetail;
