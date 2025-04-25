"use client";

import Loader from "@/components/shared/Loader";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleMedicineQuery } from "@/redux/features/medicine/medicineApi";
import { useAppDispatch } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const MedicineDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetSingleMedicineQuery(id);
  const medicine = data?.data;

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (medicine) {
      dispatch(
        addToCart({
          _id: medicine._id!,
          name: medicine.name,
          price: medicine.price,
          quantity,
          stockQuantity: medicine.quantity,
          image: medicine.image,
          prescriptionRequired: medicine.prescriptionRequired,
          generic: medicine.generic,
          brand: medicine.brand,
          form: medicine.form,
          category: medicine.category,
          description:medicine.description,
          simptoms: medicine.simptoms,
          manufacturer:medicine.manufacturer,
          expiryDate: medicine.expiryDate
        })
      );
      toast.success(`${medicine.name} added to cart!`);
    }
  };

  const handleIncrease = () => {
    if (quantity < (medicine?.quantity || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!medicine) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            Medicine Not Found
          </h2>
          <p className="text-gray-500 mt-2">
            Sorry, the medicine you are looking for is unavailable.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Something went wrong!
          </h2>
          <p className="text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#f7fafc]">
      <div className="container mx-auto px-6 py-12 min-h-[70vh] flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side: Image */}
          <div className="bg-[#e6f4f1] flex items-center justify-center p-8">
            <div className="relative w-full h-96">
              <Image
                src={medicine.image}
                alt={medicine.name}
                layout="fill"
                objectFit="contain"
                className="rounded-2xl"
              />
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="flex flex-col justify-between p-8">
            <div>
              <h1 className="text-4xl font-extrabold text-[#1a365d] mb-2">
                {medicine.name}
              </h1>
              <p className="text-lg text-[#319795] mb-4">
                {medicine.brand} • {medicine.form}
              </p>

              <p className="text-4xl font-bold text-[#38a169] mb-6">
                ${medicine.price.toFixed(2)}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {medicine.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-1">Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {medicine.simptoms?.map((symptom: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#bee3f8] text-[#2c5282] px-3 py-1 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm mb-6">
                <p>
                  <strong className="text-gray-800">Manufacturer:</strong>{" "}
                  {medicine.manufacturer}
                </p>
                <p>
                  <strong className="text-gray-800">Expiry:</strong>{" "}
                  {medicine.expiryDate}
                </p>
                <p>
                  <strong className="text-gray-800">Category:</strong>{" "}
                  {medicine.category}
                </p>
                <p>
                  <strong className="text-gray-800">Stock:</strong>{" "}
                  {medicine.quantity}
                </p>
                <p>
                  <strong className="text-gray-800">Prescription:</strong>{" "}
                  {medicine.prescriptionRequired ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Quantity Selector and Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden bg-[#edf2f7]">
                <button
                  onClick={handleDecrease}
                  className="px-2 py-2 text-lg font-bold text-[#3182ce] hover:bg-[#ebf8ff]"
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-8 text-center bg-transparent outline-none border-none text-lg font-medium"
                />
                <button
                  onClick={handleIncrease}
                  className="px-2 py-2 text-lg font-bold text-[#3182ce] hover:bg-[#ebf8ff]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-gradient-to-r from-[#68d391] to-[#4fd1c5] hover:from-[#48bb78] hover:to-[#38b2ac] transition-all text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md"
              >
                <ShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
