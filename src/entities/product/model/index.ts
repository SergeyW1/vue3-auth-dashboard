import type { ProductsQueryParams } from '@/entities/product';
import { productApi } from '../api/productApi';
import { useQuery } from '@tanstack/vue-query';

export const PRODUCTS_QUERY_KEY = 'products';

export function useGetProducts(params: ProductsQueryParams) {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: () => productApi.fetchProducts(params),
  });
}
