import { useState } from "react";

import Header from "../../components/Admin/Header";
import DashboardStats from "../../components/Admin/DashboardStats";
import ProductTable from "../../components/Admin/ProductTable";
import OrdersPanel from "../../components/Admin/OrderPannel";
import UsersPanel from "../../components/Admin/UserPannel";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("products");

  return (
    <>
      <Header />

      <DashboardStats />

      <div className="px-8 pb-8">
        {activePage === "products" && <ProductTable />}

        {activePage === "users" && <UsersPanel />}

        {activePage === "orders" && <OrdersPanel />}
      </div>
    </>
  );
};

export default Dashboard;
