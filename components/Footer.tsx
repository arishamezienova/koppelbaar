type FooterProps = {
    locale: "nl" | "en";
};

export default function Cases({ locale }: FooterProps) {
    return (
        <footer className="border-t py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">

                <h3 className="text-2xl font-semibold mb-6">
                    Contact
                </h3>

                <form className="flex flex-col gap-4 max-w-md mx-auto">

                    <input
                        type="text"
                        placeholder="Naam"
                        className="border rounded-lg px-4 py-2"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded-lg px-4 py-2"
                    />

                    <textarea
                        placeholder="Bericht"
                        rows={4}
                        className="border rounded-lg px-4 py-2"
                    />

                    <button
                        type="submit"
                        className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Verstuur
                    </button>

                </form>

            </div>
        </footer>
    );
}