import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-red-500 text-2xl">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-2xl overflow-hidden shadow-xl border border-zinc-800">
        {/* IMAGE TOP */}
        <div className="w-full bg-black flex justify-center p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-xl"
          />
        </div>

        {/* DETAILS BELOW */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-yellow-500">{product.name}</h1>

          <p className="text-gray-400 mt-5 leading-7">{product.description}</p>

          <div className="mt-6">
            <span className="text-3xl font-bold">Rs. {product.price}</span>
          </div>

          <div className="mt-3">
            {product.inStock > 0 ? (
              <span className="text-green-500">
                In Stock ({product.inStock})
              </span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Add to Cart
            </button>

            <button className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
