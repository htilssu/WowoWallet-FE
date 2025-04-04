import { wPost } from "../util/request.util.js";

/**
 * Gửi OTP theo yêu cầu từ API
 * @param {Object} otpRequestDTO - Đối tượng chứa thông tin yêu cầu OTP
 * @param {string} otpRequestDTO.otpType - Loại OTP (ACCOUNT_VERIFICATION, PASSWORD_RESET, TRANSACTION_CONFIRMATION, ...)
 * @param {string} otpRequestDTO.userId - ID của người dùng
 * @param {string} otpRequestDTO.recipient - Địa chỉ người nhận (email hoặc số điện thoại)
 * @param {string} otpRequestDTO.transactionId - ID giao dịch (nếu là OTP liên quan đến giao dịch)
 * @param {string} otpRequestDTO.sendMethod - Phương thức gửi OTP (EMAIL hoặc SMS)
 * @returns {Promise<Object>} Kết quả từ API
 */
export async function sendOTP(otpRequestDTO) {
  // Chuyển sendMethod thành sendChannel theo yêu cầu của API
  const requestData = {
    ...otpRequestDTO,
    sendChannel: otpRequestDTO.sendMethod,
  };

  return await wPost("api/otp/send", requestData);
}

/**
 * Xác minh OTP
 * @param {Object} verifyData - Dữ liệu xác minh OTP
 * @param {string} verifyData.userId - ID người dùng (không cần thiết với controller mới)
 * @param {string} verifyData.otpCode - Mã OTP nhập vào
 * @param {string} verifyData.otpType - Loại OTP
 * @param {string} verifyData.transactionId - ID giao dịch (nếu có)
 * @returns {Promise<Object>} Kết quả xác minh từ API
 */
export async function verifyOTP(verifyData) {
  // Tạo đối tượng OTPVerifyDTO theo định nghĩa mới
  const verifyDTO = {
    otpCode: verifyData.otpCode,
    otpType: verifyData.otpType,
    transactionId: verifyData.transactionId,
  };

  return await wPost("api/otp/verify", verifyDTO);
}

// Các hàm cũ cho khả năng tương thích ngược
export async function sendTransferMoneyOtp() {
  const otpRequestDTO = {
    otpType: "TRANSACTION_CONFIRMATION",
    sendMethod: "EMAIL",
  };
  return sendOTP(otpRequestDTO);
}

export async function verifyTransferMoneyOtp(otp) {
  const verifyData = {
    otpCode: otp,
    otpType: "TRANSACTION_CONFIRMATION",
  };
  return verifyOTP(verifyData);
}
