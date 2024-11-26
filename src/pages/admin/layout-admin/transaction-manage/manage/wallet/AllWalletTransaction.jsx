import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { FaCaretRight } from "react-icons/fa6";
import { wGet } from "../../../../../../util/request.util.js";

const AllWalletTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(6);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, [page]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const offset = page * rowsPerPage;
            const response = await wGet(
                `/v1/transaction/history?page=${page}&offset=${offset}`
            );
            setTransactions(response.data.transactions || []);
            setTotalTransactions(response.data.totalCount || 0);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]);
            setTotalTransactions(0);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseDetails = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="px-6 pb-10">
            <h2 className="text-2xl font-semibold mb-4">Danh Sách Giao Dịch</h2>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} className="shadow-md">
                    <Table aria-label="Transaction Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID Giao dịch</TableCell>
                                <TableCell>ID Người gửi</TableCell>
                                <TableCell>ID Người nhận</TableCell>
                                <TableCell>Số tiền (VND)</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ngày giao dịch</TableCell>
                                <TableCell>Chi tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>{transaction.id}</TableCell>
                                        <TableCell>{transaction.senderId}</TableCell>
                                        <TableCell>{transaction.receiverId}</TableCell>
                                        <TableCell>
                                            {transaction.amount.toLocaleString("vi-VN")}
                                        </TableCell>
                                        <TableCell>{transaction.status}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleViewDetails(transaction)}
                                                style={{ minWidth: 0, padding: 0 }}
                                            >
                                                <FaCaretRight
                                                    style={{ fontSize: "1.25rem", color: "#3B82F6" }}
                                                />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Không có giao dịch nào
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={totalTransactions}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[rowsPerPage]}
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} trên ${count}`
                        }
                    />
                </TableContainer>
            )}

            {/* Modal chi tiết giao dịch */}
            {selectedTransaction && (
                <Dialog
                    open={Boolean(selectedTransaction)}
                    onClose={handleCloseDetails}
                    aria-labelledby="transaction-details-title"
                >
                    <DialogTitle id="transaction-details-title">
                        Chi tiết giao dịch
                    </DialogTitle>
                    <DialogContent>
                        <p>
                            <strong>ID Giao dịch:</strong> {selectedTransaction.id}
                        </p>
                        <p>
                            <strong>ID Người gửi:</strong> {selectedTransaction.senderId}
                        </p>
                        <p>
                            <strong>ID Người nhận:</strong> {selectedTransaction.receiverId}
                        </p>
                        <p>
                            <strong>Số tiền:</strong>{" "}
                            {selectedTransaction.amount.toLocaleString("vi-VN")} VND
                        </p>
                        <p>
                            <strong>Trạng thái:</strong> {selectedTransaction.status}
                        </p>
                        <p>
                            <strong>Ngày giao dịch:</strong> {selectedTransaction.date}
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDetails} color="secondary">
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default AllWalletTransaction;
