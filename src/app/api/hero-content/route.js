import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    const prompt = `Generate dynamic hero content for a Nigeria culture website. Create engaging, welcoming content that highlights Nigeria's unique appeal to foreigners.

Format as JSON:
{
  "title": "An engaging, dynamic title (different from 'Welcome to Nigeria')",
  "description": "A compelling description that highlights Nigeria's culture, diversity, and appeal to visitors (2-3 sentences)",
  "ctaText": "Call-to-action button text that's engaging and action-oriented"
}

Make the content fresh, exciting, and focused on what makes Nigeria special for international visitors. Include elements of culture, hospitality, and discovery.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let heroData;
    try {
      heroData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        heroData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(heroData);
  } catch (error) {
    console.error("Hero content API error:", error);
    return NextResponse.json({ error: "Failed to generate hero content" }, { status: 500 });
  }
}