import { useState } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TicketList from './TicketList';

const TicketPage = () => {
    const [activeSection, setActiveSection] = useState('createRequest');

    const handleCreateRequest = () => {
        setActiveSection('createRequest');
    };

    const handleSearchRequest = () => {
        setActiveSection('searchRequest');
    };

    const handleSearchHistory = () => {
        setActiveSection('searchHistory');
    };

    const searchHistoryData = [
        { date: '2024-10-25', searchId: '123456', status: 'Hoàn thành' },
        { date: '2024-10-20', searchId: '654321', status: 'Đang xử lý' },
        { date: '2024-10-18', searchId: '789012', status: 'Thất bại' }
    ];

    return (
        <>
            <Container style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'white' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: 'white' }}>
                    HỖ TRỢ GIAO DỊCH
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                    <Button
                        variant="contained"
                        style={{ flex: '0 0 31%', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                        onClick={handleCreateRequest}
                    >
                        Lập yêu cầu
                    </Button>
                    <Button
                        variant="contained"
                        style={{ flex: '0 0 31%', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                        onClick={handleSearchRequest}
                    >
                        Tra cứu yêu cầu
                    </Button>
                    <Button
                        variant="contained"
                        style={{ flex: '0 0 31%', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                        onClick={handleSearchHistory}
                    >
                        Lịch sử tra cứu
                    </Button>
                </div>
                {activeSection === 'createRequest' && (
                    <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                            Hình thức giao dịch
                        </Typography>
                        <select style={{ padding: '10px', borderRadius: '5px', width: '100%', marginBottom: '20px', border: '1px solid #ccc' }}>
                            <option value="bank">Giao dịch ngân hàng</option>
                            <option value="wallet">Giao dịch ví</option>
                        </select>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5', marginTop: '20px' }}>
                            Số tài khoản ngân hàng
                        </Typography>
                        <input type="text" defaultValue="Tài khoản đang dùng" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <div style={{ flex: '0 0 48%' }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                Từ ngày
                            </Typography>
                            <input type="date" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: '0 0 48%' }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                Đến ngày
                            </Typography>
                            <input type="date" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }} />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        style={{ margin: '20px 0', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                        onClick={handleSearchRequest}
                    >
                        Tra cứu
                    </Button>
                </div>
            )}
            {activeSection === 'searchRequest' && (
                <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Tra cứu yêu cầu
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ flex: '0 0 48%' }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                Từ ngày
                            </Typography>
                            <input type="date" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ flex: '0 0 48%' }}>
                            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                Đến ngày
                            </Typography>
                            <input type="date" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }} />
                        </div>
                    </div>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        Mã tra cứu
                    </Typography>
                    <input type="text" style={{ padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #ccc', marginBottom: '20px' }} />
                    <Button
                        variant="contained"
                        style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                        onClick={handleSearchRequest}
                    >
                        Tra cứu
                    </Button>
                </div>
            )}
            {activeSection === 'searchHistory' && (
                    <div style={{ marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'black' }}>
                        <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
                            Lịch sử tra soát
                        </Typography>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Ngày</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Mã tra cứu</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchHistoryData.map((history, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{history.date}</TableCell>
                                            <TableCell>{history.searchId}</TableCell>
                                            <TableCell>{history.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
        </Container>
        
        <TicketList /></>
    );
};

export default TicketPage;