import BrowseCategories from "../components/Home/BrowseCategories";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import NewsLetter from "../components/Home/NewsLetter";
import PopProducts from "../components/Home/PopProducts";
import PromoBanner from "../components/Home/PromoBanner";

const Home = () => {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <Features />
        <BrowseCategories />
        <PopProducts />
        <PromoBanner />
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
