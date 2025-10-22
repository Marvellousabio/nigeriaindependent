import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  try {
    const prompt = `Generate 10 multiple-choice questions about Nigerian culture, history, and traditions for foreigners visiting Nigeria. Each question should have 4 options with one correct answer.

Format as JSON:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Brief explanation of why this is correct and additional context"
    }
  ]
}

Cover topics like:
- History and independence
- Major ethnic groups and languages
- Traditional food and cuisine
- Cultural practices and festivals
- Geography and landmarks
- Music and entertainment
- Business culture
- Social customs and etiquette

Make questions educational and engaging for tourists.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let quizData;
    try {
      quizData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
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
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}