import { Phone, TypeIcon } from "lucide-react";
import { OrderBoxProps } from "@/components/order-box/types";
import { FC } from "react";

const OrderBox: FC<OrderBoxProps> = ({
  id,
  fullname,
  phone,
  status,
  type,
  booking_id,
  price,
}) => {
  const statusClass =
    {
      REJECTED: "border-red-300 bg-red-50 text-red-700 ",
      COMPLETED: "border-green-300 bg-green-50 text-green-700",
      IN_PROGRESS: "border-blue-300 bg-blue-50 text-blue-700",
      NEW: "border-gray-200 bg-gray-50 text-gray-700",
    }[status] || "border-gray-200 bg-gray-50 text-gray-700";

  const priceClass =
    {
      REJECTED: "text-gray-700 font-bold line-through",
    }[status] || "text-gray-700 font-bold";

  const typeLabels: Record<string, string> = {
    TAKEAWAY: "З собою",
    TABLE: "За столиком",
  };

  const statusLabels: Record<string, string> = {
    IN_PROGRESS: "Готується",
    CREATED: "Створено",
    COMPLETED: "Завершено",
    REJECTED: "Скасовано",
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

          <div className="flex flex-wrap gap-3 mt-1">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusClass}`}
            >
              <span className="capitalize">
                {statusLabels[status] || status}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
              <TypeIcon size={14} />
              <span>
                {typeLabels[type] || type}. {booking_id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
          <div className={`text-lg ${priceClass}`}>{price} грн.</div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
