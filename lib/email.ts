import nodemailer from "nodemailer";

export async function sendBookingEmail(payload: { subject: string; html: string }) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
    console.warn("SMTP configuration missing. Email not sent.");
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `Ndivasa <${SMTP_USER}>`,
    to: CONTACT_EMAIL_TO,
    subject: payload.subject,
    html: payload.html
  });

  return { skipped: false };
}
