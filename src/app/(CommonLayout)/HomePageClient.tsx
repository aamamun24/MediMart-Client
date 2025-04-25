"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "@/components/banner/page";
import Branding from "@/components/branding/page";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import AboutUs from "./about/page";
import Review from "@/components/review/Review";

const HomePageClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="py-8">
      <div className="lg:!w-[70vw] w-[90vw] mx-auto flex justify-center items-center gap-2 p-2 bg-white rounded-md">
        <form onSubmit={handleSearch} className="flex w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines according to name, simptoms, category etc.."
            className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700"
          >
            Search
          </button>
        </form>
      </div>
      <Banner />
      <Branding />
      <FeaturedProducts />
      <AboutUs />
      <Review />
    </div>
  );
};

export default HomePageClient;