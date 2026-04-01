import type { Metadata } from "next";
import OwnerDashboard from "./owner-dashboard";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Edit Stacy Thrifts homepage content and images.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OwnerPage() {
  return <OwnerDashboard />;
}
