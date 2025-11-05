import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Generate image using Gemini model via Vercel AI SDK
    const result = await generateObject({
      model: google("gemini-2.0-flash"), // Fast and supports text-to-image
       schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" }
    },
  },
    prompt: prompt,
    size: "512x512",
  });

    if (!result || !result.imageBase64) {
      return NextResponse.json({ error: "No image returned from model" }, { status: 500 });
    }

    const imageUrl = `data:image/png;base64,${result.imageBase64}`;

    return NextResponse.json({
      imageUrl,
      prompt,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
