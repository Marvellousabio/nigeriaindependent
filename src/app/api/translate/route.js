import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const languageNames = {
  en: 'English',
  ha: 'Hausa',
  yo: 'Yoruba',
  ig: 'Igbo',
  fr: 'French',
  ar: 'Arabic',
  es: 'Spanish',
  pt: 'Portuguese'
};

export async function POST(req) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json({ error: "Text, source language, and target language are required" }, { status: 400 });
    }

    const prompt = `Translate the following text from ${languageNames[sourceLang]} to ${languageNames[targetLang]}:

Text: "${text}"

Provide only the translation, no additional explanations or formatting. If the text is already in the target language, return it as is.`;

    const { text: translation } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return NextResponse.json({ translation: translation.trim() });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}