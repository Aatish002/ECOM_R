import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";

const Body = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const perPage = 6;

  const fetchProducts = async (pageNumber, reset = false) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/product?perPage=${perPage}&page=${pageNumber}`,
    );

    const newProducts = res.data.data;

    setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));

    if (newProducts.length < perPage) setHasMore(false);
  };

  const fetchAllProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/product?perPage=1000&page=1`,
    );

    setAllProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts(1, true);
    fetchAllProducts();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  
  const suggestions =
    query && allProducts.length > 0
      ? allProducts
          .filter(
            (p) =>
              p.name?.toLowerCase().includes(query.toLowerCase()) ||
              String(p.price).includes(query),
          )
          .slice(0, 5)
      : [];

  const applySearch = (value) => {
    setSearch(value);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const displayProducts = search
    ? allProducts.filter(
        (p) =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          String(p.price).includes(search),
      )
    : products;

  return (
    <div className="bg-black min-h-screen p-6">
      <h1 className="font-[cursive] text-center text-yellow-500 text-[40px] mb-10">
        DIFFERENT PRODUCTS
      </h1>

      <div className="flex justify-center pb-5">
        <div className="relative w-[450px]">
          <input
            type="text"
            placeholder="SEARCH FOR PRODUCTS"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (!showSuggestions || suggestions.length === 0) return;

              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev < suggestions.length - 1 ? prev + 1 : 0,
                );
              }

              else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : suggestions.length - 1,
                );
              }

              else if (e.key === "Enter") {
                e.preventDefault();

                if (activeIndex >= 0) {
                  const selected = suggestions[activeIndex];
                  setQuery(selected.name);
                  applySearch(selected.name);
                } else {
                  applySearch(query);
                }
              }
            }}
            className="p-3 bg-white rounded-2xl w-full text-black"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full bg-white mt-2 rounded-xl shadow-lg z-50">
              {suggestions.map((item, index) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setQuery(item.name);
                    applySearch(item.name);
                  }}
                  className={`p-2 cursor-pointer ${
                    index === activeIndex ? "bg-gray-300" : "hover:bg-gray-200"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => applySearch(query)}
          className="ml-3 bg-yellow-500 px-5 py-3 rounded-xl"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
        {displayProducts.map((product) => (
          <Cart
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            inStock={product.inStock}
          />
        ))}
      </div>

      {!search && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-yellow-500 px-6 py-2 rounded-xl"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
