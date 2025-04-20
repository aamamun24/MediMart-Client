import Review from "@/components/review/Review";
import AboutUs from "./about/page";
import Banner from "./banner/page";

const HomePage = () => {
  return (
    <div className="px-4 py-8">
      <Banner></Banner>
      <AboutUs></AboutUs>
      <Review />
    </div>
  );
};

export default HomePage;
