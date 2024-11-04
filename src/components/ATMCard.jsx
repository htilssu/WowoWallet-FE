import { useState } from 'react';
import { creditCardFormat } from '../util/number.util.js';
import { SiVisa } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa'; // Import biểu tượng thùng rác

import ('../../public/css/ATMCard.jsx.css');

function ATMCard({
                     cardNumber,
                     cardHolder,
                     year,
                     month,
                     bankName,
                     backgroundColor,
                     logo,
                     cvv,
                     onDelete // Thêm hàm xóa vào props
                 }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // State để theo dõi hover
    const [showConfirm, setShowConfirm] = useState(false); // State để quản lý dialog xác nhận xóa

    const handleDelete = () => {
        setShowConfirm(true); // Hiển thị dialog xác nhận
    };

    const confirmDelete = () => {
        onDelete(cardNumber); // Gọi hàm onDelete với cardNumber
        setShowConfirm(false); // Ẩn dialog xác nhận sau khi xóa
    };

    const cancelDelete = () => {
        setShowConfirm(false); // Ẩn dialog xác nhận nếu hủy
    };

    const handleCardFlip = () => {
        setIsFlipped(true);
        setTimeout(() => {
            setIsFlipped(false);
        }, 3000);
    };

    return (
        <div
            style={{
                backgroundImage: 'url(/galaxy.jpg)',
                backgroundSize: 'cover',
                transformStyle: 'preserve-3d',
                backgroundPosition: 'center',
            }}
            className={`relative transform-gpu rounded-lg p-4 min-h-[220px] h-full text-white ${!backgroundColor ? 'bg-blue-300' : backgroundColor} transition-transform ease-linear ${isFlipped && 'rotate-y-180 perspective'}`}
            onClick={handleCardFlip}
            onMouseEnter={() => setIsHovered(true)} // Bật hover
            onMouseLeave={() => setIsHovered(false)} // Tắt hover
        >
            <div className={`${isFlipped && 'hidden'} backface-visibility-hidden flex flex-col justify-between items-start h-full`}>
                <img src={logo} alt="Bank Logo" className={'w-12 h-auto'} />
                <div className={'w-full'}>{bankName}</div>
                <img src={'/card-chip.png'} alt="Chip Icon" className={'w-12'} />
                <div className={'text-xl text-center'} style={{ letterSpacing: '0.5rem' }}>
                    {creditCardFormat(cardNumber.slice(0, 16))}
                </div>
                <div className={'flex justify-between w-full'}>
                    <div>
                        <div className={'line-clamp-1 overflow-ellipsis overflow-hidden whitespace-nowrap max-w-80'}>
                            {cardHolder.toUpperCase()}
                        </div>
                        <div>Expiry: {month}/{year}</div>
                    </div>
                    <div className={'flex justify-center items-end'}>
                        <SiVisa className={'text-4xl'} />
                    </div>
                </div>
            </div>

            <div className={`absolute flex flex-col p-4 backface-visibility-hidden justify-between items-start top-0 left-0 w-full h-full rotate-y-180`}>
                <div className={'h-10 bg-black rounded mt-2 w-full'} />
                <div className={'flex justify-start gap-2 items-center mt-4'}>
                    <div>CVV</div>
                    <div className={'text-center w-12 bg-gray-200 text-gray-700 font-bold py-2 rounded'}>
                        {cvv}
                    </div>
                </div>
                <span style={{ marginTop: 'auto', fontSize: '0.8rem' }}>Customer Service: 123-456-7890</span>
            </div>

            {/* Hiển thị biểu tượng thùng rác khi hover */}
            {isHovered && (
                <div className="absolute top-2 right-2 cursor-pointer text-white" onClick={handleDelete}>
                    <FaTrash className="text-red-400" />
                </div>
            )}

            {/* Dialog xác nhận xóa */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg z-60">
                        <p className="text-lg mb-4">Bạn có chắc chắn muốn xóa thẻ này không?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={confirmDelete}
                            >
                                Xóa
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={cancelDelete}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ATMCard;
