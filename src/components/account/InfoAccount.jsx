import { FaAngleRight, FaUserPlus, FaEnvelope } from "react-icons/fa6";
import Switch from "react-switch";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../modules/hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  TextInput,
  Avatar,
  FileInput,
  Group,
} from "@mantine/core";
import OTPForm from "../OTPForm.jsx";
import { updateUser } from "../../modules/user/user.js";
import { queryClient } from "../../modules/cache.js";

/**
 * Định dạng ngày tháng
 * @param {string} dateString - Chuỗi ngày tháng
 * @returns {string} Chuỗi ngày tháng đã được định dạng
 */
const formatDate = (dateString) => {
  if (!dateString) return "Không có";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString || "Không có";
  }
};

const InfoAccount = () => {
  const [stateIdentity, setIdentity] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState(true);
  const { user } = useAuth();
  const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false);

  // Field edit modals
  const [editingField, setEditingField] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    job: "",
    phoneNumber: "",
    avatar: null,
    address: "",
  });

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        job: user.job || "",
        phoneNumber: user.phoneNumber || "",
        avatar: user.avatar || null,
        address: user.address || "",
      });
    }
  }, [user]);

  // Ghi log thông tin người dùng khi component render
  useEffect(() => {
    if (user) {
      console.log("Thông tin người dùng:", {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
      });
    }
  }, [user]);

  function handleChange(checked) {
    setState(checked);
  }

  const handleIdentityAuthClick = () => {
    setIdentity(true);
  };

  if (stateIdentity) {
    navigate("/management-personal/identity-auth");
  }

  const handleVerifyEmailClick = () => {
    setIsEmailVerifyModalOpen(true);
  };

  const handleCloseEmailVerifyModal = () => {
    setIsEmailVerifyModalOpen(false);
  };

  const handleOpenFieldEditModal = (field) => {
    setEditingField(field);
  };

  const handleCloseFieldEditModal = () => {
    setEditingField(null);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmitFieldEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data to send - only the current field
      const updateUserDTO = {};

      if (editingField === "name") {
        updateUserDTO.firstName = formData.firstName;
        updateUserDTO.lastName = formData.lastName;
      } else if (editingField === "avatar") {
        updateUserDTO.avatar = formData.avatar;
      } else if (editingField === "address") {
        updateUserDTO.address = formData.address;
      } else {
        updateUserDTO[editingField] = formData[editingField];
      }

      // Only include fields that have values
      Object.keys(updateUserDTO).forEach((key) => {
        if (!updateUserDTO[key]) {
          delete updateUserDTO[key];
        }
      });

      // Send update request
      await updateUser(updateUserDTO);

      // Update cache and close modal
      queryClient.invalidateQueries(["user"]);
      toast.success("Cập nhật thông tin thành công!");
      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message || "Lỗi khi cập nhật thông tin"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailOTP = async (/*otpCode*/) => {
    try {
      // OTP đã được xác thực trong OTPForm component
      toast.success("Email đã được xác thực thành công!");
      setIsEmailVerifyModalOpen(false);

      // Cập nhật dữ liệu người dùng
      try {
        await updateUser({ isVerified: true });
        console.log("Đã cập nhật trạng thái xác thực email");
      } catch (updateError) {
        console.error("Lỗi khi cập nhật trạng thái xác thực:", updateError);
      }

      // Cập nhật thông tin người dùng trong cache
      queryClient.invalidateQueries(["user"]);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Xác thực OTP thất bại");
      return Promise.reject(error);
    }
  };

  // Render field edit modals based on current editing field
  const renderFieldEditModal = () => {
    const getModalTitle = () => {
      switch (editingField) {
        case "name":
          return "Cập nhật họ tên";
        case "phoneNumber":
          return "Cập nhật số điện thoại";
        case "job":
          return "Cập nhật nghề nghiệp";
        case "avatar":
          return "Cập nhật ảnh đại diện";
        case "address":
          return "Cập nhật địa chỉ";
        default:
          return "Cập nhật thông tin";
      }
    };

    return (
      <Modal
        opened={editingField !== null}
        onClose={handleCloseFieldEditModal}
        title={getModalTitle()}
        centered
        size="md"
      >
        <form onSubmit={handleSubmitFieldEdit}>
          {editingField === "name" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <TextInput
                label="Họ"
                placeholder="Nhập họ"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
              <TextInput
                label="Tên"
                placeholder="Nhập tên"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
          )}

          {editingField === "phoneNumber" && (
            <TextInput
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="mb-4"
              required
            />
          )}

          {editingField === "job" && (
            <TextInput
              label="Nghề nghiệp"
              placeholder="Nhập nghề nghiệp"
              value={formData.job}
              onChange={(e) => handleInputChange("job", e.target.value)}
              className="mb-4"
              required
            />
          )}

          {editingField === "address" && (
            <TextInput
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="mb-4"
              required
            />
          )}

          {editingField === "avatar" && (
            <>
              <Group position="center" className="mb-4">
                <Avatar
                  size={100}
                  radius={100}
                  src={formData.avatar}
                  alt={`${formData.lastName} ${formData.firstName}`}
                />
              </Group>
              <FileInput
                label="Ảnh đại diện"
                placeholder="Chọn ảnh đại diện"
                accept="image/*"
                onChange={(file) => handleInputChange("avatar", file)}
                className="mb-6"
                required
              />
            </>
          )}

          <Group position="right" className="mt-4">
            <Button
              variant="outline"
              onClick={handleCloseFieldEditModal}
              color="gray"
            >
              Hủy
            </Button>
            <Button type="submit" loading={isSubmitting} color="blue">
              Lưu thay đổi
            </Button>
          </Group>
        </form>
      </Modal>
    );
  };

  // Render the edit button for a field
  const renderEditButton = (field) => (
    <div
      className="flex items-center mr-5 text-primaryColor cursor-pointer"
      onClick={() => handleOpenFieldEditModal(field)}
    >
      <p className="text-xs font-medium mr-1">Thay đổi</p>
      <div className="mt-0.7">
        <FaAngleRight size={9} />
      </div>
    </div>
  );

  return (
    <div className="info-account grid grid-rows-2 gap-y-5">
      {/* Email Verification Modal */}
      <Modal
        opened={isEmailVerifyModalOpen}
        onClose={handleCloseEmailVerifyModal}
        title="Xác thực Email"
        centered
      >
        <OTPForm
          onSuccess={handleVerifyEmailOTP}
          otpType="EMAIL_VERIFICATION"
          transactionId={null}
          hideSelector={true}
          email={user?.email}
          phoneNumber={user?.phoneNumber}
        />
      </Modal>

      {/* Field Edit Modal - dynamically rendered based on current editing field */}
      {renderFieldEditModal()}

      {/* Account Information */}
      <div className="row-span-1">
        <div className="grid grid-rows-10 gap-x-3 ml-2 bg-white w-full h-auto rounded-lg p-2 pb-9">
          {/* Header */}
          <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1 justify-between">
            <div className="flex items-center">
              <div className="text-primaryColor">
                <FaUserCircle size={20} />
              </div>
              <div className="font-normal text-md ml-2">
                Thông tin tài khoản
              </div>
            </div>
            <div className="mr-5">
              {user && user.avatar ? (
                <Avatar
                  src={user.avatar}
                  alt={`${user?.lastName || ""} ${user?.firstName || ""}`}
                  radius="xl"
                  size="md"
                  onClick={() => handleOpenFieldEditModal("avatar")}
                  className="cursor-pointer"
                />
              ) : (
                <Avatar
                  radius="xl"
                  size="md"
                  color="blue"
                  onClick={() => handleOpenFieldEditModal("avatar")}
                  className="cursor-pointer"
                >
                  {user && user.firstName ? user.firstName.charAt(0) : "U"}
                </Avatar>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="info-container row-span-9 ml-2 items-center mt-3">
            {/* Responsive Grid (adjusts columns based on screen size) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-3 w-auto h-full">
              <div className="col-span-1 grid grid-rows-7 items-center">
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Mã tài khoản
                  </p>
                  <div className="id-account font-medium mt-2 text-base">
                    <p>{user?.id || "N/A"}</p>
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Trạng thái
                  </p>
                  <div className="status-account font-medium mt-2 flex justify-between">
                    <p className="text-sm bg-dimPrimaryColor items-center text-center rounded-2xl py-0.7 px-2 text-primaryColor">
                      {user?.isVerified ? "Đã xác thực" : "Chưa xác thực"}
                    </p>
                    <div
                      className="flex items-center mr-5 text-primaryColor cursor-pointer"
                      onClick={handleIdentityAuthClick}
                    >
                      <p className="text-xs font-medium mr-1">Chứng thực</p>
                      <div className="mt-0.7">
                        <FaAngleRight size={9} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">Email</p>
                  <div className="email-account font-medium mt-2 text-base flex justify-between">
                    <div className="flex items-center flex-wrap">
                      <p className="break-all">
                        {user?.email || "Chưa cập nhật"}
                      </p>
                      {user?.isVerified ? (
                        <span className="ml-2 text-green-500 text-xs bg-green-100 px-2 py-1 rounded-full">
                          Đã xác thực
                        </span>
                      ) : (
                        <span className="ml-2 text-red-500 text-xs bg-red-100 px-2 py-1 rounded-full">
                          Chưa xác thực
                        </span>
                      )}
                    </div>
                    {user && !user.isVerified && (
                      <Button
                        leftSection={<FaEnvelope size={14} />}
                        variant="subtle"
                        color="blue"
                        size="xs"
                        className="mr-5"
                        onClick={handleVerifyEmailClick}
                      >
                        Xác thực email
                      </Button>
                    )}
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Số điện thoại
                  </p>
                  <div className="phone-account font-medium mt-2 text-base flex justify-between">
                    <p>{user?.phoneNumber || "Chưa cập nhật"}</p>
                    {renderEditButton("phoneNumber")}
                  </div>
                </div>
              </div>
              <div className="col-span-1 grid grid-rows-7 sm:mt-0 mt-9 items-center">
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Tên tài khoản
                  </p>
                  <div className="name-account font-medium mt-2 text-base flex justify-between">
                    <p>
                      {user
                        ? `${user.lastName || ""} ${user.firstName || ""}`
                        : "Chưa cập nhật"}
                    </p>
                    {renderEditButton("name")}
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Ngày sinh
                  </p>
                  <div className="type-account font-medium mt-2 text-base">
                    <p>{formatDate(user?.dob)}</p>
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">
                    Thông báo khi có giao dịch phát sinh
                  </p>
                  <div className="notification-account font-medium mt-2 text-base flex justify-between">
                    <p>Nhận thông báo qua email</p>
                    <div className="mr-5">
                      <Switch
                        onChange={handleChange}
                        checked={state}
                        onColor="#0f8be8"
                        height={25}
                        width={50}
                        handleDiameter={16}
                      />
                    </div>
                  </div>
                </div>
                <div className="row-span-1 border-b-1 border-borderColor"></div>
                <div className="row-span-1">
                  <p className="text-textGray0 font-medium text-sm">Địa chỉ</p>
                  <div className="location-account font-medium mt-2 text-base flex justify-between">
                    <p>{user?.address || "Chưa cập nhật"}</p>
                    {renderEditButton("address")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="row-span-1">
        <div className="info-sup-account grid grid-rows-6 gap-x-3 ml-2 bg-white w-full h-auto rounded-lg p-2 mt-5">
          {/* Header */}
          <div className="info-sup-header row-span-1 ml-2 items-center mt-2 flex mb-1">
            <div className="text-primaryColor">
              <FaUserPlus size={20} />
            </div>
            <div className="font-normal text-md ml-2">Thông tin bổ sung</div>
          </div>

          {/* Content */}
          <div className="info-sup-container row-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="col-span-1 grid grid-rows-4 ml-2 items-center">
              <div className="row-span-1">
                <p className="text-textGray0 font-medium text-sm">
                  Họ tên chủ tài khoản
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>
                    {user
                      ? `${user.lastName || ""} ${user.firstName || ""}`
                      : "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="row-span-1 mt-4 lg:mt-3">
                <p className="text-textGray0 font-medium text-sm">
                  Tên người dùng
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>{user?.username || "Không có"}</p>
                </div>
              </div>
              <div className="row-span-1 mt-7 lg:mt-4">
                <p className="text-textGray0 font-medium text-sm">
                  Nghề nghiệp
                </p>
                <div className="type-account font-medium mt-2 text-base flex justify-between">
                  <p>{user?.job || "Chưa cập nhật"}</p>
                  {renderEditButton("job")}
                </div>
              </div>
              <div className="row-span-1 mt-7 lg:mt-4">
                <p className="text-textGray0 font-medium text-sm">
                  Số CMND/CCCD
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>{user?.identityNumber || "Chưa cập nhật"}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-4 ml-2 items-center">
              <div className="row-span-1 ">
                <p className="text-textGray0 font-medium text-sm">Giới tính</p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>
                    {user?.gender === true
                      ? "Nam"
                      : user?.gender === false
                        ? "Nữ"
                        : "Chưa cập nhật"}
                  </p>
                </div>
              </div>
              <div className="row-span-1 mt-5 lg:mt-3">
                <p className="text-textGray0 font-medium text-sm">
                  Ngày tạo tài khoản
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>{formatDate(user?.createdAt)}</p>
                </div>
              </div>
              <div className="row-span-1 mt-8 lg:mt-4">
                <p className="text-textGray0 font-medium text-sm">
                  Trạng thái tài khoản
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p
                    className={
                      user?.isActive ? "text-green-600" : "text-red-600"
                    }
                  >
                    {user?.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                  </p>
                </div>
              </div>
              <div className="row-span-1 mt-8 lg:mt-4">
                <p className="text-textGray0 font-medium text-sm">
                  Ngày cập nhật gần nhất
                </p>
                <div className="type-account font-medium mt-2 text-base">
                  <p>{formatDate(user?.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InfoAccount;
