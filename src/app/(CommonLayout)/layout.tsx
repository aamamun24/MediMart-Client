import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FineMed Medicines",
    template: "%s | FineMed Medicines",
  },
  description: "Your trusted online pharmacy for medicines and health products.",
};


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white">
          <Navbar />
      {children}
      <Footer />
      <Toaster/>
    </main>
  );
};

export default CommonLayout;
