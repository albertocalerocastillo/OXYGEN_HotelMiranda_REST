export interface Room {
  id: string;
  name: string;
  type: string;
  number?: string;
  amenities: string[];
  price: number;
  discount?: number;
  offerPrice?: string;
  photos: string[];
  status: string;
  description?: string;
  offer?: string;
  cancellation?: string;
}