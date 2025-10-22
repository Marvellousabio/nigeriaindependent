import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const { duration, interests, budget, groupSize } = await req.json();

    if (!duration || !interests.length || !budget || !groupSize) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const prompt = `Generate personalized travel recommendations for Nigeria based on:
    - Duration: ${duration}
    - Interests: ${interests.join(', ')}
    - Budget: ${budget}
    - Group size: ${groupSize}

    Provide 3-5 destination recommendations with:
    - Destination name
    - Brief description
    - Key highlights (3-5 points)
    - Best time to visit
    - Estimated cost range
    - Rating out of 5

    Format as JSON with structure:
    {
      "destinations": [
        {
          "name": "Destination Name",
          "description": "Brief description",
          "highlights": ["highlight1", "highlight2"],
          "bestTime": "Best time description",
          "cost": "Cost range",
          "rating": 4.5
        }
      ]
    }`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let recommendations;
    try {
      recommendations = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Travel recommendations API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}