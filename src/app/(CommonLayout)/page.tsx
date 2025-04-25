import Review from "@/components/review/Review";
import AboutUs from "./about/page";
import Banner from "@/components/banner/page";
import Branding from "@/components/branding/page";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";

const HomePage = () => {
  return (
    <div className=" py-8">
      <Banner />
      <Branding />
      <FeaturedProducts />
      <AboutUs />
      <Review />
    </div>
  );
};

export default HomePage;
