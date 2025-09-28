export default function NotFound() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-[#C5C4A6] text-black rounded hover:bg-[#B0AFA0] transition"
        >
          Go back to Home
        </a>
      </main>
    );
  }