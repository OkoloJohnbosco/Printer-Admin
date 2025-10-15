import { ENDPOINTS, QUERYKEYS } from "@/lib/endpoints";
import useQueryActionHook from "../../api/use-queryaction";

export interface ProductTemplateResponse {
  data: ProductTemplate;
  status: boolean;
}

export interface ProductTemplate {
  id: string;
  subCategoryId: string;
  name: string;
  specifications: Specifications;
  addons: Addon[];
  createdAt: string;
  updatedAt: string;
}

export interface Specifications {
  moq: number;
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
  value: string;
  label: string;
}

export interface Addon {
  description: string;
  key: string;
  label: string;
}

const useGetProductTemplateById = (templateId: string) => {
  return useQueryActionHook<ProductTemplateResponse>({
    method: "get",
    endpoint: ENDPOINTS.GET_PRODUCT_TEMPLATE_BY_ID(templateId),
    queryKey: [QUERYKEYS.GET_PRODUCT_TEMPLATE_BY_ID, templateId],
    enabled: !!templateId,
  });
};

export default useGetProductTemplateById;
