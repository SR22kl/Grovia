import BrowseCategories from "../components/Home/BrowseCategories";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import PopProducts from "../components/Home/PopProducts";

const Home = () => {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <Features />
        <BrowseCategories />
        <PopProducts />
      </div>
    </>
  );
};

export default Home;
