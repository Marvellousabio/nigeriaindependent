// TypeScript interfaces for API responses

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
}

export interface MusicRecommendation {
  songs: Array<{
    title: string;
    artist: string;
    album?: string;
    year?: string;
  }>;
  playlist: {
    name: string;
    description: string;
    songs: Array<{
      title: string;
      artist: string;
    }>;
  };
}

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
}

export interface Recipe {
  title: string;
  description: string;
  rating: number;
  cookingTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  culturalNotes: string;
}

export interface TravelDestination {
  name: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  duration: string;
}

export interface VirtualTour {
  title: string;
  description: string;
  highlights: string[];
  duration: string;
  imageUrl?: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CulturalContent {
  title: string;
  content: string;
  category: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
}