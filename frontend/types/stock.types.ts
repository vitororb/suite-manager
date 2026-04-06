export type Stock = {
  id: number;
  code: string;
  productName: string;
  brand: string;
  productType: string;
  quantity: number;
  costPrice: number;
  unitType: string;
  minimumStock: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
