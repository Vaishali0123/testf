import { NextResponse } from "next/server";
import SibApiV3Sdk from "@getbrevo/brevo";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const client = new SibApiV3Sdk.TransactionalEmailsApi();
    client.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Waitlist Subscriber";
    sendSmtpEmail.htmlContent = `<p>You got a new subscriber: <b>${email}</b></p>`;
    sendSmtpEmail.sender = { name: "Webivus Waitlist", email: "infra@webivus.com" };
    sendSmtpEmail.to = [{ email: "hi@webivus.com" }]; // YOUR inbox

    await client.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
