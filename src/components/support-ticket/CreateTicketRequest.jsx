import { Box, Typography, Container, Button, TextField, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTicketRequest = () => {
    const reasons = useMemo(() => ({
        "Hỗ trợ hoàn trả giao dịch chuyển tiền": ["Giao dịch bị lỗi", "Người hưởng chưa nhận được tiền", "Sai thông tin người nhận"],
        "Hỗ trợ chỉnh thông tin giao dịch chuyển tiền": ["Chỉnh sửa số tài khoản", "Chỉnh sửa tên người nhận"],
        "Kiểm tra trạng thái giao dịch": ["Người hưởng chưa nhận được tiền", "Giao dịch đang xử lý lâu"]
    }), []);

    const [requestType, setRequestType] = useState('');
    const [reasonList, setReasonList] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errorToastId, setErrorToastId] = useState(null);

    const handleRequestTypeChange = (event) => {
        setRequestType(event.target.value);
    };

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked);
    };

    const showToast = (message) => {
        if (!errorToastId || !toast.isActive(errorToastId)) {
            const id = toast.error(message);
            setErrorToastId(id);
        }
    };

    useEffect(() => {
        if (requestType) {
            setReasonList(reasons[requestType]);
            setSelectedReason('');
        } else {
            setReasonList([]);
            setSelectedReason('');
        }
    }, [reasons, requestType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!requestType) {
            showToast("Vui lòng chọn loại yêu cầu.");
            return;
        }
        if (!selectedReason) {
            showToast("Vui lòng chọn lý do tra soát.");
            return;
        }
        if (!agreeTerms) {
            showToast("Bạn cần đồng ý với các điều khoản dịch vụ.");
            return;
        }
        
        console.log({ requestType, selectedReason });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, mb: 5, p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff' }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
                Lập hỗ trợ giao dịch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Thông tin giao dịch hiện tại */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Loại giao dịch</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>Purchase</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Kênh giao dịch</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>Online Banking</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Ngày giao dịch</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>2024-10-25</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Tài khoản nhận</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>123456789</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Tên người nhận</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>John Doe</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Ngân hàng nhận</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>Bank of Example</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Nội dung</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>Payment for invoice #12345</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="subtitle1" color="textSecondary">Số tiền</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'right' }}>1000</Typography>
                </Box>
                
                {/* Dropdown for Request Type */}
                <TextField
                    label="Loại yêu cầu"
                    select
                    value={requestType}
                    onChange={handleRequestTypeChange}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    <MenuItem value="" disabled>Chọn loại yêu cầu</MenuItem>
                    <MenuItem value="Hỗ trợ hoàn trả giao dịch chuyển tiền">Hỗ trợ hoàn trả giao dịch chuyển tiền</MenuItem>
                    <MenuItem value="Hỗ trợ chỉnh thông tin giao dịch chuyển tiền">Hỗ trợ chỉnh thông tin giao dịch chuyển tiền</MenuItem>
                    <MenuItem value="Kiểm tra trạng thái giao dịch">Kiểm tra trạng thái giao dịch</MenuItem>
                </TextField>

                <TextField
                    label="Lý do tra soát"
                    select
                    value={selectedReason}
                    onChange={handleReasonChange}
                    disabled={!requestType}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    <MenuItem value="" disabled>Chọn lý do tra soát</MenuItem>
                    {reasonList.map((reason, index) => (
                        <MenuItem key={index} value={reason}>{reason}</MenuItem>
                    ))}
                </TextField>

                <FormControlLabel
                    control={
                        <Checkbox checked={agreeTerms} onChange={handleCheckboxChange} />
                    }
                    label={
                        <Typography variant="body2">
                            Bạn đồng ý với các <u className='text-green-500'>điều khoản và dịch vụ</u> của trang thanh toán của chúng tôi.
                        </Typography>
                    }
                />

                <Button
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: '1rem',
                        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                        color: '#ffffff',
                        '&:hover': {
                            background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                        },
                    }}
                >
                    Submit
                </Button>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Container>
    );
};

export default CreateTicketRequest;
