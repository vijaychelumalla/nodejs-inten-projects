export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(otp) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="color: #333;">Verify Your Email</h2>

            <p>Your One-Time Password (OTP) is:</p>

            <h1 style="
                background-color: #007bff;
                color: white;
                display: inline-block;
                padding: 12px 24px;
                border-radius: 8px;
                letter-spacing: 5px;
            ">
                ${otp}
            </h1>

            <p style="margin-top: 20px;">
                This OTP is valid for <strong>10 minutes</strong>.
            </p>

            <p style="color: #777; font-size: 14px;">
                If you did not request this OTP, please ignore this email.
            </p>
        </div>
    </body>
    </html>
    `;
}