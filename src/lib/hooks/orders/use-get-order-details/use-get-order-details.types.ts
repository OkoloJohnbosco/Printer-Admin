import { Addon } from "../../admin/use-get-all-products";
import { OrderStatus } from "../use-get-all-orders/use-get-all-orders.types";

export interface GetOrderDetailsResponse {
  data: IOrderDetails;
  status: boolean;
}

export interface IOrderDetails {
  id: string;
  userId: string;
  hubId: string;
  status: OrderStatus;
  reference: string;
  total: string;
  itemTotal: string;
  deliveryType: string;
  deliveryFee: string;
  deliveryAddressId: string;
  createdAt: string;
  updatedAt: string;
  hub: Hub;
  user: User;
  items: Item[];
}

export interface Hub {
  id: string;
  userId: string;
  status: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  city: string;
  state: string;
  locationLatitude: string;
  locationLongitude: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: string;
  orderId: string;
  hubOfferingId: string;
  productName: string;
  quantity: number;
  price: string;
  specifications: Specifications;
  addons: Addon;
  createdAt: string;
  offering: Offering;
  designFileUrl: string;
}

export interface Specifications {
  sizeOptions: string;
  orientationOptions?: string;
}

export interface Offering {
  template: Template;
}

export interface Template {
  id: string;
  name: string;
}
