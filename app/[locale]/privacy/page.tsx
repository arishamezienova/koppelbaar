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

                <p className="text-sm text-gray-500 mb-10">
                    {isEN
                        ? "Last updated: March 2026"
                        : "Laatst bijgewerkt: maart 2026"}
                </p>

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
                            ? "We may use third-party services necessary for the operation of the website, such as hosting and form processing services."
                            : "Wij kunnen gebruikmaken van externe diensten die noodzakelijk zijn voor de werking van de website, zoals hosting en formulierverwerking."}
                    </p>

                    <p>
                        {isEN
                            ? "Our contact form is processed using FormSubmit, a service that securely forwards form submissions to our email inbox."
                            : "Ons contactformulier wordt verwerkt via FormSubmit, een dienst die formulierinzendingen veilig naar onze mailbox doorstuurt."}
                    </p>

                    <h2>{isEN ? "6. Cookies and analytics" : "6. Cookies en analytics"}</h2>

                    <p>
                        {isEN
                            ? "Our website uses cookies and analytics tools to understand how visitors interact with the site and to improve the user experience."
                            : "Onze website maakt gebruik van cookies en analysetools om te begrijpen hoe bezoekers de website gebruiken en om de gebruikerservaring te verbeteren."}
                    </p>

                    <p>
                        {isEN
                            ? "We use Hotjar to analyse anonymous user behaviour such as clicks, scrolling behaviour and navigation on the website. These insights help us optimise the website."
                            : "Wij gebruiken Hotjar om anoniem gebruikersgedrag te analyseren, zoals klikken, scrollgedrag en navigatie op de website. Deze inzichten helpen ons om de website te verbeteren."}
                    </p>

                    <p>
                        {isEN
                            ? "Hotjar is only activated after you provide consent via the cookie banner."
                            : "Hotjar wordt alleen geactiveerd nadat u toestemming heeft gegeven via de cookiebanner."}
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