export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateData {
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
  stock?: number;
}

export type ProductUpdateData = Pick<
  Product,
  'name' | 'description' | 'price' | 'stock'
>;

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
