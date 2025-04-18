"use client";
import { Medicine } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const medicineDummyData: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 10g",
    image:
      "https://t4.ftcdn.net/jpg/02/81/42/77/240_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg",
    brand: "ACI",
    price: 20.5,
    form: "Tablet",
    category: "Painkiller",
    simptoms: ["Fever", "Headache", "Body ache"],
    description:
      "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature.",
    quantity: 100,
    prescriptionRequired: false,
    manufacturer: "ACI Limited",
    expiryDate: "2026-12-31",
  },
];

const MedicineDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = () => {
      // Simulate API call (replace this with actual API call later)
      const foundMedicine = medicineDummyData.find((m) => m.id === id);
      if (foundMedicine) {
        setMedicine(foundMedicine);
      } else {
        setMedicine(null); // Handle if medicine not found
      }
      setLoading(false);
    };

    if (id) {
      fetchMedicine();
    }
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${medicine?.name} to cart`);
  };

  if (loading) {
    return <div className="text-center p-10">Loading medicine details...</div>;
  }

  if (!medicine) {
    return (
      <div className="text-center p-10 text-red-600">Medicine not found.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded shadow">
        <div className="relative w-full h-80">
          <Image
            src={medicine.image}
            alt={medicine.name}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
          <p className="text-gray-600 mb-2">
            {medicine.brand} • {medicine.form}
          </p>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            ${medicine.price.toFixed(2)}
          </p>

          <p className="mb-4">{medicine.description}</p>

          <div className="mb-4">
            <strong>Symptoms:</strong> {medicine.simptoms.join(", ")}
          </div>

          <div className="mb-2">
            <strong>Manufacturer:</strong> {medicine.manufacturer}
          </div>
          <div className="mb-2">
            <strong>Expiry Date:</strong> {medicine.expiryDate}
          </div>
          <div className="mb-2">
            <strong>Category:</strong> {medicine.category}
          </div>
          <div className="mb-2">
            <strong>Stock Available:</strong> {medicine.quantity}
          </div>
          <div className="mb-6">
            <strong>Prescription Required:</strong>{" "}
            {medicine.prescriptionRequired ? "Yes" : "No"}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={medicine.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 w-20"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
