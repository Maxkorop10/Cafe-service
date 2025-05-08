import type { Metadata } from "next";
import { StatsView } from "@/modules/stats-view";

export const metadata: Metadata = {
  title: "Statistics",
};

export default function ManagerStatsPage() {
  return (
    <div className="py-4 px-5 flex justify-center items-center">
      <StatsView />
    </div>
  );
}
