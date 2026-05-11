import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pagina niet gevonden · Page not found",
    description: "Deze pagina bestaat niet. The page you're looking for doesn't exist.",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
            <div className="max-w-lg text-center">

                <div className="text-7xl md:text-8xl font-bold tracking-tight mb-6">
                    404<span className="text-purple-600">.</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-semibold mb-3">
                    Pagina niet gevonden
                </h1>
                <p className="text-gray-300 mb-1">
                    Deze pagina bestaat niet of is verplaatst.
                </p>

                <p className="text-sm text-gray-500 mt-6 mb-1 uppercase tracking-wide">
                    English
                </p>
                <h2 className="text-lg font-medium mb-2">Page not found</h2>
                <p className="text-gray-400 text-sm mb-10">
                    The page you&apos;re looking for doesn&apos;t exist or has moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/nl"
                        className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                    >
                        Naar homepage
                    </Link>
                    <Link
                        href="/en"
                        className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg hover:border-white/70 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                    >
                        Back to homepage
                    </Link>
                </div>

            </div>
        </main>
    );
}
