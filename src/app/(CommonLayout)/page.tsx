import { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "FineMed Medicines",
  description: "Welcome to FineMed Medicines, your trusted online pharmacy.",
};

export default function HomePage() {
  return <HomePageClient />;
}
