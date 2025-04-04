import { useState } from 'react';

const SearchBar = ({ setSearchQuery, setSearchType, setCurrentPage }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('username');
    const [error, setError] = useState('');

    const validateInput = (value, searchType) => {
        switch (searchType) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? '' : 'Email không hợp lệ';
            case 'dateOfBirth':
                const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
                return dateRegex.test(value) ? '' : 'Định dạng ngày sinh không hợp lệ (DD-MM-YYYY)';
            case 'gender':
                return ['Nam', 'Nữ'].includes(value) ? '' : 'Giới tính phải là Nam hoặc Nữ';
            case 'username':
                return value.length >= 3 ? '' : 'Username phải có ít nhất 3 ký tự';
            case 'fullName':
                const trimmedValue = value.trim();
                if (trimmedValue.length < 2) {
                    return 'Họ tên phải có ít nhất 2 ký tự';
                }
                // Kiểm tra xem có chứa ký tự đặc biệt không
                if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(trimmedValue)) {
                    return 'Họ tên chỉ được chứa chữ cái và khoảng trắng';
                }
                return '';
            default:
                return '';
        }
    };

    const handleSearch = () => {
        const validationError = validateInput(query, type);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');
        setSearchQuery(query);
        setSearchType(type);
        setCurrentPage(1);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setQuery('');
        setError('');
    };

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        setError('');
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
                <select
                    value={type}
                    onChange={handleTypeChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                    <option value="dateOfBirth">Ngày sinh</option>
                    <option value="gender">Giới tính</option>
                    <option value="fullName">Họ tên</option>
                </select>

                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyPress={handleKeyPress}
                    placeholder={`Tìm kiếm theo ${type === 'username' ? 'username' : 
                        type === 'email' ? 'email' : 
                        type === 'dateOfBirth' ? 'ngày sinh (DD-MM-YYYY)' : 
                        type === 'gender' ? 'giới tính (Nam/Nữ)' : 
                        'họ tên'}`}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <button
                    onClick={handleSearch}
                    className="bg-cyan-600 lg:w-36 w-28 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition duration-200"
                >
                    Tìm kiếm
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
};

export default SearchBar;