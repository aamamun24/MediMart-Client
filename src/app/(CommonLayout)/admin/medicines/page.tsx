"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMedicines, setMedicines } from "@/redux/features/medicine/medicineSlice";
import { IMedicine } from "@/types";
import UpdateMedicineModal from "@/components/admin/UpdateProductModal";
import AddMedicineModal from "@/components/admin/AddMedicineModal";
import { useGetAllMedicinesQuery } from "@/redux/features/medicine/medicineApi";

const Medicines = () => {
  const dispatch = useDispatch();
  const medicines = useSelector(selectMedicines).medicines;
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: medicinesData, refetch } = useGetAllMedicinesQuery({});

  // Set medicines in store
  useEffect(() => {
    if (medicinesData?.data?.medicines) {
      dispatch(setMedicines(medicinesData.data.medicines));
    }
  }, [medicinesData, dispatch]);
console.log(medicines)
  // Handle empty medicines
  useEffect(() => {
    if (medicines.length === 0 && !medicinesData) {
      dispatch(setMedicines([]));
    }
  }, [dispatch, medicines.length, medicinesData]);

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

  return (
    <div className="min-h-[70vh] p-6 space-y-12 mb-10">
      {/* Medicines Table */}
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

      {isModalOpen && selectedMedicine && (
        <UpdateMedicineModal onClose={closeUpdateMedicineModal} medicine={selectedMedicine} />
      )}
      {isAddModalOpen && <AddMedicineModal onClose={closeAddMedicineModal} />}
    </div>
  );
};

export default Medicines;