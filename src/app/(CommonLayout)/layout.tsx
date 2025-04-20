import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white">
          <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default CommonLayout;
