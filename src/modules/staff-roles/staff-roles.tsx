"use client";
import { useEffect, useState } from "react";
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
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
