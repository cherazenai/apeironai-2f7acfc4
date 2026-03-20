import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🔥 Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ✅ User client (auth)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;

    // ✅ Safe body
    const body = await req.json().catch(() => ({}));
    console.log("📦 BODY:", body);

    const { action, plan, payment_id, order_id, signature } = body;

    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

    // ===================================================
    // 🔵 CREATE ORDER
    // ===================================================
    if (action === "create_order") {
      const planAmounts: Record<string, number> = {
        researcher: 2900 * 100,
        scientist: 7900 * 100,
      };

      const amount = planAmounts[plan];
      if (!amount) {
        return new Response(JSON.stringify({ error: "Invalid plan" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const authString = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

      const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `order_${userId}_${Date.now()}`,
          notes: {
            user_id: userId,
            plan,
          },
        }),
      });

      const order = await orderRes.json();

      if (!orderRes.ok) {
        return new Response(
          JSON.stringify({
            error: order.error?.description || "Order creation failed",
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          order_id: order.id,
          amount: order.amount,
          currency: order.currency,
          key_id: RAZORPAY_KEY_ID,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ===================================================
    // 🟢 VERIFY PAYMENT
    // ===================================================
    if (action === "verify_payment") {
      if (!payment_id || !order_id || !signature) {
        return new Response(
          JSON.stringify({ error: "Missing payment details" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      console.log("🔍 Verifying payment");

      // ✅ Web Crypto (Edge-safe)
      const encoder = new TextEncoder();

      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(RAZORPAY_KEY_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      const signaturePayload = `${order_id}|${payment_id}`;

      const signatureBytes = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(signaturePayload)
      );

      const expectedSignature = Array.from(
        new Uint8Array(signatureBytes)
      )
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (expectedSignature !== signature) {
        return new Response(
          JSON.stringify({ error: "Payment verification failed" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // 🔥 Fetch order → get REAL plan
      const authString = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

      const orderRes = await fetch(
        `https://api.razorpay.com/v1/orders/${order_id}`,
        {
          headers: {
            Authorization: `Basic ${authString}`,
          },
        }
      );

      const order = await orderRes.json();

      const planFromOrder = order.notes?.plan;

      if (!planFromOrder) {
        return new Response(
          JSON.stringify({ error: "Plan missing in order" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // ✅ Admin client for DB update
      const adminClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { error: updateError } = await adminClient
        .from("profiles")
        .update({
          plan_type: planFromOrder,
          payment_status: "active",
        })
        .eq("id", userId);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: updateError.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          plan: planFromOrder,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("💀 ERROR:", err);

    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
