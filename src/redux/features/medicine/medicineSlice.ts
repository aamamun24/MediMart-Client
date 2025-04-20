import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the form and category types
export type MedicineForm = 'Tablet' | 'Syrup' | 'Capsule' | 'Injection' | 'Ointment';
export type MedicineCategory = 'Antibiotic' | 'Painkiller' | 'Antacid' | 'Antiseptic' | 'Antiviral';

// Define the Medicine interface
export interface IMedicine {
  _id?: string; // Optional if not always set in local state
  name: string;
  generic: string;
  brand: string;
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

// Define the state type for medicines
type TMedicineState = {
  medicines: IMedicine[];
};

// Initial state
const initialState: TMedicineState = {
  medicines: [],
};

// Create the slice
const medicineSlice = createSlice({
  name: "medicines",
  initialState,
  reducers: {
    setMedicines: (state, action: PayloadAction<IMedicine[]>) => {
      state.medicines = action.payload;
    },
  },
});

// Export actions and reducer
export const { setMedicines } = medicineSlice.actions;
export default medicineSlice.reducer;

// Selector
export const selectMedicines = (state: RootState) => state.medicines.medicines;
