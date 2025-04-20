import Review from "@/components/review/Review";
import AboutUs from "./about/page";

const HomePage = () => {
  return (
    <div className="px-4 py-8">
      <h1>Welcome to MediMart</h1>
      <AboutUs></AboutUs>
      <Review />
    </div>
  );
};

export default HomePage;
