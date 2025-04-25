"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { setAllUsers, selectAllUsers } from "@/redux/features/allUsers/allUserSlice";
import { selectOrders } from "@/redux/features/order/orderSlice";
import { useGetAllReviewsQuery, useDeleteReviewByIdMutation } from "@/redux/features/review/reviewApi";
import { toast } from "sonner";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const orders = useSelector(selectOrders);
  const { data: allUsersRes } = useGetAllUserQuery();
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetAllReviewsQuery();
  const [deleteReviewById, { isLoading: deleteLoading }] = useDeleteReviewByIdMutation();

  // Set users in store
  useEffect(() => {
    if (allUsersRes?.data) {
      const users = Array.isArray(allUsersRes.data)
        ? allUsersRes.data
        : [allUsersRes.data];
      dispatch(setAllUsers(users));
    }
  }, [allUsersRes, dispatch]);

  // Compute order counts for all users
  const orderCounts = allUsers.reduce((acc, user) => {
    const userOrders = orders.filter((order) => order.userEmail === user.email);
    acc[user._id!] = userOrders.length;
    return acc;
  }, {} as Record<string, number>);

  // Handle review deletion
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReviewById(reviewId).unwrap();
      toast.success("Review deleted successfully");
      await refetchReviews();
    } catch (error) {
      toast.error("Failed to delete review");
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="min-h-[70vh] p-6 space-y-12 mb-10">
      {/* Users Table */}
      <div>
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">All Users</h2>
        {allUsers && allUsers.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Address
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Total Orders
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.phone}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.address}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{orderCounts[user._id!]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>

      {/* Reviews Table */}
      <div>
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">All Reviews</h2>
        {reviewsLoading ? (
          <p className="text-center text-gray-500 mt-4">Loading reviews...</p>
        ) : reviewsData?.data && reviewsData.data.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    User Email
                  </th>
                  <th className="w-2/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Review
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Star Count
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Order Count
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewsData.data.map((review) => (
                  <tr key={review._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{review.userEmail}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{review.reviewText}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{review.starCount}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{review.orderCount}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        disabled={deleteLoading}
                        className={`bg-red-700 text-white px-4 py-1 rounded hover:bg-red-600 transition ${
                          deleteLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;