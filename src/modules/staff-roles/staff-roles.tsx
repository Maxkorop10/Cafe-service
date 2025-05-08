"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/shared/ui/scroll-area";

type Staff = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN";
  createdAt: string;
};

export function StaffRoles() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff/get-staff");
        if (!res.ok) throw new Error("Помилка отримання даних");
        const data = await res.json();
        setStaff(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Сталася невідома помилка");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleRoleChange = async (
    userId: string,
    newRole: "USER" | "MANAGER",
  ) => {
    try {
      const res = await fetch("/api/staff/change-staff-role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!res.ok) throw new Error("Помилка зміни ролі");

      toast.success("Роль користувача успішно змінено!");
      setStaff((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
      alert("Не вдалося змінити роль.");
    }
  };

  if (loading) return <p className="text-gray-500">Завантаження...</p>;
  if (error) return <p className="text-red-500">Помилка: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Облік персоналу</h2>
      </div>

      {staff.length === 0 ? (
        <div className="p-6 text-base text-gray-500">
          Немає доступних адміністраторів.
        </div>
      ) : (
        <ScrollArea className={staff.length < 5 ? "max-h-fit" : "h-[450px]"}>
          <ul className="divide-y divide-gray-100">
            {staff.map((user) => (
              <li
                key={user.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {user.name || "Без імені"}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Дата реєстрації:{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-end text-sm">
                  <button
                    onClick={() => handleRoleChange(user.id, "MANAGER")}
                    className="text-blue-500 py-1 px-2 bg-blue-50 rounded-xl hover:text-blue-600 hover:bg-blue-100 transition"
                  >
                    Підвищити
                  </button>
                  <button
                    onClick={() => handleRoleChange(user.id, "USER")}
                    className="text-red-500 bg-red-50 py-1 px-2 rounded-xl hover:text-red-600 hover:bg-red-100 transition"
                  >
                    Звільнити
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
