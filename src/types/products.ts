interface DimensionI {
  width: number;
  height: number;
  depth: number;
}

interface ReviewI {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface MetaI {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductI {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimensionI;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ReviewI[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaI;
  thumbnail: string;
  images: string[];
}

export interface ProductResponseI {
  products: ProductI[];
  total: number;
  skip: number;
  limit: number;
}

export type SortKey = "title" | "brand" | "sku" | "rating" | "price";
