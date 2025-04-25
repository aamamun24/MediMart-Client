"use client";

import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetMedicineQuery } from "@/redux/features/medicine/featureMedicineApi";
import { useAppDispatch } from "@/redux/hooks";
import { IMedicine } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


export default function FeaturedProducts() {
  const {
    data: medicineData,
    isLoading,
    error,
  } = useGetMedicineQuery(undefined);
  const [quantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = (medicine: IMedicine) => {
    if (!medicine) {
      toast.error("Failed to add to cart: Medicine data is missing");
      return;
    }

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
    toast.success(`${medicine.name || "Medicine"} added to cart!`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading medicines</div>;

  return (
    <div className="bg-white container mx-auto mb-20">
      <h3 className="text-gray-800 text-3xl font-bold px-4 border-l-4 border-teal-600 mb-6">
        <span className="text-teal-600">Featured</span> Medicine
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicineData?.data?.slice(0, 6).map((medicine: IMedicine) => (
          <div
            className="bg-white rounded-lg shadow-2xl p-4"
            key={medicine?._id}
          >
            <div className="flex justify-center">
              <Image
                src={medicine?.image || "/default-medicine.jpg"}
                alt={medicine.name || "Medicine"}
                width={200}
                height={200}
              />
            </div>
            <div className="mt-4 leading-6">
              <h4 className="text-xl">Name: {medicine?.name || "Unknown"}</h4>
              <p>Brand: {medicine?.brand || "Unknown"}</p>
              <p>Price: ${(medicine?.price || 0).toFixed(2)}</p>
              <p>Category: {medicine?.category || "Unknown"}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link
                className="text-teal-600 font-bold"
                href={`/medicine/${medicine._id}`}
              >
                See More Details...
              </Link>
              <button
                onClick={() => handleAddToCart(medicine)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#68d391] to-[#4fd1c5] hover:from-[#48bb78] hover:to-[#38b2ac] transition-all text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md"
              >
                <ShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button>
          <Link
            className="flex items-center gap-2 bg-gradient-to-r from-[#68d391] to-[#4fd1c5] hover:from-[#48bb78] hover:to-[#38b2ac] transition-all text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md"
            href="/shop"
          >
            View More Medicine...
          </Link>
        </button>
      </div>
    </div>
  );
}
