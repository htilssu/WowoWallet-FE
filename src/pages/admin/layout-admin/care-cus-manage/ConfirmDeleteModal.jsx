import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ isOpen, onDelete, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Xác nhận xóa</h3>
                <p>Bạn có chắc chắn muốn xóa yêu cầu này không?</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Hủy</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onDelete}>Xóa</button>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;