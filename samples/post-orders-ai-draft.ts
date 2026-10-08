type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'PROCESSING'
  | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface OrderItemResponse {
  productId: string;
  variantId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface OrderResponse {
  orderId: string;
  status: OrderStatus;
  createdAt: string;
  totalAmount: number;
  items: OrderItemResponse[];
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    county?: string;
    postcode: string;
    country: string;
  };
  appliedPromoCode?: string;
  estimatedDelivery?: string;
  customerNote?: string;
  loyaltyPointsEarned?: number;
}