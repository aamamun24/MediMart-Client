"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { postImage } from "@/utils/postImage";
import { useCreateMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectMedicines, setMedicines } from "@/redux/features/medicine/medicineSlice";

interface AddMedicineModalProps {
  onClose: () => void;
}

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const medicineState = useAppSelector(selectMedicines);
  const medicines = medicineState.medicines; // Access medicines array

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    generic: "",
    brand: "",
    price: 0,
    image: "",
    form: "Tablet" as "Tablet" | "Syrup" | "Capsule" | "Injection" | "Ointment",
    category: "Antibiotic" as "Antibiotic" | "Painkiller" | "Antacid" | "Antiseptic" | "Antiviral",
    description: "",
    simptoms: "",
    quantity: 0,
    prescriptionRequired: false,
    manufacturer: "",
    expiryDate: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createMedicine, {error }] = useCreateMedicineMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!imageFile) {
        throw new Error("Image is required");
      }

      // Upload image and get URL
      console.log("Uploading image...");
      const imageUrl = await postImage(imageFile);
      console.log("Image uploaded:", imageUrl);

      // Prepare medicine data
      const medicineData = {
        ...formData,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        price: parseFloat(formData.price as any) || 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        quantity: parseInt(formData.quantity as any, 10) || 0,
        image: imageUrl,
        simptoms: formData.simptoms
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      };

      // Create medicine via API
      console.log("Creating medicine with data:", medicineData);
      const response = await createMedicine(medicineData).unwrap();
      console.log("Medicine created:", response.data);
      toast("✅ Medicine created successfully");

      // Update Redux store optimistically
      if (Array.isArray(medicines)) {
        dispatch(setMedicines([...medicines, response.data]));
      } else {
        console.warn("Medicines is not an array:", medicines);
        dispatch(setMedicines([response.data])); // Fallback to initialize array
      }

      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Submission error:", err);
      toast(`❌ Failed to create medicine: ${err.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display API errors
  useEffect(() => {
    if (error) {
      toast(`❌ API error: ${JSON.stringify(error)}`);
    }
  }, [error]);

  return (
    <div data-aos="zoom-in" className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Medicine</h2>
        <form onSubmit={handleSubmit} className="flex-1">
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Generic Name</label>
            <input
              type="text"
              name="generic"
              value={formData.generic}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            {imageFile && (
              <p className="text-sm text-gray-500 mt-1">Selected: {imageFile.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Form</label>
            <select
              name="form"
              value={formData.form}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Capsule">Capsule</option>
              <option value="Injection">Injection</option>
              <option value="Ointment">Ointment</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="Antibiotic">Antibiotic</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Antacid">Antacid</option>
              <option value="Antiseptic">Antiseptic</option>
              <option value="Antiviral">Antiviral</option>
            </select>
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Symptoms (comma-separated)</label>
            <input
              type="text"
              name="simptoms"
              value={formData.simptoms}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="e.g., Fever,Cough,Pain"
            />
          </div>
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
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Prescription Required</span>
            </label>
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 sticky bottom-0 bg-white pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;