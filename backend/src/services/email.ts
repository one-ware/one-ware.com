import nodemailer from "nodemailer";

const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

interface SendEmailParams {
  to: string;
  name: string;
  eventTitle: string;
  meetingLink: string;
}

export async function sendRegistrationEmail({ to, name, eventTitle, meetingLink }: SendEmailParams): Promise<void> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #111111; border-radius: 16px; overflow: hidden;">
        <tr>
          <td style="padding: 40px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="padding-bottom: 24px;">
                  <span style="font-size: 20px; font-weight: 700; color: #00FFD1; letter-spacing: 2px;">ONE WARE</span>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom: 8px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">Registration Confirmed</h1>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom: 28px;">
                  <p style="margin: 0; color: #999999; font-size: 15px;">Hello ${name}, thank you for registering!</p>
                </td>
              </tr>
              <tr>
                <td style="background: #1a1a1a; border-radius: 10px; padding: 20px;">
                  <p style="margin: 0 0 4px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Event</p>
                  <p style="margin: 0 0 16px 0; color: #00FFD1; font-size: 16px; font-weight: 600;">${eventTitle}</p>
                  <p style="margin: 0 0 4px 0; color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Meeting Link</p>
                  <a href="${meetingLink}" style="color: #00FFD1; font-size: 13px; text-decoration: none;">${meetingLink}</a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 28px;">
                  <a href="${meetingLink}" style="display: inline-block; background: #00FFD1; color: #000000; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">Join Meeting</a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top: 28px;">
                  <p style="margin: 0; color: #555555; font-size: 12px;">Questions? <a href="mailto:info@one-ware.com" style="color: #00FFD1; text-decoration: none;">info@one-ware.com</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await getTransporter().sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Registration Confirmed: ${eventTitle}`,
    html: htmlContent,
  });
}
