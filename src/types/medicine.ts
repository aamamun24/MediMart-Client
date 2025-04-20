import { MedicineCategory, MedicineForm } from "@/redux/features/medicine/medicineSlice";

// Define the Medicine interface
export interface IMedicine {
  _id?: string; // Optional if not always set in local state
  name: string;
  brand: string;
  generic: string;
  price: number;
  image: string;
  form: MedicineForm;
  category: MedicineCategory;
  description: string;
  simptoms: string[];
  quantity: number;
  prescriptionRequired: boolean;
  manufacturer: string;
  expiryDate: string;
  createdAt?: string;
  updatedAt?: string;
}