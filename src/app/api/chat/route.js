import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
    
    try{ 
    const { prompt } = await req.json();

    if (!prompt){ return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    
  const enhancedPrompt = `
You are a concise AI assistant.
Give short, clear answers relevant to Nigeria when applicable.
User: ${prompt}
`;
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
