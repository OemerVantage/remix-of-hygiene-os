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
    const { firstName, lastName, email, company, phone } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const htmlBody = `
      <h2>Neue Kundenregistrierung</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name:</td><td style="padding:4px 12px;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Firma:</td><td style="padding:4px 12px;">${company || "–"}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">E-Mail:</td><td style="padding:4px 12px;">${email}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Telefon:</td><td style="padding:4px 12px;">${phone || "–"}</td></tr>
      </table>
      <p style="margin-top:16px;">
        <a href="https://id-preview--5965816f-421e-41a1-a552-5c72e8e4f3ff.lovable.app/admin/kunden" style="background:#2563eb;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;">Kunden freigeben →</a>
      </p>
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
        subject: `Neue Kundenregistrierung – ${firstName} ${lastName}`,
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
