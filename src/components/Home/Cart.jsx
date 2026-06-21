import { useNavigate } from "react-router-dom";

const Cart = ({ id, name, description, price, image, inStock }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="
        bg-white rounded-xl overflow-hidden shadow-lg
        cursor-pointer
        transform transition duration-300
        hover:scale-105
        hover:shadow-2xl
        hover:border-2 hover:border-yellow-400
      "
    >
      <img src={image} alt={name} className="w-full h-60 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>

        <p className="text-gray-600 mt-2">{description}</p>

        <p className="font-bold text-lg mt-3">Rs. {price}</p>

        <p
          className={`mt-2 ${inStock > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {inStock > 0 ? `${inStock} available` : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default Cart;
