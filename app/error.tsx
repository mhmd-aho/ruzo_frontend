
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 bg-white text-black font-montserrat">
      <div className="text-center max-w-lg">
        <p className="text-[#731012] font-bold text-lg uppercase tracking-widest">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          An unexpected error occurred
        </h1>
        <p className="mt-6 text-base leading-7 text-[#606060]">
          We apologize for the inconvenience. Our system encountered a problem while processing your request.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => reset()}
            className="h-12 px-6 bg-[#731012] text-white hover:bg-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-bold text-black hover:text-[#731012] transition-colors"
          >
            Go back home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
