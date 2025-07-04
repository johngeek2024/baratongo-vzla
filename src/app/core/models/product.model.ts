import { Review } from './review.model';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  category: string;
  isBestseller?: boolean;
  gallery?: string[];
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
  specs?: { key: string; value: string; }[];
  reviews?: Review[];
}
