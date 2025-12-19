import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendRenewalEmail(to: string, name: string, plan: string, expiryDate: string, status: 'due_today' | 'due_week' | 'missed') {
    const isMissed = status === 'missed';
    const deadlineColor = isMissed ? '#ef4444' : '#d4af37';
    const statusText = isMissed ? 'EXPIRED' : 'ENDING SOON';

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Renewal</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020410; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e2e8f0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 30px; background: linear-gradient(to right, #0f172a, #1e293b); border-bottom: 1px solid #334155;">
                            <div style="width: 48px; height: 48px; background-color: #d4af37; border-radius: 8px; line-height: 48px; color: #020410; font-weight: bold; font-size: 24px;">TD</div>
                            <h1 style="margin: 15px 0 0; color: #ffffff; font-size: 24px; letter-spacing: -0.5px;">Traders Diary</h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #d4af37; font-size: 20px;">Renew Your Trading Edge</h2>
                            
                            <p style="margin: 0 0 20px; color: #94a3b8; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
                            
                            <p style="margin: 0 0 20px; color: #e2e8f0; line-height: 1.6;">
                                We hope your trading journey has been profitable. This is a reminder that your <strong>${plan} Membership</strong> is scheduled to expire on <strong style="color: ${deadlineColor};">${expiryDate}</strong>.
                            </p>

                            <p style="margin: 0 0 30px; color: #94a3b8; line-height: 1.6;">
                                Don't lose access to your analytics, private journal, and premium market studies. Maintain your edge by renewing today.
                            </p>

                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <a href="https://tradediary.equitymarvels.com/dashboard/subscription" style="display: inline-block; padding: 14px 30px; background-color: #d4af37; color: #020410; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">
                                            Renew Subscription
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 0; font-size: 13px; color: #64748b; text-align: center;">
                                If you have already renewed, please ignore this message.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; background-color: #020410; text-align: center; border-top: 1px solid #1e293b;">
                            <p style="margin: 0; color: #475569; font-size: 12px;">
                                &copy; 2025 Pratham Wealth Academy. All rights reserved.<br>
                                Proudly Made in India 🇮🇳
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    try {
        const info = await transporter.sendMail({
            from: '"Traders Diary" <wealthacademy@equitymarvels.com>',
            to,
            subject: `Action Required: Renew Your ${plan} Subscription`,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error };
    }
}
