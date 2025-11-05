import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const { cuisine, dietary, difficulty, time } = await req.json();

    if (!cuisine || !difficulty || !time) {
      return NextResponse.json(
        { error: "Cuisine, difficulty, and time are required" },
        { status: 400 }
      );
    }

    const dietaryText =
      dietary?.length > 0
        ? ` considering ${dietary.join(", ")} preferences`
        : "";

    const prompt = `
    You are a friendly Nigerian chef. Create a short, easy-to-follow recipe using clear and simple English.

    Based on:
    - Cuisine: ${cuisine}
    - Difficulty: ${difficulty}
    - Cooking time: ${time}${dietaryText}

    Keep it short and beginner-friendly. Avoid long paragraphs.
    Use bullet points for ingredients and steps.
    Use friendly, conversational tone.

    Format response in JSON like this:
    {
      "title": "Dish name",
      "description": "1-line description",
      "cookingTime": "Estimated time",
      "servings": "Number of servings",
      "difficulty": "Easy / Medium / Hard",
      "rating": 4.5,
      "ingredients": ["short ingredient 1", "short ingredient 2", "short ingredient 3"],
      "instructions": ["short step 1", "short step 2", "short step 3"],
      "culturalNotes": "1 or 2 lines about why Nigerians love this dish"
    }`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    let recipe;
    try {
      recipe = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Recipe generation API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
}
