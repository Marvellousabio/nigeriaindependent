import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const { mood, genre } = await req.json();

    if (!mood || !genre) {
      return NextResponse.json({ error: "Mood and genre are required" }, { status: 400 });
    }

    const prompt = `Generate personalized Nigerian music recommendations based on:
    - Mood: ${mood}
    - Genre: ${genre}

    Provide 5 song recommendations with:
    - Song title
    - Artist name
    - Brief description
    - Genre
    - Duration (approximate)
    - Rating out of 5
    - Sample lyrics (1-2 lines)
    - Cultural context

    Also create a complete playlist with 10 songs that fit this mood/genre combination.

    Format as JSON:
    {
      "songs": [
        {
          "title": "Song Title",
          "artist": "Artist Name",
          "description": "Brief description of the song",
          "genre": "Genre",
          "duration": "3:45",
          "rating": 4.5,
          "lyrics": "Sample lyrics here...",
          "culturalContext": "Cultural significance or background"
        }
      ],
      "playlist": {
        "description": "Playlist description",
        "songs": [
          {
            "title": "Song Title",
            "artist": "Artist Name"
          }
        ]
      }
    }`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Parse the JSON response
    let musicData;
    try {
      musicData = JSON.parse(text);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        musicData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    return NextResponse.json(musicData);
  } catch (error) {
    console.error("Music recommendations API error:", error);
    return NextResponse.json({ error: "Failed to generate music recommendations" }, { status: 500 });
  }
}