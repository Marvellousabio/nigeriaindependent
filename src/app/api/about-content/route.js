import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    const prompt = `Generate dynamic about content for a Nigeria culture website. Create engaging content that tells foreigners about Nigeria's unique story, culture, and appeal.

Format as JSON:
{
  "title": "An engaging section title (different from 'About Nigeria')",
  "paragraphs": [
    "First paragraph - introduce Nigeria's geography, population, and diversity",
    "Second paragraph - discuss history and cultural heritage",
    "Third paragraph - highlight modern achievements and future outlook"
  ]
}

Make the content informative, welcoming, and focused on what makes Nigeria special. Include facts about diversity, history, achievements, and the warm Nigerian spirit that would appeal to international visitors.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let aboutData;
    try {
      aboutData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aboutData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(aboutData);
  } catch (error) {
    console.error("About content API error:", error);
    return NextResponse.json({ error: "Failed to generate about content" }, { status: 500 });
  }
}