import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

const systemPrompt = `You are ApeironAI, an advanced AI scientific research assistant built by Cherazen Inc.

You analyze research papers and extract structured insights. Given the full text of a research paper, provide a comprehensive analysis with the following sections:

## Paper Summary
A concise but thorough summary of the paper's main contributions, methodology, and conclusions.

## Key Insights
A numbered list of the most important findings and takeaways from the paper.

## Generated Scientific Hypotheses
Based on the paper's findings, generate 3-5 novel scientific hypotheses that could be explored further. For each hypothesis, include:
- The hypothesis statement
- Reasoning based on the paper
- Confidence level (High/Medium/Low)

## Potential Research Directions
Suggest 3-5 concrete research directions that build upon this paper's findings. Include potential methodologies and expected impact.

Use clear markdown formatting throughout.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { paperText, fileName } = await req.json();

    if (!paperText || paperText.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Paper text is too short or empty. Please upload a valid research paper." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Truncate very long papers to fit context window
    const truncated = paperText.slice(0, 80000);

    const response = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Please analyze the following research paper titled "${fileName || 'Untitled'}":\n\n${truncated}`,
          },
        ],
        max_tokens: 4096,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI Gateway error:", response.status, t);
      throw new Error(`AI Gateway returned ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("analyze-paper error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
