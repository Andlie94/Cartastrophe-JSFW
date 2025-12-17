import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">Sorry, we couldn’t find this page.</p>
      <Link href="/" className="mt-4 inline-block font-bold text-green-700 hover:underline">Go back home</Link>
    </div>
  );
}