import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
   const category = searchParams.get("category") || "all";
    const country = searchParams.get("country") || "ng";

    const apiKey = process.env.NEWS_API_KEY; // Add your key in .env.local
    let articles=[];
    if (apiKey) {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}${
        category !== "all" ? `&category=${category}` : ""
      }&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();


    // In a real implementation, you would integrate with a news API like:
    // - NewsAPI.org
    // - Google News API
    // - Bing News API
    // - Or scrape from Nigerian news websites

    // For this demo, we'll return mock data
    // In production, replace this with actual API calls
 if (data.status === "ok" && data.articles?.length > 0) {
        articles = data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          image: article.urlToImage || "https://placehold.co/400x250?text=No+Image",
          publishedAt: article.publishedAt,
          source: article.source,
          category,
        }));
      } 
     if (articles.length === 0) {
      articles = [
        {
          title: "Nigeria's Economy Shows Signs of Recovery",
          description: "Latest economic indicators suggest positive growth in key sectors including technology and agriculture.",
          content: "The Nigerian economy continues to show resilience despite global challenges...",
          url: "https://example.com/economy-recovery",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Economy+News",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          source: { name: "Business Day" },
          category: "economy"
        },
        {
          title: "Cultural Festival Celebrates Nigeria's Diversity",
          description: "Annual cultural festival brings together artists and performers from across the nation.",
          content: "The festival showcases traditional music, dance, and cuisine from Nigeria's 250+ ethnic groups...",
          url: "https://example.com/cultural-festival",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Cultural+Festival",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          source: { name: "The Guardian Nigeria" },
          category: "culture"
        },
        {
          title: "Tech Startups in Lagos Receive International Funding",
          description: "Nigerian tech entrepreneurs secure millions in venture capital for innovative solutions.",
          content: "The funding round highlights Nigeria's growing position as Africa's tech hub...",
          url: "https://example.com/tech-funding",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Tech+Funding",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
          source: { name: "TechCabal" },
          category: "technology"
        },
        {
          title: "Super Eagles Prepare for International Tournament",
          description: "Nigeria's national football team intensifies training ahead of crucial matches.",
          content: "Coach and players are focused on qualifying for the upcoming tournament...",
          url: "https://example.com/super-eagles",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Football+News",
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
          source: { name: "Sports Day" },
          category: "sports"
        },
        {
          title: "President Addresses Nation on Key Policy Changes",
          description: "National address covers economic reforms and infrastructure development plans.",
          content: "The president outlined several initiatives aimed at improving living standards...",
          url: "https://example.com/presidential-address",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Politics+News",
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
          source: { name: "Vanguard" },
          category: "politics"
        },
        {
          title: "Oil Prices Stabilize After Recent Volatility",
          description: "Crude oil prices show signs of stabilization following market fluctuations.",
          content: "The stabilization comes as OPEC+ continues to monitor global supply and demand...",
          url: "https://example.com/oil-prices",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Oil+Prices",
          publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
          source: { name: "This Day" },
          category: "economy"
        }
      ]
    };

    // Filter by category if specified
    if (category !== 'all') {
      articles = articles.filter(article => article.category === category);
    }

    return NextResponse.json({
      articles,
      totalResults: articles.length,
      source: articles.length > 0 && apiKey ? "live" : "fallback",
      category,
      country
    });

  } 
}catch (error) {
    console.error("News API error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// Note: To implement real news aggregation, you would need to:
// 1. Sign up for a news API service (NewsAPI, Bing News, etc.)
// 2. Add API key to environment variables
// 3. Replace mock data with actual API calls
// 4. Implement proper error handling and rate limiting
// 5. Add news source filtering and search functionality