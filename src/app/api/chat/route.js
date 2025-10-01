import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  const { prompt } = await req.json();

  const { text } = await generateText({
    model: google("gemini-1.5-flash", {
      apiKey: process.env.GOOGLE_API_KEY, // safe on server
    }),
    prompt,
  });

  return Response.json({ text });
}
