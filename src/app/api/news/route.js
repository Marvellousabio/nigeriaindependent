import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "all";
    const country = searchParams.get("country") || "ng";
    const apiKey = process.env.NEWS_API_KEY;

    let articles = [];

    // ✅ If API key exists, try fetching real news
    if (apiKey) {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}${
        category !== "all" ? `&category=${category}` : ""
      }&apiKey=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "ok" && data.articles?.length > 0) {
        articles = data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          image: article.urlToImage || "https://placehold.co/400x250?text=No+Image",
          publishedAt: article.publishedAt,
          source: article.source,
          category: category,
        }));
      }
    }

    // ✅ If no API key or no articles, use mock fallback data
    if (articles.length === 0) {
      articles = [
        {
          title: "Nigeria's Economy Shows Signs of Recovery",
          description:
            "Latest economic indicators suggest positive growth in key sectors including technology and agriculture.",
          content: "The Nigerian economy continues to show resilience despite global challenges...",
          url: "https://example.com/economy-recovery",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Economy+News",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "Business Day" },
          category: "economy",
        },
        {
          title: "Cultural Festival Celebrates Nigeria's Diversity",
          description:
            "Annual cultural festival brings together artists and performers from across the nation.",
          content:
            "The festival showcases traditional music, dance, and cuisine from Nigeria's 250+ ethnic groups...",
          url: "https://example.com/cultural-festival",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Cultural+Festival",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          source: { name: "The Guardian Nigeria" },
          category: "culture",
        },
        {
          title: "Tech Startups in Lagos Receive International Funding",
          description:
            "Nigerian tech entrepreneurs secure millions in venture capital for innovative solutions.",
          content: "The funding round highlights Nigeria's growing position as Africa's tech hub...",
          url: "https://example.com/tech-funding",
          image: "https://via.placeholder.com/400x250/22c55e/ffffff?text=Tech+Funding",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          source: { name: "TechCabal" },
          category: "technology",
        },
      ];
    }

    // ✅ Optional: filter by category
    const filteredArticles =
      category !== "all"
        ? articles.filter((a) => a.category === category)
        : articles;

    return NextResponse.json({
      articles: filteredArticles,
      totalResults: filteredArticles.length,
      source: apiKey && filteredArticles.length > 0 ? "live" : "fallback",
      category,
      country,
    });
  } catch (error) {
    console.error("❌ News API error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
