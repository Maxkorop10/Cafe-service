export interface WaiterOrderBoxProps {
  id: number;
  fullname: string;
  phone: string;
  status: string;
  type: string;
  booking_id?: number;
  in_process: boolean;
  completed: boolean;
  rejected: boolean;
  price: number;
  onStatusChange: (
    newStatus: "CREATED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED",
  ) => void;
}
