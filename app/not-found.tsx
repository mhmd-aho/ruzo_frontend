import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 bg-white text-black font-montserrat">
      <div className="text-center max-w-lg">
        <p className="text-[#731012] font-bold text-lg uppercase tracking-widest">
          404 Error
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-[#606060]">
          Sorry, we couldn’t find the page you are looking for. It might have been moved, deleted, or never existed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="h-12 px-6 bg-[#731012] text-white hover:bg-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center"
          >
            Go back home
          </Link>
          <Link
            href="/collections"
            className="text-xs uppercase tracking-widest font-bold text-black hover:text-[#731012] transition-colors"
          >
            Explore collections &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
