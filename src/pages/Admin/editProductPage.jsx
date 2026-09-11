import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../Hooks/Query/Product/singleProductQuerry";
import { useUpdateProductMutation } from "../../Hooks/Mutations/Product/updateProductMutation";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useSingleProductQuery(id);
  const updateMutation = useUpdateProductMutation();

  // ✅ form state (safe defaults)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ fill existing product data
  useEffect(() => {
    if (!product) return;

    setName(product.name || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
    setInStock(product.inStock || "");
    setPreview(product.image || null);
  }, [product]);

  // image change
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("inStock", inStock);

    if (image) {
      formData.append("image", image);
    }

    updateMutation.mutate(
      { id, formData },
      {
        onSuccess: () => {
          navigate("/admin");
        },
      },
    );
  };

  // loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  // product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-[#111] p-8 rounded-2xl border border-zinc-800"
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Edit Product
        </h1>

        {/* IMAGE */}
        <div className="mb-6">
          {preview && (
            <img
              src={preview}
              alt="product"
              className="w-full h-[300px] object-cover rounded-xl"
            />
          )}

          <input
            type="file"
            onChange={handleImage}
            className="mt-4"
            accept="image/*"
          />
        </div>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* PRICE */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* STOCK */}
        <input
          type="number"
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          placeholder="Stock"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700"
        />

        {/* CATEGORY (READ ONLY) */}
        <input
          disabled
          value={product.Categories}
          className="w-full p-3 mb-6 rounded bg-zinc-900 border border-gray-700 text-gray-400"
        />

        {/* SAVE */}
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:scale-[1.02] transition"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
