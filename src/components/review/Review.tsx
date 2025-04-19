"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

import { clientReview } from "./Review.json";
import { MessageSquareQuote } from "lucide-react";

const Review = () => {
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
        {/* client riview card */}
        {clientReview.map((review) => (
          <SwiperSlide
            className="p-4 rounded-lg shadow-md bg-white mb-12 h-20"
            key={review?.id}
          >
            {/* client review */}
            <p className="mb-4 text-sm">
              <MessageSquareQuote className="text-[#16a085] mb-4" />
              Review:{review?.review}
            </p>
            <h4 className="text-xl mb-2">Name:{review?.name}</h4>
            {/* client rating */}
            <p className="mb-2">
              <span className="text-yellow-500 ml-2 flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>{index < review.rating ? "★" : "☆"}</span>
                ))}
              </span>
            </p>
            {/* rating date */}
            <p className="mb-2">Date:{review?.date}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
