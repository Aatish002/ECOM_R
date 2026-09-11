import { useMemo, useState } from "react";
import Cart from "./Cart";
import { useSearchProductsQuery } from "../../Hooks/Query/Product/useSearchProductQuery";
import { useProductsQuery } from "../../Hooks/Query/Product/useProductQuery";

const Body = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");

  // Infinite products
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useProductsQuery();

  // Search products
  const { data: searchedProducts = [] } = useSearchProductsQuery(searchText);

  // Suggestions while typing
  const { data: suggestions = [] } = useSearchProductsQuery(query);

  // Flatten pages into a single array
  const products = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  // Show searched products or normal products
  const displayProducts = searchText.trim() ? searchedProducts : products;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white px-6 py-10">
      {/* Title */}
      <h1 className="text-center text-4xl md:text-5xl font-[cursive] tracking-widest text-yellow-400 mb-12">
        OUR PRODUCTS
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <div className="relative w-[500px]">
          <input
            type="text"
            placeholder="Search streetwear, sneakers, drops..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (!suggestions.length) return;

              if (e.key === "ArrowDown") {
                setActiveIndex((prev) => (prev + 1) % suggestions.length);
              }

              if (e.key === "ArrowUp") {
                setActiveIndex((prev) =>
                  prev <= 0 ? suggestions.length - 1 : prev - 1,
                );
              }

              if (e.key === "Enter") {
                e.preventDefault();

                const selected =
                  activeIndex >= 0 ? suggestions[activeIndex].name : query;

                setQuery(selected);
                setSearchText(selected);
                setShowSuggestions(false);
                setActiveIndex(-1);
              }
            }}
            className="
              w-full p-4 rounded-2xl
              bg-[#111] border border-gray-700
              text-white outline-none
              focus:border-yellow-400
              focus:shadow-[0_0_15px_rgba(250,204,21,0.2)]
            "
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-2 bg-[#111] border border-gray-800 rounded-xl overflow-hidden z-50">
              {suggestions.map((item, i) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setQuery(item.name);
                    setSearchText(item.name);
                    setShowSuggestions(false);
                  }}
                  className={`p-3 cursor-pointer text-sm ${
                    i === activeIndex
                      ? "bg-yellow-500 text-black"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setSearchText(query);
            setShowSuggestions(false);
          }}
          className="
            ml-3 px-6 py-3 rounded-2xl font-bold
            bg-yellow-400 text-black
            hover:scale-105 transition
            shadow-lg
          "
        >
          Search
        </button>

        {searchText && (
          <button
            onClick={() => {
              setQuery("");
              setSearchText("");
              setShowSuggestions(false);
            }}
            className="ml-3 px-6 py-3 rounded-2xl font-bold bg-gray-700 hover:bg-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
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

      {/* Load More */}
      {!searchText && hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="
              px-8 py-3 rounded-2xl font-bold
              bg-yellow-400 text-black
              hover:scale-105 transition
              shadow-lg
              disabled:opacity-50
            "
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
