import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";

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
