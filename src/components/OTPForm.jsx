import { Button, PinInput, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { ScrollRestoration } from "react-router-dom";
import { sendOTP, verifyOTP } from "../modules/otp.js";
import { toast } from "react-toastify";

/**
 * Form nhập OTP và xác thực
 * @param {function} onSuccess - Callback khi xác thực OTP thành công
 * @param {string} otpType - Loại OTP (EMAIL_VERIFICATION, PHONE_VERIFICATION, TRANSACTION_CONFIRMATION, PASSWORD_RESET, ...)
 * @param {string} transactionId - ID của giao dịch (nếu có)
 * @param {boolean} hideSelector - Ẩn bộ chọn phương thức gửi OTP (mặc định: false)
 * @param {string} phoneNumber - Số điện thoại người dùng (dùng khi gửi qua SMS)
 * @param {string} email - Email người dùng (dùng khi gửi qua email)
 */
const OTPForm = ({
  onSuccess,
  otpType,
  transactionId,
  hideSelector,
  phoneNumber,
  email,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(undefined);
  const [resendTime, setResendTime] = useState(60);
  const [loading, { close, open }] = useDisclosure();
  const [sendLoading, setSendLoading] = useState(false);
  const [sendChannel, setSendChannel] = useState("EMAIL");

  // Xác định xem có hiển thị bộ chọn phương thức gửi hay không
  const shouldHideSelector =
    hideSelector ||
    otpType === "EMAIL_VERIFICATION" ||
    otpType === "PHONE_VERIFICATION";

  // Tự động chọn phương thức gửi dựa trên loại OTP
  useEffect(() => {
    if (otpType === "EMAIL_VERIFICATION") {
      setSendChannel("EMAIL");
    } else if (otpType === "PHONE_VERIFICATION") {
      setSendChannel("SMS");
    }
  }, [otpType]);

  // Đếm ngược thời gian để gửi lại OTP
  useEffect(() => {
    if (resendTime <= 0) return;

    const timer = setInterval(() => {
      setResendTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTime]);

  function onPinInputChange(value) {
    setError(null);
    setOtp(value);
  }

  async function onSubmitOtp(e) {
    setError(null);
    e.preventDefault();
    if (otp.length < 6) {
      setError("Mã OTP phải có 6 chữ số");
      return;
    }

    // Tạo đối tượng cho xác thực OTP theo OTPVerifyDTO
    const verifyDTO = {
      otpCode: otp,
      otpType: otpType,
      transactionId: transactionId,
    };

    open();
    try {
      await verifyOTP(verifyDTO);
      toast.success("Xác thực OTP thành công!");
      close();

      // Gọi callback onSuccess nếu được cung cấp
      if (onSuccess) {
        onSuccess(otp);
      }
    } catch (error) {
      console.error("Lỗi xác thực OTP:", error);
      setError(error.response?.data?.message || "Lỗi xác thực OTP");
      close();
    }
  }

  async function handleSendOtp() {
    // Xác định recipient dựa trên phương thức gửi
    let recipient;
    if (sendChannel === "SMS") {
      recipient = phoneNumber; // Sử dụng phoneNumber cho SMS
      if (!recipient || !recipient.trim() || recipient.includes("@")) {
        setError("Cần cung cấp số điện thoại hợp lệ để gửi OTP qua SMS");
        return;
      }
    } else {
      recipient = email; // Sử dụng email cho Email
      if (!recipient || !recipient.trim() || !recipient.includes("@")) {
        setError("Cần cung cấp email hợp lệ để gửi OTP qua email");
        return;
      }
    }

    // Tạo đối tượng OTPRequestDTO theo định nghĩa Java
    const otpRequestDTO = {
      otpType: otpType,
      recipient: recipient,
      transactionId: transactionId,
      sendMethod: sendChannel, // API sẽ xử lý chuyển thành sendChannel
    };

    console.log("Gửi OTP với thông tin:", {
      ...otpRequestDTO,
      phương_thức: sendChannel === "EMAIL" ? "Email" : "SMS",
    });

    // Đặt lại thời gian đếm ngược
    setResendTime(60);
    setError(null);
    setSendLoading(true);

    try {
      await sendOTP(otpRequestDTO);
      console.log(
        `Đã gửi OTP qua ${sendChannel === "EMAIL" ? "Email" : "SMS"} thành công`
      );
      toast.success(
        `Đã gửi mã OTP qua ${sendChannel === "EMAIL" ? "Email" : "SMS"}`
      );
      setSendLoading(false);
    } catch (e) {
      console.error("Lỗi khi gửi OTP:", e);
      setError(e.response?.data?.message || "Lỗi khi gửi OTP");
      setSendLoading(false);
    }
  }

  // Xác định tiêu đề dựa trên loại OTP
  const getOtpTitle = () => {
    switch (otpType) {
      case "EMAIL_VERIFICATION":
        return "Xác thực Email";
      case "PHONE_VERIFICATION":
        return "Xác thực Số điện thoại";
      case "TRANSACTION_CONFIRMATION":
        return "Xác thực Giao dịch";
      case "PASSWORD_RESET":
        return "Khôi phục mật khẩu";
      default:
        return "Xác thực OTP";
    }
  };

  // Xác định địa chỉ hiển thị dựa trên phương thức gửi
  const getDisplayRecipient = () => {
    return sendChannel === "SMS" ? phoneNumber : email;
  };

  // Xử lý khi thay đổi phương thức gửi
  const handleSendChannelChange = (value) => {
    console.log(
      `Đã chọn phương thức gửi: ${value === "EMAIL" ? "Email" : "SMS"}`
    );
    setSendChannel(value);
    // Reset error khi đổi phương thức
    setError(null);
  };

  return (
    <div className={""}>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-md p-4 border-1">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {getOtpTitle()}
            </h2>
            <p className="text-gray-600 text-center">
              Nhập mã OTP được gửi đến:
            </p>
            <div className="font-medium text-md text-gray-800 mb-4">
              {getDisplayRecipient()}
            </div>
          </div>

          {!shouldHideSelector && (
            <div className="mb-4">
              <Select
                label="Phương thức gửi OTP"
                value={sendChannel}
                onChange={handleSendChannelChange}
                data={[
                  { value: "EMAIL", label: "Email" },
                  { value: "SMS", label: "SMS" },
                ]}
              />
            </div>
          )}

          <div className="mb-6">
            <Button
              loading={sendLoading}
              onClick={handleSendOtp}
              fullWidth
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!getDisplayRecipient()}
            >
              {sendLoading
                ? "Đang gửi..."
                : `Gửi lại OTP qua ${sendChannel === "EMAIL" ? "Email" : "SMS"}`}
            </Button>
          </div>

          <form onSubmit={onSubmitOtp} className="space-y-6">
            <div className="flex flex-col justify-center items-center">
              <PinInput
                length={6}
                type={/^[0-9]*$/}
                inputMode="numeric"
                value={otp}
                oneTimeCode
                onChange={onPinInputChange}
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-between items-center gap-6">
              <Button
                loading={loading}
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2"
              >
                Xác nhận
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            {resendTime > 0 && (
              <p className="text-gray-600">
                Mã OTP hết hiệu lực sau:{" "}
                <span className="font-medium text-red-600">{resendTime}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default OTPForm;
