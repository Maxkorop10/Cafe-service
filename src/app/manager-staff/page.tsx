import type { Metadata } from "next";
import { StaffRoles } from "@/modules/staff-roles";

export const metadata: Metadata = {
  title: "Staff",
};

export default function ManagerStaffPage() {
  return (
    <div className="py-4 px-5">
      <StaffRoles />
    </div>
  );
}
