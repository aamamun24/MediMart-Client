export type Medicine = {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  form: string;
  category: string;
  simptoms: string[];
  description: string;
  quantity: number;
  prescriptionRequired: boolean;
  manufacturer: string;
  expiryDate: string;
};
