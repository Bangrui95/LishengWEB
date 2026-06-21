// Cloudflare Worker entry.
// Serves the built static site (dist/, via the ASSETS binding) and handles the
// one dynamic route — POST /api/submit — for the contact / inquiry form.
//
// Secrets live ONLY in the Worker's environment variables (never in code/Git):
//   RESEND_API_KEY  — the re_... key from resend.com  (required)
//   INQUIRY_TO      — where inquiries are delivered    (optional, defaults below)
//   INQUIRY_FROM    — verified sender on your domain   (optional, defaults below)

const DEFAULT_TO = "lishengnoodles@gmail.com";
const DEFAULT_FROM = "Lisheng Website <inquiry@lishengnoodles.com>";

// Honeypot: a field real users never see. If a bot fills it, we silently accept
// (return success) but send nothing — so the bot can't tell it was blocked.
const HONEYPOT_FIELD = "lisheng_hp";

// Required for a usable inquiry (must match the form's `name` attributes).
const REQUIRED = ["email", "company", "product-category"];

// Order + human labels for the email body. Optional fields are skipped when empty.
const FIELD_LABELS = [
  ["first-name", "First name"],
  ["last-name", "Last name"],
  ["email", "Business email"],
  ["phone", "Phone / WhatsApp"],
  ["company", "Company"],
  ["country", "Country / Market"],
  ["product-category", "Product category"],
  ["order-volume", "Estimated order volume"],
  ["message", "Message"],
  ["customization-details", "Customization details"],
];

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

async function handleSubmit(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid_request" });
  }

  // 1) Honeypot — if filled, pretend it worked and drop it.
  if (data[HONEYPOT_FIELD]) {
    return json(200, { ok: true });
  }

  // 2) Required fields + email sanity check.
  const missing = REQUIRED.filter((name) => !String(data[name] || "").trim());
  if (missing.length) {
    return json(400, { ok: false, error: "missing_fields", fields: missing });
  }
  if (!isEmail(data.email)) {
    return json(400, { ok: false, error: "invalid_email" });
  }

  // 3) Build the email.
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json(500, { ok: false, error: "server_not_configured" });
  }
  const to = env.INQUIRY_TO || DEFAULT_TO;
  const from = env.INQUIRY_FROM || DEFAULT_FROM;

  const rows = FIELD_LABELS
    .filter(([name]) => String(data[name] || "").trim())
    .map(
      ([name, label]) =>
        `<tr><td style="padding:6px 14px 6px 0;vertical-align:top;color:#666;white-space:nowrap;">${escapeHtml(
          label
        )}</td><td style="padding:6px 0;vertical-align:top;color:#111;white-space:pre-wrap;">${escapeHtml(
          data[name]
        )}</td></tr>`
    )
    .join("");

  const wantsUpdates = data.updates ? "Yes" : "No";
  const lang = data._lang ? String(data._lang).toUpperCase() : "EN";
  const sourcePage = data._page ? String(data._page) : "/contact/";

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;">
    <h2 style="color:#d71920;margin:0 0 4px;">New website inquiry</h2>
    <p style="color:#888;margin:0 0 18px;font-size:13px;">From ${lang} site &middot; ${escapeHtml(
    sourcePage
  )}</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5;">${rows}
      <tr><td style="padding:6px 14px 6px 0;color:#666;white-space:nowrap;">Wants updates</td><td style="padding:6px 0;color:#111;">${wantsUpdates}</td></tr>
    </table>
    <p style="color:#aaa;margin:18px 0 0;font-size:12px;">Reply directly to this email to respond to the customer.</p>
  </div>`;

  const text = FIELD_LABELS.filter(([name]) => String(data[name] || "").trim())
    .map(([name, label]) => `${label}: ${data[name]}`)
    .join("\n");

  const fullName = `${data["first-name"]} ${data["last-name"]}`.trim();
  const subject = `New inquiry: ${fullName} (${data.company}) — ${data.country}`;

  // 4) Send via Resend. Reply-To = the customer, so hitting reply answers them.
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: String(data.email).trim(),
      subject,
      html,
      text,
    }),
  });

  if (!resp.ok) {
    return json(502, { ok: false, error: "send_failed" });
  }

  return json(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/submit") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }
      return handleSubmit(request, env);
    }

    // Every other request is served from the built static site (dist/).
    return env.ASSETS.fetch(request);
  },
};
