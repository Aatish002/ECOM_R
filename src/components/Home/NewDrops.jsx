import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewDrops = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchHot = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product?page=1&perPage=10`,
        );
        setProducts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHot();
  }, []);

  const startIndex = page * ITEMS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const nextPage = () => {
    setPage((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 >= 0 ? prev - 1 : totalPages - 1));
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-6 text-white">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-[cursive] text-yellow-400 tracking-widest">
          NEW DROP
        </h2>
      </div>

      {/* WRAPPER */}
      <div className="relative max-w-7xl mx-auto">
        {/* LEFT ARROW */}
        <button
          onClick={prevPage}
          className="
            absolute left-2 sm:left-0 md:-left-10 lg:-left-14
            top-1/2 -translate-y-1/2
            w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
            rounded-full
            bg-black border border-gray-700
            flex items-center justify-center
            text-white
            hover:border-yellow-400 hover:scale-110 transition
            z-10
          "
        >
          ←
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextPage}
          className="
            absolute right-2 sm:right-0 md:-right-10 lg:-right-14
            top-1/2 -translate-y-1/2
            w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
            rounded-full
            bg-black border border-gray-700
            flex items-center justify-center
            text-white
            hover:border-yellow-400 hover:scale-110 transition
            z-10
          "
        >
          →
        </button>

        {/* CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {visibleProducts.map((item, index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="
                relative bg-gradient-to-b from-[#111] to-black
                border border-gray-800
                rounded-2xl overflow-hidden
                cursor-pointer
                hover:scale-105 transition duration-300
                hover:border-yellow-400
              "
            >
              {/* FEATURED */}
              {page === 1 && index === 0 && (
                <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  FEATURED
                </div>
              )}

              {/* IMAGE */}
              <div className="h-48 sm:h-64 lg:h-80 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              {/* INFO */}
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-yellow-400 font-bold mt-2 text-sm sm:text-base">
                  Rs. {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`
                transition rounded-full
                ${page === i ? "bg-yellow-400 w-6 h-2.5" : "bg-gray-600 w-2.5 h-2.5"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDrops;
