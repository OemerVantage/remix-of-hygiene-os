import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OWNER_EMAIL = "info@hygiswiss.ch";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, productReference } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const isProductInquiry = !!productReference;
    const subject = isProductInquiry
      ? `Produktanfrage – ${productReference}`
      : `Neue Kontaktanfrage von ${name}`;

    const htmlBody = `
      <h2>${isProductInquiry ? "Neue Produktanfrage" : "Neue Kontaktanfrage"}</h2>
      ${isProductInquiry ? `<p style="margin-bottom:16px;"><strong>Produkt:</strong> ${productReference}</p>` : ""}
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name:</td><td style="padding:4px 12px;">${name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">E-Mail:</td><td style="padding:4px 12px;">${email}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Telefon:</td><td style="padding:4px 12px;">${phone || "–"}</td></tr>
      </table>
      <h3 style="margin-top:20px;">Nachricht:</h3>
      <p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;">${message}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "HYGISWISS <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(JSON.stringify({ error: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
