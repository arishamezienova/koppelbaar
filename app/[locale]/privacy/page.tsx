import nl from "@/languages/nl.json";
import en from "@/languages/en.json";

type Props = {
    params: Promise<{
        locale: string;
    }>;
};

export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params;

    const isEN = locale === "en";

    return (
        <section className="py-24 px-6 min-h-screen">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-semibold tracking-tight mb-10">
                    {isEN ? "Privacy Policy" : "Privacybeleid"}
                </h1>

                <div className="prose prose-lg max-w-none">

                    <h2>{isEN ? "1. Introduction" : "1. Inleiding"}</h2>

                    <p>
                        {isEN
                            ? "We respect your privacy and ensure that personal data you provide is treated confidentially. In this privacy policy we explain what data we collect and how it is used."
                            : "Wij respecteren uw privacy en zorgen ervoor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld. In dit privacybeleid leggen wij uit welke gegevens wij verzamelen en hoe deze worden gebruikt."}
                    </p>

                    <h2>{isEN ? "2. Personal data we collect" : "2. Persoonsgegevens die wij verzamelen"}</h2>

                    <p>
                        {isEN
                            ? "When you contact us through the website, we may collect the following information:"
                            : "Wanneer u contact met ons opneemt via de website kunnen wij de volgende gegevens verzamelen:"}
                    </p>

                    <ul>
                        <li>{isEN ? "Name" : "Naam"}</li>
                        <li>{isEN ? "Email address" : "E-mailadres"}</li>
                        <li>{isEN ? "Message content" : "Berichtinhoud"}</li>
                    </ul>

                    <h2>{isEN ? "3. Purpose of data collection" : "3. Doel van gegevensverwerking"}</h2>

                    <p>
                        {isEN
                            ? "We use this information solely to respond to your inquiry or to communicate regarding potential collaboration."
                            : "Wij gebruiken deze gegevens uitsluitend om te reageren op uw bericht of om contact op te nemen over een mogelijke samenwerking."}
                    </p>

                    <h2>{isEN ? "4. Data retention" : "4. Bewaartermijn"}</h2>

                    <p>
                        {isEN
                            ? "We do not retain personal data longer than necessary to handle your request."
                            : "Wij bewaren persoonsgegevens niet langer dan noodzakelijk is om uw verzoek te behandelen."}
                    </p>

                    <h2>{isEN ? "5. Third parties" : "5. Derden"}</h2>

                    <p>
                        {isEN
                            ? "We do not share your personal data with third parties unless necessary for technical services such as website hosting."
                            : "Wij delen uw gegevens niet met derden, tenzij dit noodzakelijk is voor technische diensten zoals hosting van de website."}
                    </p>

                    <h2>{isEN ? "6. Your rights" : "6. Uw rechten"}</h2>

                    <p>
                        {isEN
                            ? "You have the right to request access, correction, or deletion of your personal data."
                            : "U heeft het recht om uw persoonsgegevens in te zien, te laten corrigeren of te laten verwijderen."}
                    </p>

                    <h2>{isEN ? "7. Contact" : "7. Contact"}</h2>

                    <p>
                        {isEN
                            ? "If you have questions about this privacy policy, you can contact us via email:"
                            : "Voor vragen over dit privacybeleid kunt u contact opnemen via e-mail:"}
                    </p>

                    <p>
                        <a
                            href="mailto:hello@koppelbaar.agency"
                            className="text-purple-600 hover:underline"
                        >
                            hello@koppelbaar.agency
                        </a>
                    </p>

                </div>
            </div>
        </section>
    );
}