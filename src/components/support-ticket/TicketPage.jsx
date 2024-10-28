import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import TicketList from './TiketList';

const TicketPage = () => {
    const [showForm, setShowForm] = useState(true);

    const handleCreateRequest = () => {
        setShowForm(true);
    };

    const handleSearchRequest = () => {
        setShowForm (!showForm);
    };

    return (
        <><Container style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', color: 'white' }}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: 'white' }}>
                HỖ TRỢ GIAO DỊCH
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                <Button
                    variant="contained"
                    style={{ flex: '0 0 48%', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                    onClick={handleCreateRequest}
                >
                    Lập yêu cầu
                </Button>
                <Button
                    variant="contained"
                    style={{ flex: '0 0 48%', padding: '10px 20px', fontSize: '16px', borderRadius: '10px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', color: 'white' }}
                    onClick={handleSearchRequest}
                >
                    Tra cứu yêu cầu
                </Button>
            </div>
            {showForm && (
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
            {!showForm && (
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
        </Container>
        
        <TicketList /></>
    );
};

export default TicketPage;