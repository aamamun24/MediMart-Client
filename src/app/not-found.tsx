import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
    <Image alt="..." height={200} width={200} src="https://i.postimg.cc/xCjcL3y3/notfound.jpg"></Image>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}