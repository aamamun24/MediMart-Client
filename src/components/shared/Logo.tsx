import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <h3 className="text-3xl font-bold text-white">
          <span className="text-[#16a085]">Fine</span>Med
        </h3>
      </Link>
    </>
  );
};

export default Logo;
