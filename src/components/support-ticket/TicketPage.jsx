import { useState, useMemo, useEffect } from 'react';
import { Button, Container, FormControlLabel, Checkbox, TextField, MenuItem, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketHistory from './TicketHistory';
import { wPost } from '../../util/request.util';
import { useAuth } from '../../modules/hooks/useAuth';

const TicketPage = () => {

    const { user } = useAuth()
    const [activeSection, setActiveSection] = useState('createRequest');
    const [requestType, setRequestType] = useState('');
    const [reasonList, setReasonList] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [errorToastId, setErrorToastId] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (user) {
            const userId = user.id;
            console.log("User ID:", userId);  
        }
    }, [user]);

    const reasons = useMemo(() => ({
        "Hỗ trợ hoàn trả giao dịch chuyển tiền": ["Giao dịch bị lỗi", "Người hưởng chưa nhận được tiền", "Sai thông tin người nhận"],
        "Hỗ trợ chỉnh thông tin giao dịch chuyển tiền": ["Chỉnh sửa số tài khoản", "Chỉnh sửa tên người nhận"],
        "Kiểm tra trạng thái giao dịch": ["Người hưởng chưa nhận được tiền", "Giao dịch đang xử lý lâu"]
    }), []);

    const searchHistoryData = [
        { date: '2024-10-25', searchId: '123456', status: 'Hoàn thành' },
        { date: '2024-10-20', searchId: '654321', status: 'Đang xử lý' },
        { date: '2024-10-18', searchId: '789012', status: 'Thất bại' },
        { date: '2024-10-17', searchId: '345678', status: 'Hoàn thành' },
        { date: '2024-10-15', searchId: '901234', status: 'Thất bại' },
        { date: '2024-10-10', searchId: '567890', status: 'Đang xử lý' },
        { date: '2024-10-05', searchId: '123789', status: 'Hoàn thành' },
        { date: '2024-10-01', searchId: '456123', status: 'Thất bại' }
    ];

    const totalPages = Math.ceil(searchHistoryData.length / itemsPerPage);
    const displayedHistoryData = searchHistoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCreateRequest = () => setActiveSection('createRequest');
    const handleSearchHistory = () => setActiveSection('searchHistory');

    const handleRequestTypeChange = (event) => {
        const type = event.target.value;
        if (reasons[type]) {
            setRequestType(type);
        } else {
            showToast("Loại yêu cầu không hợp lệ.");
        }
    };

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked);
    };


    const showToast = (message) => {
        if (!toast.isActive(errorToastId)) {
            const id = toast.error(message);
            setErrorToastId(id);
        }
    };

    useEffect(() => {
        if (requestType) {
            setReasonList(reasons[requestType] || []);
            setSelectedReason('');
        } else {
            setReasonList([]);
            setSelectedReason('');
        }
    }, [reasons, requestType]);

    const handleSubmit = async (e) => {
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

        try {
            const response = await createTicket(requestType, selectedReason);
    
            if (response.success) {
                toast.success("Yêu cầu của bạn đã được gửi thành công!");
                setRequestType('');
                setSelectedReason('');
                setAgreeTerms(false);
            } else {
                showToast(response.message || "Đã xảy ra lỗi khi gửi yêu cầu.");
            }
        } catch (error) {
            showToast(error.message);
        }
    };

    const createTicket = async (requestType, selectedReason) => {
        const userId = user?.id;
        const body = {
            title: requestType,
            content: selectedReason,
            status: "OPEN",
            userId: userId 
        };
        try {
            const response = await wPost(`http://localhost:8080/v1/ticket/create`, body); 
            if (!response || !response.success) {
                throw new Error("Phản hồi không hợp lệ từ API.");
            }
            return response;
        } catch (error) {
            throw new Error("Lỗi mạng khi gửi yêu cầu.");
        }
    };

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <Container
            maxWidth="sm" 
            sx={{
                textAlign: 'center',
                padding: '20px',
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                color: 'white',
                marginBottom: '20px'
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                HỖ TRỢ YÊU CẦU
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <Button
                    variant="contained"
                    sx={{
                        flex: '0 0 48%',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                        color: 'white',
                    }}
                    onClick={handleCreateRequest}
                >
                    Lập yêu cầu
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        flex: '0 0 48%',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                        color: 'white',
                    }}
                    onClick={handleSearchHistory}
                >
                    Lịch sử yêu cầu
                </Button>
            </div>

            {activeSection === 'createRequest' && (
                <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                    <TextField
                        label="Loại yêu cầu"
                        select
                        value={requestType}
                        onChange={handleRequestTypeChange}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="" disabled>Chọn loại yêu cầu</MenuItem>
                        {Object.keys(reasons).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Lý do"
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
                        style={{ marginTop: '20px' }}
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
                        variant="contained"
                        fullWidth 
                        sx={{
                            margin: '20px 0',
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                            color: 'white',
                        }}
                        onClick={handleSubmit}
                    >
                        Gửi yêu cầu
                    </Button>
                </div>
            )}

            {activeSection === 'searchHistory' && (
                <TicketHistory displayedHistoryData={displayedHistoryData} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
            )}
            <ToastContainer />
        </Container>
    );
};

export default TicketPage;
