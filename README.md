### Complete Structure Documentation of the Nigeria Independent React Project

#### Root-Level Configuration Files

- **`next.config.ts`**: Next.js configuration file that enables image domains for external sources (newsapi.org, via.placeholder.com, placehold.co) to allow loading images from these domains.

- **`tailwind.config.js`**: Tailwind CSS configuration with Nigeria-inspired color palette featuring primary greens, secondary grays, and accent yellows. Includes custom font families (Geist Sans/Mono, Montserrat, Lora), animations (fade-in, slide-up, bounce-subtle), and responsive design utilities. Dark mode is enabled with class-based switching.

- **`tsconfig.json`**: TypeScript configuration targeting ES2017, enabling JSX preservation, and including paths for '*' (see below for file content) aliasing. Includes the Info.jsx component in compilation despite being JavaScript.

- **`postcss.config.mjs`**: PostCSS configuration that integrates Tailwind CSS for processing.

- **`eslint.config.mjs`**: ESLint configuration extending Next.js core web vitals and TypeScript rules, with ignores for build artifacts and Next.js generated files.

- **`globals.d.ts`**: TypeScript declaration file that declares CSS module types for global CSS imports.

- **`.gitignore`**: Standard Next.js gitignore excluding node_modules, build artifacts, environment files, and development cache files.

#### Public Directory and Assets

The public directory contains static assets served directly:

- **`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`**: SVG icons and logos for UI elements.
- **`nigeria-583.gif`**: Animated Nigerian flag used in the Hero component.
- **`nigeria.gif`**: Static Nigerian flag image for the header logo.
- **`nigeriaflag.png`**: PNG version of the Nigerian flag.
- **`nigeria-anthem.mp3`**: Audio file of the Nigerian national anthem, playable in the Hero section.

#### Src Directory Structure

##### App Directory (Next.js App Router)

**Pages:**
- **`layout.tsx`**: Root layout component providing HTML structure, metadata (title: "Nigeria Independent - Discover Nigeria's Culture & Heritage"), and theme provider context. Handles server-side rendering of theme from cookies.
- **`page.tsx`**: Main homepage component rendering all major sections: Header, Hero, About, CultureSection, TravelSection, TravelRecommendations, LanguageTranslator, ImageGenerator, RecipeGenerator, VirtualTours, CulturalQuiz, MusicRecommendations, Info, ChatBot, VisitorPopup, and Footer.
- **`globals.css`**: Global CSS with Nigeria-inspired color variables for light/dark themes, custom font imports (Google Fonts: Lora, Montserrat, Outfit), and Tailwind integration.

**API Routes (`src/app/api/`):**
- **`about-content/route.js`**: Generates dynamic about content for Nigeria using AI.
- **`chat/route.js`**: Powers the ChatBot component with AI responses about Nigerian culture.
- **`cultural-content/route.js`**: Provides cultural content and information.
- **`generate-image/route.js`**: Uses Google Gemini AI to generate images based on cultural prompts, supporting optional base64 image input.
- **`generate-quiz/route.js`**: Creates cultural quiz questions.
- **`generate-recipe/route.js`**: Generates Nigerian recipe recommendations.
- **`hero-content/route.js`**: Dynamically generates hero section content.
- **`historical-content/route.js`**: Provides historical information and timelines.
- **`music-recommendations/route.js`**: Generates music playlists and recommendations.
- **`news/route.js`**: Fetches and aggregates news articles.
- **`reviews/route.js`**: Handles visitor reviews and ratings.
- **`translate/route.js`**: Translates text between multiple languages including Hausa, Yoruba, Igbo, and others using Google Gemini AI.
- **`travel-recommendations/route.js`**: Generates personalized travel recommendations based on duration, interests, budget, and group size.
- **`visitors/route.js`**: Manages visitor data and interactions.

**Route Pages:**
- **`FAQ/page.tsx`**: Dedicated FAQ page with expandable questions about Nigerian culture, history, travel, and general information.
- **`History/page.tsx`**: History page featuring timeline, tourist attractions, cultural highlights, and embedded Google Maps.
- **`News/page.tsx`**: News page that renders the NewsAggregator component.

##### Components Directory

React components organized by functionality:

**Core UI Components:**
- **`Header.tsx`**: Navigation header with logo, menu items (Home, News, History, AI Chat, FAQs, Support), theme toggle, and mobile-responsive hamburger menu.
- **`Footer.tsx`**: Site footer (structure not detailed in read files).
- **`Hero.tsx`**: Main hero section with dynamic title/description from API, independence day counter, animated flag, and national anthem player.

**Content Components:**
- **`About.tsx`**: About section with AI-generated content about Nigeria, featuring refresh functionality.
- **`CultureSection.tsx`**: Cultural content display (structure not detailed).
- **`HistorySection.tsx`**: Historical content presentation (structure not detailed).
- **`Info.jsx`**: Information component (JavaScript file, structure not detailed).

**Interactive Features:**
- **`ChatBot.tsx`**: AI-powered chat interface for cultural questions, with message history and real-time responses.
- **`CulturalQuiz.tsx`**: Interactive quiz component for testing cultural knowledge.
- **`ImageGenerator.tsx`**: AI image generation tool with cultural prompt suggestions, optional image upload, and download functionality.
- **`LanguageTranslator.tsx`**: Translation interface for multiple Nigerian languages.
- **`MusicRecommendations.tsx`**: Music playlist and recommendation display.
- **`NewsAggregator.tsx`**: News article aggregation and display.
- **`RecipeGenerator.tsx`**: Nigerian recipe generation and display.
- **`TravelRecommendations.tsx`**: Travel destination recommendations.
- **`TravelSection.tsx`**: Travel content section.
- **`VirtualTours.tsx`**: Virtual tour experiences.
- **`VisitorPopup.tsx`**: Visitor interaction modal.
- **`ReviewModal.tsx`**: Review submission interface.

##### Other Subdirectories

**`lib/` Directory:**
- **`mongodb.js`**: MongoDB connection utility with caching to prevent connection exhaustion during development hot reloads.

**`models/` Directory:**
- **`Visitor.js`**: Mongoose schema for visitor data including name, country, interests, chat history, and timestamps. Includes Review sub-schema for visitor feedback.

**`types/` Directory:**
- **`index.ts`**: Comprehensive TypeScript interfaces for API responses including AboutContent, QuizQuestion, HistoryEvent, MusicRecommendation, NewsArticle, Recipe, TravelDestination, VirtualTour, TranslationResponse, ChatMessage, CulturalContent, and HeroContent.

**`contexts/` Directory:**
- **`ThemeContext.tsx`**: React context for theme management (light/dark mode) with localStorage persistence, system preference detection, and cookie setting for SSR compatibility.

#### Project Overview

This is a comprehensive Next.js 15 React application focused on Nigerian culture and heritage. Built with TypeScript, Tailwind CSS, and MongoDB, it features:

- **AI-Powered Features**: Extensive use of Google Gemini AI for content generation, image creation, translations, and chat interactions.
- **Cultural Education**: Interactive components for learning about Nigerian history, culture, food, music, and traditions.
- **Modern UI/UX**: Responsive design with dark/light theme support, smooth animations, and mobile-first approach.
- **Data Management**: MongoDB integration for visitor tracking, reviews, and chat history.
- **Multimedia**: Support for images, audio (national anthem), and interactive virtual tours.

The application serves as an immersive platform for discovering and learning about Nigeria's rich cultural heritage through modern web technologies and AI assistance.
