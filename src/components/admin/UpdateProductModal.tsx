import React, { useEffect, useState } from "react";
import { IMedicine } from "@/types";
import {
  useDeleteMedicineMutation,
  useUpdateMedicineMutation,
  useGetAllMedicinesQuery,
} from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAppDispatch } from "@/redux/hooks";
import { setMedicines } from "@/redux/features/medicine/medicineSlice";

interface UpdateMedicineModalProps {
  medicine: IMedicine;
  onClose: () => void;
}

const UpdateMedicineModal: React.FC<UpdateMedicineModalProps> = ({ medicine, onClose }) => {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  // State to hold the form data
  const [formData, setFormData] = useState({
    name: medicine.name,
    manufacturer: medicine.manufacturer,
    price: medicine.price,
    image: medicine.image,
    category: medicine.category,
    description: medicine.description,
    quantity: medicine.quantity,
  });

  const [search] = useState<string>("");
  const { refetch } = useGetAllMedicinesQuery({ search: search || undefined });
  const [updateMedicine, { isLoading: isUpdating, error: updateError }] = useUpdateMedicineMutation();
  const [deleteMedicine, { isLoading: isDeleting, error: deleteError }] = useDeleteMedicineMutation();
  const { refetch: refetchMedicines } = useGetAllMedicinesQuery({});
  const dispatch = useAppDispatch();

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission for updating the medicine
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateMedicine({
        medicineId: medicine._id!,
        data: formData,
      }).unwrap();
      console.log("Medicine updated successfully:", response.data);


      const refetchedMedicinesDataResponse = await refetchMedicines()

      console.log("refetchedMedicinesDataResponse", refetchedMedicinesDataResponse)
      if(refetchedMedicinesDataResponse?.data?.data){
        dispatch(setMedicines(refetchedMedicinesDataResponse?.data?.data))
      }
      toast("✅ Medicine updated successfully.");
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to update medicine:", err);
      toast("❌ Failed to update medicine (See console)");
    }
  };

  // Handle deletion of the medicine
  const handleDelete = async () => {
    try {
      await deleteMedicine(medicine._id!).unwrap();
      console.log("Medicine deleted successfully");
      toast("🗑️ Medicine deleted successfully.");
      await refetch(); // Refetch the updated list after deletion
      onClose(); // Close the modal
    } catch (err) {
      console.error("Failed to delete medicine:", err);
      toast("❌ Failed to delete medicine (See console)");
    }
  };

  return (
    <div data-aos="zoom-in" className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Medicine</h2>
        <form onSubmit={handleSubmit}>
          {/* Medicine Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Manufacturer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Ointment">Ointment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows={3}
              required
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              min="0"
              required
            />
          </div>

          {/* Error Messages */}
          {updateError && <p className="text-red-500 mb-4">Update Error: {JSON.stringify(updateError)}</p>}
          {deleteError && <p className="text-red-500 mb-4">Delete Error: {JSON.stringify(deleteError)}</p>}

          {/* Buttons */}
          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
              className={`py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                isDeleting || isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating || isDeleting}
                className={`py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  isUpdating || isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicineModal;
