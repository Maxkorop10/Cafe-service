export interface WaiterOrderDialogProps {
  orderId: number;
  items: {
    meal_img: string;
    meal_name: string;
    quantity: number;
    price: number;
  }[];
}
