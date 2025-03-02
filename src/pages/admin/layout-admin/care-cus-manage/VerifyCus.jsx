import { useEffect, useState } from "react";
import { wGet, wDelete, wPost } from "../../../../util/request.util";
import VerificationRequestList from "./VerificationRequestList";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";

const VerifyCus = () => {
  const [verifications, setVerifications] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState(null);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await wGet('/v1/verifications/all');
      setVerifications(response);
    } catch (error) {
      console.error('Error fetching verifications:', error);
    }
  };

  const handleDeleteField = (id) => {
    setFieldToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (fieldToDelete) {
      try {
        await wDelete(`/v1/verifications/delete/${fieldToDelete}`);
        setVerifications((prev) => prev.filter((verification) => verification.id !== fieldToDelete));
        setDeleteModalOpen(false);
        toast.success("Yêu cầu xác thực đã bị xóa", { toastId: "delete-success" });
      } catch (error) {
        console.error('Error deleting verification:', error);
        toast.error("Đã xảy ra lỗi khi xóa yêu cầu xác thực", { toastId: "delete-error" });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleApprove = async (userId) => {
    try {
      await wPost(`/v1/verifications/approve/${userId}`);
      fetchVerifications();
      toast.success("Yêu cầu xác thực đã được chấp nhận", { toastId: "approve-success" });
    } catch (error) {
      console.error('Error approving verification:', error);
      toast.error("Đã xảy ra lỗi khi xác thực yêu cầu", { toastId: "approve-error" });
    }
  };

  return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Danh Sách Yêu Cầu Xác Thực</h2>

        <VerificationRequestList
            verifications={verifications}
            onDeleteField={handleDeleteField}
            onApprove={handleApprove}
        />

        <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onDelete={confirmDelete}
            onCancel={cancelDelete}
        />

        <ToastContainer />
      </div>
  );
};

export default VerifyCus;