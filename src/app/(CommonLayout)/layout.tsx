import Footer from "@/components/shared/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white">
      {children}
      <Footer />
    </main>
  );
};

export default CommonLayout;
