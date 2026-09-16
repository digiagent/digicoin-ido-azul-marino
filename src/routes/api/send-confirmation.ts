import { createFileRoute } from "@tanstack/react-router";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY ?? "",
  url: "https://api.mailgun.net",
});

const DOMAIN = process.env.MAILGUN_DOMAIN ?? "";
const FROM = process.env.MAILGUN_FROM ?? "DIGI Bridge Round <noreply@mg.digipaga.com>";

export const Route = createFileRoute("/api/send-confirmation")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            email: string;
            amount: string;
            stable: string;
            chain: string;
            digi: number;
            txHash?: string;
            receivingWallet: string;
            isDirectDeposit: boolean;
          };

          const { email, amount, stable, chain, digi, txHash, receivingWallet, isDirectDeposit } =
            body;

          const digiFormatted = digi.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          });

          const subject = isDirectDeposit
            ? `✅ DIGI Bridge Round — Deposit received: ${amount} ${stable}`
            : `📋 DIGI Bridge Round — Interest registered: ${digiFormatted} DIGI`;

          const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background: #08120a; color: #ffffff; margin: 0; padding: 0;
    }
    .container { 
      max-width: 600px; margin: 0 auto; padding: 40px 20px;
    }
    .header { 
      text-align: center; padding: 40px 0;
      border-bottom: 1px solid #1a3a20;
    }
    .logo-text { 
      font-size: 28px; font-weight: 900; color: #7dfa5a;
      letter-spacing: -0.02em; text-transform: uppercase;
    }
    .card { 
      background: #0e1e12; border: 1px solid #1a3a20;
      border-radius: 16px; padding: 32px; margin: 32px 0;
    }
    .amount-big { 
      font-size: 48px; font-weight: 900; color: #7dfa5a;
      margin: 16px 0; line-height: 1;
    }
    .row { 
      display: flex; justify-content: space-between;
      padding: 12px 0; border-top: 1px solid #1a3a20;
      font-size: 14px;
    }
    .row:first-child { border-top: none; }
    .label { color: #71717a; text-transform: uppercase; 
              font-size: 11px; letter-spacing: 0.1em; font-weight: 700; }
    .value { color: #ffffff; font-weight: 700; }
    .value-green { color: #7dfa5a; font-weight: 900; }
    .value-mono { font-family: monospace; color: #a1a1aa; font-size: 12px; }
    .status-badge {
      display: inline-block; padding: 8px 20px;
      background: rgba(125, 250, 90, 0.15); color: #7dfa5a;
      border: 1px solid rgba(125, 250, 90, 0.3); border-radius: 100px;
      font-size: 13px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; margin: 16px 0;
    }
    .footer { 
      text-align: center; color: #52525b; font-size: 12px;
      padding-top: 32px; border-top: 1px solid #1a3a20;
    }
    .warning {
      background: rgba(251, 191, 36, 0.05); 
      border: 1px solid rgba(251, 191, 36, 0.2);
      border-radius: 12px; padding: 16px; margin: 16px 0;
      color: #fcd34d; font-size: 13px; line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">DIGI Bridge Round</div>
      <div style="color:#52525b;font-size:13px;margin-top:8px;">
        DigiAgent · Opening Soon
      </div>
    </div>

    <div class="card">
      <div class="label">
        ${isDirectDeposit ? "Deposit submitted" : "Interest registered"}
      </div>
      <div class="amount-big">${digiFormatted} DIGI</div>
      <div class="status-badge">
        ${isDirectDeposit ? "⏳ Awaiting confirmation" : "✅ Request recorded"}
      </div>

      <div class="row">
        <span class="label">Contribution</span>
        <span class="value">${amount} ${stable}</span>
      </div>
      <div class="row">
        <span class="label">Network</span>
        <span class="value">${chain}</span>
      </div>
      <div class="row">
        <span class="label">Price per DIGI</span>
        <span class="value-green">$0.0033</span>
      </div>
      <div class="row">
        <span class="label">Indicative DIGI</span>
        <span class="value-green">${digiFormatted} DIGI</span>
      </div>
      ${
        txHash
          ? `
      <div class="row">
        <span class="label">Transaction hash</span>
        <span class="value-mono">${txHash}</span>
      </div>`
          : ""
      }
      <div class="row">
        <span class="label">Receiving wallet</span>
        <span class="value-mono">
          ${receivingWallet.slice(0, 6)}...${receivingWallet.slice(-4)}
        </span>
      </div>
    </div>

    ${
      isDirectDeposit
        ? `
    <div class="warning">
      ⚠️ Your deposit is pending manual review. 
      DIGI will be allocated at TGE once the deposit is confirmed.
      We will email you when your allocation is confirmed.
    </div>`
        : `
    <div class="warning">
      📋 No payment has been taken yet. This email confirms your 
      interest registration. We will contact you when the Bridge 
      Round officially opens to complete your allocation.
    </div>`
    }

    <div class="footer">
      <p>DigiAgent · Bridge Round · Opening Soon</p>
      <p style="margin-top:8px;">
        DIGI is not yet deployed. Token contract: TBA. 
        Chain: TBA. All figures are indicative.
      </p>
      <p style="margin-top:8px;color:#3f3f46;">
        This email was sent to ${email}
      </p>
    </div>
  </div>
</body>
</html>
      `;

          await mg.messages.create(DOMAIN, {
            from: FROM,
            to: [email],
            subject,
            html: htmlBody,
          });

          return Response.json({ ok: true });
        } catch (err) {
          console.error("Mailgun error:", err);
          return Response.json({ ok: false, error: String(err) }, { status: 500 });
        }
      },
    },
  },
});
