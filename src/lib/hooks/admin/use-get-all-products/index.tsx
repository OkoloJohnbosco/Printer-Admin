import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface Specification {
  label: string;
  options: string[];
  base?: string;
  priceType?: "FIXED" | "PER_UNIT";
}

export interface Addon {
  key: string;
  label: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  specifications: Record<string, Specification>;
  addons: Addon[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  data: Product[];
  success: boolean;
}

const useGetAllProducts = (categoryId = "") => {
  return useQueryActionHook<ProductResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCTS(categoryId),
    queryKey: [QUERYKEYS.GET_ALL_PRODUCTS, categoryId],
  });
};

export default useGetAllProducts;
