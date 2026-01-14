import { apiClient } from '@/shared/api/instance';
import { buildQueryParamsWithOffset } from '@/shared/utils/pagination';
import { buildQueryString } from '@/shared/utils/query';
import type {
  ProductsResponse,
  ProductsQueryParams,
  ProductCreateData,
} from '../types';

class ProductApi {
  /**
   * @description Получение списка продуктов с пагинацией и сортировкой
   * @param params - Параметры запроса
   * @returns Список продуктов
   */
  async fetchProducts(params: ProductsQueryParams): Promise<ProductsResponse> {
    // Преобразуем параметры с page в параметры с offset
    const apiParams = buildQueryParamsWithOffset(params);

    const queryString = buildQueryString({
      offset: apiParams.offset,
      limit: apiParams.limit,
      sortBy: apiParams.sortBy,
      sortOrder: apiParams.sortOrder,
    });

    const response = await apiClient.get<ProductsResponse>(
      `/products?${queryString}`
    );
    return response.data;
  }

  async deleteProduct(productId: string): Promise<void> {
    await apiClient.delete(`/products/${productId}`);
  }

  async createProduct(payload: ProductCreateData): Promise<void> {
    await apiClient.post('/products', payload);
  }

  async updateProduct(
    productId: string,
    payload: Partial<ProductCreateData>
  ): Promise<void> {
    await apiClient.patch(`/products/${productId}`, payload);
  }
}

export const productApi = new ProductApi();
