import type { Metadata } from "next";
import { AdDashboard } from "./AdDashboard";

export const metadata: Metadata = {
  title: "דשבורד ממומן | אצבע על הדופק",
  description:
    "דשבורד מעקב הוצאות פרסום ממומן והחזר השקעה לבעלי עסקים — נתונים מ-Meta Ads",
};

export default function Page() {
  return <AdDashboard />;
}
