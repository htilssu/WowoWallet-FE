const TicketRequestSuccess = () => { 
    return (
        <div className="flex flex-col items-center justify-center h-screen text-green-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M9 16.2l-3.5-3.5L4 14l5 5L20 8l-1.5-1.5L9 16.2z"/>
            </svg>
            <p className="mt-4 text-lg font-semibold">Yêu cầu đã được gửi thành công!</p>
        </div>
    );
};

export default TicketRequestSuccess;
