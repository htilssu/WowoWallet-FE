import { wGet, wPost, wPut } from "../../util/request.util.js";

export async function getUserWallet(userId) {
  return await wGet(`/v1/user/${userId}/wallet`);
}

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {Promise<Object>} Thông tin người dùng
 */
export async function getUser() {
  return await wGet("/v1/user");
}

/**
 * Cập nhật thông tin người dùng
 * @param {Object} updateUserDTO - Đối tượng chứa thông tin cần cập nhật
 * @param {string} updateUserDTO.firstName - Tên của người dùng
 * @param {string} updateUserDTO.lastName - Họ của người dùng
 * @param {string} updateUserDTO.job - Nghề nghiệp của người dùng
 * @param {string} updateUserDTO.avatar - Đường dẫn đến avatar
 * @param {string} updateUserDTO.phoneNumber - Số điện thoại
 * @returns {Promise<Object>} Thông tin người dùng sau khi cập nhật
 */
export async function updateUser(updateUserDTO) {
  return await wPost("/v1/user/update", updateUserDTO);
}

/**
 * Gửi yêu cầu đặt lại mật khẩu
 * @param {string} email - Email của người dùng cần đặt lại mật khẩu
 * @returns {Promise<Object>} Kết quả từ API
 */
export async function resetPassword(email) {
  return await wPost("/v1/auth/reset-password", { email });
}
