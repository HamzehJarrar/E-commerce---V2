export const registrationTemplate = (userName, code) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Verify Your Account</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          background-color: #f4f6f9;
        }
        
        /* Main styles */
        .email-wrapper {
          width: 100%;
          background-color: #f4f6f9;
          padding: 40px 20px;
        }
        .email-container {
          max-width: 560px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 48px 40px;
          text-align: center;
        }
        .logo-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 14px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header h1 {
          margin: 0;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .header-subtitle {
          margin: 8px 0 0;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 15px;
          color: #94a3b8;
        }
        .content {
          padding: 48px 40px;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.7;
          color: #334155;
        }
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 16px;
        }
        .message {
          margin: 0 0 32px;
          color: #64748b;
        }
        .code-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          margin: 32px 0;
        }
        .code-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #64748b;
          margin: 0 0 16px;
        }
        .code {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 10px;
          color: #6366f1;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          padding: 8px 0;
        }
        .code-fallback {
          font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 10px;
          color: #6366f1;
          margin: 0;
          padding: 8px 0;
        }
        .code-expiry {
          font-size: 13px;
          color: #94a3b8;
          margin: 16px 0 0;
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e2e8f0, transparent);
          margin: 32px 0;
        }
        .help-text {
          font-size: 14px;
          color: #94a3b8;
          margin: 0 0 24px;
        }
        .signature {
          margin: 0;
          color: #334155;
        }
        .signature strong {
          color: #0f172a;
        }
        .footer {
          background-color: #f8fafc;
          padding: 32px 40px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer-text {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 13px;
          color: #94a3b8;
          margin: 0 0 12px;
          line-height: 1.6;
        }
        .footer-links {
          margin: 16px 0 0;
        }
        .footer-links a {
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          font-size: 13px;
          color: #6366f1;
          text-decoration: none;
          margin: 0 12px;
        }
        .footer-links a:hover {
          text-decoration: underline;
        }
        .social-links {
          margin: 20px 0 0;
        }
        .social-link {
          display: inline-block;
          width: 36px;
          height: 36px;
          background-color: #e2e8f0;
          border-radius: 50%;
          margin: 0 6px;
          line-height: 36px;
          text-align: center;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
          .email-wrapper {
            padding: 20px 16px;
          }
          .header {
            padding: 36px 24px;
          }
          .header h1 {
            font-size: 24px;
          }
          .content {
            padding: 36px 24px;
          }
          .code {
            font-size: 28px;
            letter-spacing: 6px;
          }
          .code-fallback {
            font-size: 28px;
            letter-spacing: 6px;
          }
          .footer {
            padding: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <div class="logo-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h1>Welcome to Our Store</h1>
                  <p class="header-subtitle">Your journey starts here</p>
                </td>
              </tr>
            </table>
          </div>
          
          <!-- Content -->
          <div class="content">
            <p class="greeting">Hello ${userName},</p>
            <p class="message">
              Thank you for creating an account with us! To complete your registration and secure your account, please verify your email address using the confirmation code below.
            </p>
            
            <!-- Verification Code Box -->
            <div class="code-section">
              <p class="code-label">Your Verification Code</p>
              <!--[if mso]>
              <p class="code-fallback">${code}</p>
              <![endif]-->
              <!--[if !mso]><!-->
              <p class="code">${code}</p>
              <!--<![endif]-->
              <p class="code-expiry">This code expires in 15 minutes</p>
            </div>
            
            <div class="divider"></div>
            
            <p class="help-text">
              If you didn&apos;t create an account with us, please disregard this email. No action is required on your part.
            </p>
            
            <p class="signature">
              Warm regards,<br>
              <strong>The Store Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-text">
              This is an automated message from Our Store.<br>
              Please do not reply directly to this email.
            </p>
            <div class="footer-links">
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
            <p class="footer-text" style="margin-top: 20px;">
              &copy; ${new Date().getFullYear()} Your Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
