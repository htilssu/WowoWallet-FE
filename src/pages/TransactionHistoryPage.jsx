import {useEffect, useState} from 'react';
import {CiSearch} from 'react-icons/ci';
import TransactionTable from '../components/history/TransactionTable.jsx';
import {get} from '../util/requestUtil.js';
import {toast} from 'react-toastify';

//Tạo Thành Phần Button:
const FilterButton = ({label, filterValue, currentFilter, onClick}) => {
  const isActive = currentFilter === filterValue;
  const buttonClass = `px-4 py-2 rounded border-1 hover:bg-green-300 ${isActive
                                                                       ? 'bg-green-500 text-white'
                                                                       : 'bg-slate-100'}`;
  return (
      <button className={buttonClass} onClick={() => onClick(filterValue)}>
        {label}
      </button>
  );
};

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize(); // Set initial value on mount

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    get(`/v1/transaction/history?offset=5&page=${page}`).then((res) => {
      setTransactions(res.data);
    }).catch((e) => {
      toast.error('Không thể lấy lịch sử giao dịch!');
    });
  }, [page]);

  // Hàm lọc các giao dịch dựa trên bộ lọc
  const filterTransactions = (transactions, filter) => {
    return transactions.filter(transaction => {
      // Áp dụng bộ lọc theo trạng thái
      if (statusFilter !== '') {
        if (transaction.status !== statusFilter) {
          return false;
        }
      }
      // Áp dụng bộ lọc theo loại giao dịch
      if (transactionTypeFilter !== '') {
        if (transaction.transactionType !== transactionTypeFilter) {
          return false;
        }
      }
      // Áp dụng bộ lọc theo thời gian
      if (startDate && endDate) {
        const [dayStart, monthStart, yearStart] = startDate.split('/');
        const [dayEnd, monthEnd, yearEnd] = endDate.split('/');
        const transactionDate = new Date(transaction.createdTime);
        const startFilterDate = new Date(`${yearStart}-${monthStart}-${dayStart}`);
        const endFilterDate = new Date(`${yearEnd}-${monthEnd}-${dayEnd}`);
        if (transactionDate < startFilterDate || transactionDate > endFilterDate) {
          return false;
        }
      }
      return true;
    });
  };

  // Xử lý thay đổi bộ lọc trạng thái
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Xử lý thay đổi thời gian bắt đầu
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Xử lý thay đổi thời gian kết thúc
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Xử lý chọn loại giao dịch để lọc
  const handleTransactionTypeFilter = (type) => {
    setTransactionTypeFilter(type);
    setFilter(type.toLowerCase().replace(' ', '-')); // Cập nhật giá trị lọc tương ứng
  };

  const clearFilters = () => {
    setStatusFilter('');
    setStartDate('');
    setEndDate('');
    setTransactionTypeFilter('');
    setFilter('all'); // Thêm này để xóa bộ lọc loại giao dịch và đồng bộ hóa với dropdown
  };

  // Lấy các giao dịch đã lọc
  const filteredTransactions = filterTransactions(transactions, filter);

  return (
      <div className={'mb-4'}>
        <div className="flex flex-col items-center min-h-screen">
          <div>
            <h2 className="text-3xl font-semibold text-center text-gray-800 p-2">
              Lịch Sử Giao Dịch
            </h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl">
            <div className="mb-4 flex items-center">
              <input
                  type="text"
                  placeholder="Tìm giao dịch"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full"
              />
              <button className="ml-2 px-4 py-2 bg-gray-200 rounded">
                <CiSearch/>
              </button>
            </div>
            <div className={isMobile ? 'mb-4' : 'flex flex-col md:flex-row justify-between mb-4'}>
              {!isMobile ? (
                  <div className="flex space-x-2">
                    <FilterButton
                        label="TẤT CẢ"
                        filterValue=""
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="THANH TOÁN"
                        filterValue="THANH TOÁN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="NẠP TIỀN"
                        filterValue="NẠP TIỀN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="RÚT TIỀN"
                        filterValue="RÚT TIỀN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="CHUYỂN TIỀN"
                        filterValue="CHUYỂN TIỀN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="NHẬN TIỀN"
                        filterValue="NHẬN TIỀN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                    <FilterButton
                        label="HOÀN TIỀN"
                        filterValue="HOÀN TIỀN"
                        currentFilter={filter}
                        onClick={handleTransactionTypeFilter}
                    />
                  </div>
              ) : (
                   <select
                       className="px-4 py-2 border rounded w-full"
                       onChange={(e) => handleTransactionTypeFilter(e.target.value)}
                       value={transactionTypeFilter}
                   >
                     <option value="TẤT CẢ">TẤT CẢ CÁC GIAO DỊCH</option>
                     <option value="THANH TOÁN">THANH TOÁN</option>
                     <option value="NẠP TIỀN">NẠP TIỀN</option>
                     <option value="RÚT TIỀN">RÚT TIỀN</option>
                     <option value="CHUYỂN TIỀN">CHUYỂN TIỀN</option>
                     <option value="HOÀN TIỀN">HOÀN TIỀN</option>
                   </select>
               )}
            </div>
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex items-center mr-4">Lọc Theo:</div>
                  <div className={'flex items-center max-w-full mr-4'}>
                    <select
                        className="px-4 py-[7px] border rounded"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="Thành công">Thành công</option>
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã hoàn tiền">Đã hoàn tiền</option>
                      <option value="Thất bại">Thất bại</option>
                    </select>
                  </div>
                  <div className="flex flex-col tm:flex-row">
                    <div className={'flex items-center mr-2'}>Thời gian:</div>
                    <div className="flex items-center flex-col ssm:flex-row gap-2">
                      <input
                          type="date"
                          value={startDate}
                          onChange={handleStartDateChange}
                          className="px-3 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <div>
                        <label className={'mr-2'}>Đến:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer text-blue-500 hover:text-red-600" onClick={clearFilters}>
                Xóa Bộ Lọc
              </div>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row gap-1 mt-3">
              <p>Có {filteredTransactions.length} giao dịch.</p>
              <div>
                Tổng Tiền GD: 2,620,000 đ
              </div>
            </div>
            {/*truyền props*/}
            {filteredTransactions.length === 0 ? (
                <NotFound/>
            ) : (
                 <TransactionTable setPage={setPage} transactions={transactions}/>
             )}
          </div>
        </div>
      </div>
  );
};
const NotFound = () => {
  return (
      <div className="flex flex-col items-center justify-center border-2">
        <div className="text-center">
          <img src="/notfound.png" alt="Not Found" className="max-w-full h-auto mx-auto mb-4"/>
          <p className="text-lg font-semibold text-gray-500">Không tìm thấy kết quả!</p>
        </div>
      </div>
  );
};

export default TransactionHistory;