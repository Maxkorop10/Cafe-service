import type { Metadata } from "next";
import { SuperadminPannel } from "@/modules/superadmin-pannel";

export const metadata: Metadata = {
  title: "Users",
};

export default function SuperAdminPage() {
  return (
    <div className="py-4 px-5">
      <SuperadminPannel />
    </div>
  );
}
