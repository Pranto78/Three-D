export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content: `You are FurniBot, an expert furniture and home decor assistant for an e-commerce furniture platform.

Your expertise includes:
- Furniture types, styles, and materials (wood, metal, fabric, leather, etc.)
- Buying advice: what to look for in quality furniture, sizing tips, room planning
- Selling advice: how to price used furniture, best platforms, photography tips, condition grading
- Furniture care and maintenance (cleaning, polishing, repairs)
- Interior design tips: matching styles, color coordination, space optimization
- Trending furniture styles (mid-century modern, Scandinavian, industrial, bohemian, etc.)
- Assembly guidance and general how-to advice
- Comparing furniture brands and value for money
- Shipping and delivery considerations for large items

Rules:
- Stay focused on furniture, home decor, and related e-commerce topics.
- Be friendly, knowledgeable, and helpful.
- Give specific, practical advice.
- If asked about unrelated topics, politely redirect back to furniture.`,
            },
            ...messages,
          ],
        }),
      },
    );

    const data = await response.json();

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "No response received.",
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return Response.json(
      { reply: "Server error occurred. Please try again." },
      { status: 500 },
    );
  }
}
