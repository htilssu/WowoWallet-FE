import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CardAtmComponents = ({ title, text, link, onClick }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        if (onClick) {
            onClick(event);
        } else if (link) {
            navigate(link);
        }
    };

    return (
        <div
            className="cart card-atm w-full md:w-[400px] h-[220px] p-5 mt-4 bg-white border-[2px] border-dashed border-gray-300 rounded-3xl flex flex-col justify-center items-center  transition duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
        >
            <div className="card-body text-center">
                <div className="flex justify-center items-center mb-2">
                    <div className="card-icon it text-3xl text-green-500">
                        <IoIosAddCircle />
                    </div>
                </div>
                <h5 className="card-title text-lg text-green-500 mb-2">{title}</h5>
                <p className="card-text text-sm md:text-base text-green-500">{text}</p>
            </div>
        </div>
    );
};

export default CardAtmComponents;
