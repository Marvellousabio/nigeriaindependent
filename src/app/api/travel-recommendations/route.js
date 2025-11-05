import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const { duration, interests, budget, groupSize } = await req.json();

    if (!duration || !interests?.length || !budget || !groupSize) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const prompt = `
    You are a travel assistant for Nigeria.
    Based on the following details:
    - Duration: ${duration}
    - Interests: ${interests.join(", ")}
    - Budget: ${budget}
    - Group size: ${groupSize}

    Generate 3-5 short and friendly travel recommendations.
    Use simple language that anyone can understand.
    Keep each recommendation under 100 words.
    Present each destination with:
    - **Name**
    - **One-line description**
    - **Highlights** (3 bullet points, short phrases only)
    - **Best time to visit**
    - **Cost range**
    - **Rating (out of 5)**

    Format your output in **JSON** as:
    {
      "destinations": [
        {
          "name": "Destination Name",
          "description": "Short and friendly line",
          "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
          "bestTime": "Best time period",
          "cost": "₦xx,xxx - ₦xx,xxx",
          "rating": 4.5
        }
      ]
    }
    `;

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
    });

    let recommendations;
    try {
      recommendations = JSON.parse(text);
    } catch {
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
