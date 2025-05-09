import { UserBoxProps } from "@/components/user-box/types";
import { FC } from "react";
import { toast } from "sonner";

const UserBox: FC<UserBoxProps> = ({
  userId,
  name,
  email,
  createdAt,
  fire,
  make_waiter,
  make_manager,
  onRoleChange,
}) => {
  const handleRoleChange = async (
    userId: string,
    newRole: "USER" | "MANAGER" | "ADMIN",
  ) => {
    try {
      const res = await fetch("/api/staff/change-staff-role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!res.ok) throw new Error("Помилка зміни ролі");

      toast.success("Роль користувача успішно змінено!");
      onRoleChange(newRole);
    } catch (err) {
      console.error(err);
      toast.error("Не вдалося змінити роль.");
    }
  };

  return (
    <div className="p-3 rounded-lg border border-gray-200 flex justify-between items-start">
      <div>
        <p className="font-medium">{name || "Без імені"}</p>
        <p className="text-sm text-gray-600">{email}</p>
        <p className="text-xs text-gray-400">
          Зареєстровано: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-end text-sm">
        {make_waiter && (
          <button
            onClick={() => handleRoleChange(userId, "ADMIN")}
            className="text-blue-500 bg-blue-50 py-1 px-2 rounded-xl hover:text-blue-600 hover:bg-blue-100 transition"
          >
            Зробити офіціантом
          </button>
        )}
        {make_manager && (
          <button
            onClick={() => handleRoleChange(userId, "MANAGER")}
            className="text-green-500 bg-green-50 py-1 px-2 rounded-xl hover:text-green-600 hover:bg-green-100 transition"
          >
            Зробити менеджером
          </button>
        )}
        {fire && (
          <button
            onClick={() => handleRoleChange(userId, "USER")}
            className="text-red-500 bg-red-50 py-1 px-2 rounded-xl hover:text-red-600 hover:bg-red-100 transition"
          >
            Звільнити
          </button>
        )}
      </div>
    </div>
  );
};

export default UserBox;
