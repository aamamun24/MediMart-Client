"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllMedicinesQuery,
} from "@/redux/features/medicine/medicineApi";
import {
  selectMedicines,
  setMedicines,
} from "@/redux/features/medicine/medicineSlice";
import {
  addToCart,
  selectCart,
} from "@/redux/features/cart/cartSlice";

const AllMedicinesPage = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(selectMedicines);
  const cartItems = useSelector(selectCart);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterForm, setFilterForm] = useState("");
  const [filterPrescription, setFilterPrescription] = useState(""); // Prescription filter
  const [sortPrice, setSortPrice] = useState(""); // Sorting by price

  const { data, isLoading, error } = useGetAllMedicinesQuery({
    search: search || undefined,
  });

  useEffect(() => {
    if (data?.data) {
      console.log(data)
      const medicinesArray = Array.isArray(data.data)
        ? data.data
        : data.data.medicines;
      dispatch(setMedicines(medicinesArray));
      console.log(data);
    }
  }, [data, dispatch]);



  const filteredMedicines = useMemo(() => {
    return medicines?.data?.filter((medicine) => {
      const matchesCategory = filterCategory
        ? medicine.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;

      const matchesForm = filterForm
        ? medicine.form?.toLowerCase() === filterForm.toLowerCase()
        : true;

      const matchesPrescription = filterPrescription
        ? medicine.prescriptionRequired === (filterPrescription === "Yes")
        : true;

      return matchesCategory && matchesForm && matchesPrescription;
    });
  }, [medicines, filterCategory, filterForm, filterPrescription]);

  // Sorting logic
  const sortedMedicines = useMemo(() => {
    if (sortPrice === "asc") {
      return [...filteredMedicines].sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      return [...filteredMedicines].sort((a, b) => b.price - a.price);
    }
    return filteredMedicines;
  }, [filteredMedicines, sortPrice]);

  if (isLoading)
    return (
      <div className="text-center py-8 text-gray-500 mt-[20%]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-600">
        Error loading medicines: {JSON.stringify(error)}
      </div>
    );

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto mt-24">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        All Medicines
      </h2>

      {/* 🔍 Search and Filter */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Antibiotic">Antibiotic</option>
          <option value="Painkiller">Painkiller</option>
          <option value="Antacid">Antacid</option>
          <option value="Antiseptic">Antiseptic</option>
          <option value="Antiviral">Antiviral</option>
        </select>

        <select
          value={filterForm}
          onChange={(e) => setFilterForm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="">All Forms</option>
          <option value="Capsule">Capsule</option>
          <option value="Tablet">Tablet</option>
          <option value="Liquid">Liquid</option>
          <option value="Gel">Gel</option>
          <option value="Cream">Cream</option>
        </select>

        {/* Prescription filter */}
        <select
          value={filterPrescription}
          onChange={(e) => setFilterPrescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="">Prescription Required</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Sort by price */}
        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 🧾 Medicines Grid */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {sortedMedicines.map((medicine) => {
          const isInCart = cartItems.some(
            (item) => item._id === medicine._id
          );

          return (
            <div
              key={medicine._id}
              className="border border-gray-200 shadow-md rounded-md overflow-hidden p-4"
            >
              <div className="relative w-full h-[200px] mb-4 rounded-md overflow-hidden">
                <Image
                  src={medicine.image}
                  alt={medicine.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {medicine.name}
              </h3>

              <div className="flex gap-0">
                <p className="bg-blue-100 px-2">Generic -</p>
                <p className="bg-blue-100 px-2">{medicine.generic}</p>
              </div>

              <div className="flex gap-0 mt-1">
                <p className="bg-red-800 text-white px-2">Category</p>
                <p className="bg-red-100 px-2">{medicine.category}</p>
              </div>

              <p className="text-xl font-bold text-blue-600 mt-2">
                ${medicine.price}
              </p>
              <div className="flex gap-2">
                <p>Prescription</p> <p className="text-2xl relative bottom-1 text-red-600">{(medicine.prescriptionRequired)? "✔" : "✘"}</p>
              </div>
              

              <div className="flex justify-between mt-4">
                <Link
                  href={`/medicine/${medicine._id}`}
                  className="bg-blue-700 text-white py-1 px-3 rounded hover:bg-blue-800"
                >
                  Details
                </Link>
                <button
                  disabled={isInCart}
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: medicine._id!,
                        name: medicine.name,
                        price: medicine.price,
                        quantity: 1,
                        stockQuantity: medicine.quantity,
                        image: medicine.image,
                        prescriptionRequired: medicine.prescriptionRequired

                      })
                    )
                  }
                  className={`py-1 px-3 rounded text-white ${
                    isInCart
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isInCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllMedicinesPage;
