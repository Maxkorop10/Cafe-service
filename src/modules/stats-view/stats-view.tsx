"use client";

import { useEffect, useState } from "react";
import {
  BarChart as BarChartIcon,
  CalendarCheck2,
  CircleDollarSign,
  Wallet,
  Wine,
} from "lucide-react";

type Stats = {
  incomeFromOrders: number;
  incomeFromBookings: number;
  totalIncome: number;
  incomeByType: { type: string; _sum: { totalPrice: number } }[];
  incomeByStatus: { status: string; _sum: { totalPrice: number } }[];
};

const typeLabels: Record<string, string> = {
  TAKEAWAY: "З собою",
  TABLE: "За столиком",
};

const statusLabels: Record<string, string> = {
  IN_PROGRESS: "В процесі",
  CREATED: "Створені",
  COMPLETED: "Завершені",
  REJECTED: "Скасовані",
};

export function StatsView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/statistic/general");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error || !stats)
    return <p className="text-red-500">Failed to load statistics.</p>;

  const chartData = stats.incomeByType.map((item) => ({
    name: typeLabels[item.type] || item.type,
    total: item._sum.totalPrice,
  }));

  return (
    <div className="bg-white w-full rounded-2xl shadow-xl p-6 space-y-8 border-slate-600 border-1">
      <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
        <BarChartIcon className="text-blue-500" /> Фінансова звітність
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl shadow flex items-center gap-4 border border-gray-200">
          <Wine className="text-red-600 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600">Дохід із замовлень</p>
            <p className="text-xl font-semibold text-gray-800">
              {stats.incomeFromOrders} ₴
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow flex items-center gap-4 border border-gray-200">
          <CalendarCheck2 className="text-green-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600">Дохід з бронювань</p>
            <p className="text-xl font-semibold text-gray-800">
              {stats.incomeFromBookings} ₴
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow flex items-center gap-4 border border-gray-200">
          <Wallet className="text-purple-500 w-8 h-8" />
          <div>
            <p className="text-sm text-gray-600">Загальний дохід</p>
            <p className="text-xl font-bold text-gray-800">
              {stats.totalIncome} ₴
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-700">
          <CircleDollarSign className="text-green-500" />
          Дохід за типом замовлення
        </h3>

        <ul className="space-y-1 mt-4 ml-4 list-disc list-inside text-gray-700 text-sm">
          {chartData.map((item) => (
            <li key={item.name}>
              {item.name}: <span className="font-medium">{item.total} ₴</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-700">
          <CircleDollarSign className="text-green-500" />
          Дохід за статусом замовлення
        </h3>
        <ul className="space-y-1 ml-4 list-disc list-inside text-gray-700 text-sm">
          {stats.incomeByStatus.map((item) => (
            <li key={item.status}>
              <span className="capitalize">
                {statusLabels[item.status] || item.status.toLowerCase()}
              </span>
              : <span className="font-medium">{item._sum.totalPrice} ₴</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
