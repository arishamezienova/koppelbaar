import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
    return [
        { locale: "nl" },
        { locale: "en" }
    ];
}

type Props = {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

export default async function LocaleLayout({ children, params }: Props) {

    const { locale } = await params;

    const typedLocale = locale as "nl" | "en";

    return (
        <div className="min-h-screen text-black bg-white">

            <Header locale={typedLocale} />
            <main>{children}</main>
            <Footer locale={typedLocale} />
        </div>
    );
}