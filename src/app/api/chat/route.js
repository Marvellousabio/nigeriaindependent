import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
    
    try{ 
    const { prompt } = await req.json();

    if (!prompt){ return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ Missing GOOGLE_API_KEY in environment variables");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
  const enhancedPrompt = `You are a knowledgeable AI assistant specializing in Nigerian culture, history, and current affairs. Answer questions about Nigeria with accurate, helpful information. If the user asks about general topics, provide context relevant to Nigeria when appropriate.

User question: ${prompt}

Please provide a comprehensive, accurate response about Nigeria. Include cultural context, historical background, and current relevance where applicable.`;

  const { text } = await generateText({
   model: google("gemini-2.5-flash"),
   prompt: enhancedPrompt,
 });

  return NextResponse.json({ text });
} catch(error){
    console.error( `❌ API /chat error: ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  
}
}
