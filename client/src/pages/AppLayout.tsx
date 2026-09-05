import { Outlet } from "react-router-dom";
import Banners from "../components/Banners";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <>
      <Banners />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <p>cartSideBar</p>
    </>
  );
};

export default AppLayout;
