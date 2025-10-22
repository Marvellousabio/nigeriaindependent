import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    const prompt = `Generate 6 significant historical events or milestones in Nigerian history. Each event should include:

Format as JSON:
{
  "events": [
    {
      "year": "Year or year range (e.g., '1960' or '1967-1970')",
      "title": "Brief, catchy title for the event",
      "description": "Detailed description of what happened during this period",
      "significance": "Why this event was important in Nigeria's history and development"
    }
  ]
}

Focus on key moments that shaped modern Nigeria, from pre-colonial times to the present. Include a mix of political, social, and cultural milestones that would be educational for foreigners learning about Nigeria.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let historicalData;
    try {
      historicalData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        historicalData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(historicalData);
  } catch (error) {
    console.error("Historical content API error:", error);
    return NextResponse.json({ error: "Failed to generate historical content" }, { status: 500 });
  }
}