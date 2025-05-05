import { Calendar, Clock, Phone, Users, XCircle } from "lucide-react";
import { FC } from "react";
import { BookingBoxProps } from "./types";
import { toast } from "sonner";

const WaiterBookingBox: FC<BookingBoxProps> = ({
  id,
  fullname,
  phone,
  date,
  startTime,
  endTime,
  status,
  bookingTables,
  cancelled,
  price,
}) => {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const updateStatus = async (bookingId: number, newStatus: "CANCELLED") => {
    try {
      const res = await fetch("/api/bookings/status-by-waiter", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, newStatus }),
      });

      toast.success("📜 Booking status is updated!");

      if (!res.ok) throw new Error("Failed to update status");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row p-4 gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {id}. {fullname}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-600">
            <Phone size={16} className="text-gray-400" />
            <span className="text-sm font-medium">{phone}</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50">
              <Calendar size={14} />
              {formatDate(date)}
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50">
              <Clock size={14} />
              {formatTime(startTime)} — {formatTime(endTime)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border">
              <span className="capitalize">{status}</span>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50">
              <Users size={14} />
              <span>Table: {bookingTables.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 p-1">
            {cancelled && (
              <button
                onClick={() => updateStatus(id, "CANCELLED")}
                className="flex items-center ml-7 px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors duration-200"
              >
                <XCircle size={16} className="text-red-500" />
              </button>
            )}
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
            <div className="text-lg text-gray-700 font-bold">{price} грн.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterBookingBox;
