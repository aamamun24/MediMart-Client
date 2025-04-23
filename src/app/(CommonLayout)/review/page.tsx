
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderApi";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const ReviewPage = () => {
  const router = useRouter();
  const thankYouRef = useRef<HTMLDivElement>(null);

  // Get current user from Redux
  const user = useAppSelector((state) => state.auth.user); // Adjust based on your auth slice
  const userEmail = user?.userEmail || "";

  // Fetch user's orders
  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useGetMyOrdersQuery();
  const orderCount = ordersData?.data?.length || 0;

  // Review form state
  const [userName, setUserName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [starCount, setStarCount] = useState<number>(1); // Default to 1 star
  const [showThankYou, setShowThankYou] = useState(false);
  const [createReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userEmail) {
      router.push("/login");
    }
  }, [userEmail, router]);

  // Scroll to thank-you message after successful submission
  useEffect(() => {
    if (showThankYou && thankYouRef.current) {
      thankYouRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showThankYou]);

  // Handle star click
  const handleStarClick = (rating: number) => {
    setStarCount(rating);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (orderCount < 1) {
      toast.error("You cannot submit a review if you have never ordered.");
      return;
    }
    try {
      const reviewData = { userEmail, userName, reviewText, orderCount, starCount };
      const result = await createReview(reviewData).unwrap();
      if (result.success) {
        toast.success("Review submitted successfully!");
        setUserName("");
        setReviewText("");
        setStarCount(1); // Reset to default
        setShowThankYou(true); // Show thank-you message
      }
    } catch (error: any) {
      console.error("Review submission failed:", error);
      const errorMessage = error?.data?.message || "Failed to submit review";
      toast.error(errorMessage);
    }
  };

  // Reset thank-you message when form is reused
  const handleFormInteraction = () => {
    if (showThankYou) {
      setShowThankYou(false);
    }
  };

  // Handle loading and error states
  if (ordersLoading) {
    return <div className="text-center py-12 min-h-[80vh]">Checking your order history...</div>;
  }

  if (ordersError) {
    return <div className="text-center py-12 text-red-600">Error loading orders. Please try again.</div>;
  }

  // If user is not authenticated, render nothing (redirect handled by useEffect)
  if (!userEmail) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-8">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">Submit Your Review</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          onChange={handleFormInteraction}
        >
          <div>
            <label className="block text-sm font-medium text-teal-700">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Email</label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full px-4 py-2 border border-teal-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Order Count</label>
            <input
              type="number"
              value={orderCount}
              disabled
              className="w-full px-4 py-2 border border-teal-300 rounded-md bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Star Rating</label>
            <div className="flex space-x-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className="cursor-pointer"
                  color={star <= starCount ? "#FFD700" : "#D1D5DB"}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            <input
              type="hidden"
              value={starCount}
              required
              name="starCount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700">Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-teal-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Write your review here..."
            />
          </div>
          <button
            type="submit"
            disabled={reviewLoading}
            className={`w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition ${
              reviewLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
        
      </div>


      {showThankYou && (
          <div  ref={thankYouRef} className="flex flex-col items-center justify-center mt-20">
            <Image  className="" src="https://i.postimg.cc/zf19tsCF/thank.gif" width={200} height={300} alt=""></Image>
            <div
           
            className="mt-6 p-4  text-green-700 text-4xl rounded-md text-center"
          >
            
            Thank you for your review!
          </div>
          </div>
        )}
        <p className=" text-center text-gray-600  mt-4 mb-32">
          Want to view your orders?{" "}
          <Link href="/profile" className="text-teal-600  hover:underline">
            Go to Orders
          </Link>
        </p>

    </div>
  );
};

export default ReviewPage;
