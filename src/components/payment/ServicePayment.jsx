import "react-toastify/dist/ReactToastify.css";
import { ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { wGet, wPost } from "../../util/requestUtil.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ServicePayment = () => {
  //lấy thông tin thanh toán
  const navigate = useNavigate();

  const [partner, setPartner] = useState({
    partnerEmail: undefined,
    voucherDiscount: undefined,
    orderId: undefined,
    id: undefined,
    voucherId: undefined,
    partnerId: undefined,
    partnerName: undefined,
    serviceName: undefined,
  });
  const { id } = useParams();
  useEffect(() => {
    wGet(`/v1/prequest/${id}`)
      .then((res) => {
        setPartner(res.data);
      })
      .catch((e) => {});
  }, []);

  //lấy thông tin Ví
  const [user, setUser] = useState({
    balance: 0,
  });
  useEffect(() => {
    wGet("/v1/user/wallet")
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
      });
  }, []);

  //lấy mail của partner
  const recipientEmail = partner.partnerEmail;
  const amount = partner.money - partner.voucherDiscount; //tiền cuối = tiền sp - giá khuyến mãi
  //chuyen trang
  const handleOTPverify = () => {
    navigate("/otpverification?type=service", {
      state: {
        amount,
        recipientEmail,
        partner,
        pid: partner.id,
      },
    });
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    if (amount > user.balance) {
      setLoading(false);
      toast.error("Số dư không đủ! Vui lòng nạp thêm tiền.");
      return;
    }
    try {
      wPost("/v1/otp", {
        otpType: "email",
      })
        .then((res) => {
          toast.success(res.data.message);
          setError(null);
          setLoading(false);
          handleOTPverify();
        })
        .catch((e) => {
          toast.error("Đã xảy ra lỗi!");
          setError("Đã xảy ra lỗi! Vui lòng thử lại.");
          setLoading(false);
        });
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình gửi OTP!", "error");
      setError("Đã xảy ra lỗi trong quá trình gửi OTP!");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-4 pb-12 rounded-lg shadow-xl w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Chi Tiết Thanh Toán
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-800 font-medium">
                Mã Hóa Đơn
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                {partner.orderId}
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Tên dịch vụ
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                {partner.serviceName}
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Mã Đối Tác
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                {partner.partnerId}
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Số Tiền Thanh Toán
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-green-500">
                {partner.money} VND
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Mã Khuyến Mãi
              </label>
              <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                {partner.voucherId}
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium">
                Giá Khuyến Mãi
              </label>
              <div className="text-red-500 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                {partner.voucherDiscount} VND
              </div>
            </div>
            <div
              className={"flex flex-grow items-center gap-4 justify-between"}
            >
              <label className="text-gray-800 font-semibold text-lg">
                Tổng Số Tiền:
              </label>
              <div className="font-semibold text-lg text-green-600">
                {amount} VND
              </div>
            </div>
            <div>
              <button
                className="w-full p-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Đang gửi OTP..." : "Xác Nhận Thanh Toán"}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer stacked />
      <ScrollRestoration />
    </>
  );
};

export default ServicePayment;
