export default function Hero() {
    return (
        <section
            className="relative w-full min-h-screen flex items-center bg-cover bg-center"
            style={{backgroundImage: "url('/bg.jpeg')"}}
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* content container */}
            <div className="relative max-w-6xl mx-auto w-full px-6 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                {/* linker kolom */}
                <div className="text-left text-white">
                    <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-2xl tracking-tight">
                        Wij bouwen
                        <br />
                        websites die jou
                        <br />
                        vooruithelpen
                        <span className="text-purple-500">.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-gray-200">
                        Nieuwe website nodig of je huidige site vernieuwen?
                        Wij ontwerpen en ontwikkelen moderne websites op maat voor bedrijven die willen groeien.
                    </p>

                    <button
                        className="mt-6 group relative flex items-center gap-2 pr-4 pl-1 py-1 rounded-full border-2 border-white overflow-hidden">

                        {/* animated background */}
                        <span
                            className="absolute inset-0 bg-purple-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                        {/* arrow circle */}
                        <span
                            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white">
                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                             →
                            </span>
                        </span>

                        {/* text */}
                        <span className="relative font-medium text-white text-sm">
                        Samenwerken?
                        </span>

                    </button>
                </div>

                {/* rechter kolom */}
                <div></div>

            </div>
        </section>
    );
}