import { useMemo } from "react";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

import { useProductsQuery } from "../../Hooks/Query/Product/useProductQuery";
import { useUsersQuery } from "../../Hooks/Query/User/UserQuery";

const DashboardStats = () => {
  const { data: productData } = useProductsQuery();
  const { data: users = [] } = useUsersQuery();

  const products = useMemo(() => {
    if (!productData) return [];
    return productData.pages.flatMap((page) => page.data);
  }, [productData]);

  // Total Stock
  const totalStock = products.reduce(
    (sum, product) => sum + product.inStock,
    0,
  );

  // Inventory Value
  const totalRevenue = products.reduce(
    (sum, product) => sum + product.price * product.inStock,
    0,
  );

  const stats = [
    {
      title: "Products",
      value: products.length,
      icon: Package,
      color: "text-yellow-400",
    },
    {
      title: "Users",
      value: users.length,
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: ShoppingCart,
      color: "text-green-400",
    },
    {
      title: "Inventory Value",
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-yellow-400 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>

              <div className={`p-4 rounded-xl bg-[#1d1d1d] ${item.color}`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
