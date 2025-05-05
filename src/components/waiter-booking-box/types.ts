export interface BookingBoxProps {
  id: number;
  fullname: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  bookingTables: number[];
  cancelled: boolean;
  price: number;
}
