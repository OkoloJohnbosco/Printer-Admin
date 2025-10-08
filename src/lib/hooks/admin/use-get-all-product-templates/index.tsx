import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface ProductTemplateResponse {
  data: ProductTemplate[];
  status: boolean;
}

export interface ProductTemplate {
  id: string;
  subCategoryId: string;
  name: string;
  specifications: Specifications;
  addons: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Specifications {
  moq?: number;
  pageOptions: string[];
  sideOptions: string[];
  sizeOptions: string[];
  coverOptions: string[];
  shapeOptions: string[];
  bindingOptions: string[];
  cornersOptions: string[];
  paperThickness: PaperThickness;
  paperStockOptions: string[];
  fillerPaperOptions: string[];
  orientationOptions: string[];
}

export interface PaperThickness {
  Premium: boolean;
  Standard: boolean;
  "Premium +"?: boolean;
}

const useGetProductTemplates = (subCategoryId = "") => {
  return useQueryActionHook<ProductTemplateResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_ALL_PRODUCT_TEMPLATES(subCategoryId),
    queryKey: [QUERYKEYS.GET_ALL_PRODUCT_TEMPLATES, subCategoryId],
  });
};

export default useGetProductTemplates;
