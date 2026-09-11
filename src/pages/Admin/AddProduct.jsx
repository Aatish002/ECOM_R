import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../Hooks/Mutations/Product/addProductMutation";

const AddProduct = () => {
  const navigate = useNavigate();
  const addMutation = useAddProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    Categories: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("inStock", form.inStock);
    formData.append("Categories", form.Categories);

    if (image) {
      formData.append("image", image);
    }

    addMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/admin");
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-[#111] p-8 rounded-2xl border border-zinc-800"
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Add Product</h1>

        {/* IMAGE */}
        <div className="mb-6">
          {preview && (
            <img
              src={preview}
              alt="preview"
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
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* STOCK */}
        <input
          name="inStock"
          type="number"
          value={form.inStock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-3 mb-4 rounded bg-black border border-gray-700"
        />

        {/* CATEGORY */}
        <input
          name="Categories"
          value={form.Categories}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 mb-6 rounded bg-black border border-gray-700"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={addMutation.isPending}
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >
          {addMutation.isPending ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
