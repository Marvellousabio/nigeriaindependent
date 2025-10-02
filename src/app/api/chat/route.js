import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
    try{ 
    const { prompt } = await req.json();

    if (!prompt){ return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    if (!process.env.GOOGLE_API_KEY) {
      console.error("❌ Missing GOOGLE_API_KEY in environment variables");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
  const { text } = await generateText({
    model: google("gemini-1.5-flash", {
      apiKey: process.env.GOOGLE_API_KEY, // safe on server
    }),
    prompt,
  });

  return NextResponse.json({ text });
} catch(error){
    console.error( `❌ API /chat error: ${error}`);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  
}
}
