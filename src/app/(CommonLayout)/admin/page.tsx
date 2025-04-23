
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMedicines, setMedicines } from "@/redux/features/medicine/medicineSlice";
import { IMedicine } from "@/types";
import UpdateMedicineModal from "@/components/admin/UpdateProductModal";
import AddMedicineModal from "@/components/admin/AddMedicineModal";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { setAllUsers, selectAllUsers } from "@/redux/features/allUsers/allUserSlice";
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { setOrders, selectOrders } from "@/redux/features/order/orderSlice";
import Image from "next/image";
import Link from "next/link";
import { useGetAllMedicinesQuery } from "@/redux/features/medicine/medicineApi";
import { useGetAllReviewsQuery, useDeleteReviewByIdMutation } from "@/redux/features/review/reviewApi";
import { toast, Toaster } from "sonner";

const MedicineAdminDashboard = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(selectMedicines);
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: medicinesData, refetch } = useGetAllMedicinesQuery({});

  // Users
  const { data: allUsersRes } = useGetAllUserQuery();
  const allUsers = useSelector(selectAllUsers);

  // Orders API
  const { data: ordersData, refetch: refetchOrders } = useGetAllOrdersQuery();
  const [updateOrder, { isLoading: updateLoading, error: updateError }] = useUpdateOrderMutation();

  // Reviews API
  const { data: reviewsData, isLoading: reviewsLoading, refetch: refetchReviews } = useGetAllReviewsQuery();
  const [deleteReviewById, { isLoading: deleteLoading }] = useDeleteReviewByIdMutation();

  // Compute order counts for all users
  const orders = useSelector(selectOrders);
  const orderCounts = allUsers.reduce((acc, user) => {
    const userOrders = orders.filter((order) => order.userEmail === user.email);
    acc[user._id] = userOrders.length;
    return acc;
  }, {} as Record<string, number>);

  // Set medicines, users, and orders in store
  useEffect(() => {
    if (allUsersRes?.data) {
      dispatch(setAllUsers(allUsersRes.data as TUser[]));
    }
  }, [allUsersRes, dispatch]);

  useEffect(() => {
    if (medicinesData?.data?.medicines) {
      dispatch(setMedicines(medicinesData.data.medicines));
    }
  }, [medicinesData, dispatch]);

  useEffect(() => {
    if (medicines.length === 0 && !medicinesData) {
      dispatch(setMedicines([]));
    }
  }, [dispatch, medicines.length, medicinesData]);

  useEffect(() => {
    if (ordersData?.data) {
      dispatch(setOrders(ordersData.data));
    }
  }, [ordersData, dispatch]);

  // Refetch medicines when Redux medicines change
  useEffect(() => {
    refetch();
  }, [medicines, refetch]);

  const handleUpdateMedicine = (medicine: IMedicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeUpdateMedicineModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const closeAddMedicineModal = () => {
    setIsAddModalOpen(false);
  };

  // Function to handle status change and update the order
  const handleStatusChange = async (
    orderId: string,
    newStatus: "pending" | "processing" | "shipped" | "delivered"
  ) => {
    try {
      await updateOrder({ orderId, data: { status: newStatus } }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      console.log(`Order ${orderId} status updated to ${newStatus}`);
      await refetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating status:", error);
    }
  };

  // Function to handle review deletion
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

  const statusOptions = ["pending", "processing", "shipped", "delivered"] as const;

  return (
    <div className="min-h-screen p-6 mt-24 space-y-12 mb-10">
      <Toaster richColors position="top-center" />
      {/* 🟦 Medicines Table */}
      <div>
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">All Medicines</h1>
        <div className="flex my-2 justify-center">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-amber-200 p-2 rounded-md"
          >
            Add Medicine
          </button>
        </div>
        {medicines && medicines.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Brand
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{med.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{med.brand}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{med.quantity}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">${med.price}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleUpdateMedicine(med)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No medicines found.</p>
        )}
      </div>

      {/* 🟩 Users Table */}
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
                    <td className="py-3 px-4 text-sm text-gray-600">{orderCounts[user._id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>

      {/* 🟧 Orders Table */}
      <div>
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">All Orders</h2>
        <h3 className="text-center text-red-900">Automatically updates from <b className="text-red-700">Pending</b> to <b className="text-red-700">Processing</b> if payment is complete</h3>
        <h3 className="text-center text-red-900">Only proceed further to update orders if <b className="text-red-700">prescription</b> checked and verified</h3>
        {ordersData?.data && ordersData?.data.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full bg-white table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    User Email
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    User Phone
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Products
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Prescription (Click to open)
                  </th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordersData.data.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">{order.userEmail}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{order.contactNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {order?.products?.map((product, index) => {
                        const productName =
                          medicines.find((m) => m._id === product.productId)?.name || "Unknown";
                        return (
                          <div key={`${order._id}-${index}`}>
                            <p>
                              {productName} <b>X{product.quantity}</b>
                            </p>
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {order.prescriptionImageLink ? (
                        <Link href={order.prescriptionImageLink}>
                          <Image
                            src={order.prescriptionImageLink}
                            alt="Prescription"
                            style={{ objectFit: "cover" }}
                            height={30}
                            width={40}
                            className="border-2 border-black h-10 w-10 rounded-sm"
                          />
                        </Link>
                      ) : (
                        "No Prescription"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value as "pending" | "processing" | "shipped" | "delivered"
                          )
                        }
                        disabled={updateLoading}
                        className={`px-2 py-1 rounded text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                      {updateError && (
                        <p className="text-red-500 text-xs mt-1">Failed to update status</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No orders found.</p>
        )}
      </div>

      {/* 🟪 Reviews Table */}
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
                        className={`bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition ${
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

      {isModalOpen && selectedMedicine && (
        <UpdateMedicineModal onClose={closeUpdateMedicineModal} medicine={selectedMedicine} />
      )}
      {isAddModalOpen && <AddMedicineModal onClose={closeAddMedicineModal} />}
    </div>
  );
};

export default MedicineAdminDashboard;
