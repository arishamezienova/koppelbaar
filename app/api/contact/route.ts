import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, message, token, interests } = body;

        // 🔐 1. Verify reCAPTCHA
        const verifyRes = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
            }
        );

        const verifyData = await verifyRes.json();

        if (!verifyData.success || verifyData.score < 0.5) {
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        // 📧 2. Send email
        await resend.emails.send({
            from: "Koppelbaar <onboarding@resend.dev>",
            to: "hello@koppelbaar.agency",
            subject: "Nieuwe aanvraag",
            html: `
                <h2>Nieuwe aanvraag</h2>
                <p><strong>Naam:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Interesses:</strong> ${interests}</p>
                <p><strong>Bericht:</strong></p>
                <p>${message}</p>
            `,
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}