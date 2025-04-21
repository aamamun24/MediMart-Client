"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { MessageSquareQuote } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  id: string;
  reviewText: string;
  userName: string;
  userEmail: number;
}

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        console.log("Fetched reviews:", response.data.data);
        setReviews(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 mb-20 text-center">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 mb-20 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mb-20">
      {/* testimonial title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-[#16a085] px-4">
        <span className="text-[#16a085]">What say</span> our client?
      </h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* client review card */}
        {reviews.map((review) => (
          <SwiperSlide
            className="p-4 rounded-lg shadow-md bg-white mb-12 h-20"
            key={review?.id}
          >
            {/* client review */}
            <p className="mb-4  text-2xl">
              <MessageSquareQuote className="text-[#16a085] mb-4 " />
              Review: {review?.reviewText}
            </p>
            <h4 className="text-xl mb-2">
              by <b>{review?.userName as string}</b>
            </h4>
            {/* client rating */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
