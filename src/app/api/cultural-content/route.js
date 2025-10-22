import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    const prompt = `Generate 6 interesting facts about Nigerian culture and heritage. Each fact should include:

Format as JSON:
{
  "facts": [
    {
      "title": "Catchy title for the fact",
      "content": "Detailed explanation of the cultural fact or tradition",
      "category": "Category like Philosophy, Entertainment, Music, Food, Art, History, etc."
    }
  ]
}

Focus on unique and educational aspects of Nigerian culture that would interest foreigners. Include diverse topics from different regions and ethnic groups.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let culturalData;
    try {
      culturalData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        culturalData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(culturalData);
  } catch (error) {
    console.error("Cultural content API error:", error);
    return NextResponse.json({ error: "Failed to generate cultural content" }, { status: 500 });
  }
}