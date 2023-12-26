export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
  quantity?: string;
};

export interface Image {
  id: string;
  url: string;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};

export interface Order {
  id: string;
  storeId: string;
  orderItems: OrderItem[];
  isPaid: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: OrderStatus;
};

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product[]
  quantity: number
}

enum OrderStatus {
  PENDING,
  APPROVED,
  SHIPPED,
  DELIVERED,
}