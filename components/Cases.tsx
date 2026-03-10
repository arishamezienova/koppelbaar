export default function Cases() {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                <h2 className="text-3xl font-semibold mb-12 text-center">
                    Cases
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-lg">Project 1</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Moderne website voor een startup.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-lg">Project 2</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Webapplicatie voor automatisering.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="font-semibold text-lg">Project 3</h3>
                        <p className="text-gray-600 mt-2 text-sm">
                            Platform met realtime dashboards.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}