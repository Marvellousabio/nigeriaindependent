import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    // Randomize quiz seed to avoid repeated results
    const randomSeed = Math.floor(Math.random() * 100000);

    const prompt = `
    You are a Nigerian culture expert and quiz creator.
    Generate 10 UNIQUE and ENGAGING multiple-choice questions about Nigeria for foreigners.

    Make sure the first question is NOT about independence or basic facts.
    Include at least one question from each of these categories:
    - History (but not independence)
    - Ethnic groups and languages
    - Food and cuisine
    - Festivals and traditions
    - Geography and landmarks
    - Music, film, and entertainment
    - Business and innovation
    - Etiquette and social customs
    - Sports or famous figures
    - Fun or surprising facts about Nigeria

    Make each question interesting, clear, and not too easy.
    Use natural phrasing, slight randomness, and variety in structure.

    Add variety based on this random seed: ${randomSeed}

    Format response strictly as JSON:
    {
      "questions": [
        {
          "question": "Question text?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correct": 1,
          "explanation": "Brief, friendly explanation (1-2 lines)"
        }
      ]
    }`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"), 
      prompt,
    });

    let quizData;
    try {
      quizData = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Quiz generation API error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
