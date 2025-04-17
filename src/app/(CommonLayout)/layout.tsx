import Footer from "@/components/shared/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
};

export default CommonLayout;
