import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
    try{ 
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

  const { text } = await generateText({
    model: google("gemini-1.5-flash", {
      apiKey: process.env.GOOGLE_API_KEY, // safe on server
    }),
    prompt,
  });

  return Response.json({ text });
} catch(error){
    console.error("Chat API error",error)

    return Response.json(
        { error: "Internal server error" },
      { status: 500 }
    );
    
}
}
