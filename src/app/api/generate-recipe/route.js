import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const { cuisine, dietary, difficulty, time } = await req.json();

    if (!cuisine || !difficulty || !time) {
      return NextResponse.json({ error: "Cuisine, difficulty, and time are required" }, { status: 400 });
    }

    const dietaryText = dietary.length > 0 ? ` with ${dietary.join(', ')} dietary considerations` : '';

    const prompt = `Generate an authentic Nigerian recipe based on these preferences:
    - Cuisine: ${cuisine}
    - Difficulty: ${difficulty}
    - Cooking time: ${time}${dietaryText}

    Provide a complete recipe in this JSON format:
    {
      "title": "Recipe Name",
      "description": "Brief description of the dish and its cultural significance",
      "cookingTime": "Estimated cooking time",
      "servings": "Number of servings",
      "difficulty": "Difficulty level",
      "rating": 4.5,
      "ingredients": [
        "ingredient 1 with quantity",
        "ingredient 2 with quantity"
      ],
      "instructions": [
        "Step 1 description",
        "Step 2 description"
      ],
      "culturalNotes": "Interesting cultural facts about this dish"
    }

    Make sure the recipe is authentic to Nigerian cuisine and includes proper measurements.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let recipe;
    try {
      recipe = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
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
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}