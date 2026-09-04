import { Outlet } from "react-router-dom";
import Banners from "../components/Banners";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <>
      <Banners />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <p>Footer</p>
      <p>cartSideBar</p>
    </>
  );
};

export default AppLayout;
