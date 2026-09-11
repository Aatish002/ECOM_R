import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useProductsQuery } from "../../Hooks/Query/Product/useProductQuery";
import { useDeleteProductMutation } from "../../Hooks/Mutations/Product/useDeleteProductMutation";

const ProductTable = () => {
  const navigate = useNavigate();

  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsQuery();

  const { mutate: deleteProduct } = useDeleteProductMutation();

  const products = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  const handleDelete = (product) => {
    const confirmDelete = window.confirm(`Delete "${product.name}" ?`);

    if (!confirmDelete) return;

    setDeletingId(product._id);

    deleteProduct(product._id, {
      onSuccess: () => alert("Deleted Successfully"),
      onSettled: () => setDeletingId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#111] rounded-2xl p-10 text-center text-gray-400">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>

          <p className="text-gray-400 text-sm">
            Total Products : {products.length}
          </p>
        </div>
      </div>

      {/* Table */}

      <table className="w-full">
        <thead className="bg-[#181818]">
          <tr className="text-left">
            <th className="p-5">Image</th>

            <th>Name</th>

            <th>Product</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Category</th>

            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-gray-800 hover:bg-[#181818]"
            >
              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </td>

              <td>{product.name}</td>

              <td>{product.description?.slice(0, 40)}...</td>

              <td className="text-yellow-400">Rs. {product.price}</td>

              <td>{product.inStock}</td>

              <td>{product.Categories}</td>

              <td>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/edit/${product._id}`)}
                    className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product._id}
                    className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
                  >
                    {deletingId === product._id ? "..." : <Trash2 size={18} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="flex justify-center p-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
