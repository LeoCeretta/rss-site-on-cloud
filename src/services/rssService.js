const axios = require("axios");
const RSSParser = require("rss-parser");
const parser = new RSSParser();
const { extractParagraphText, extractImageUrl } = require("../utils/formatUtils")



const fetchRSSData = async () => {
  try {
    const { data } = await axios.get("https://hugogloss.uol.com.br/feed/");
    const feed = await parser.parseString(data);

    // Verifique se feed.items existe e é um array
    if (!feed.items || !Array.isArray(feed.items)) {
      throw new Error("No RSS items found");
    }

    const newsItems = feed.items.map((news) => ({
      title: news.title,
      link: news.link,
      creator: news.creator,
      pubDate: news.pubDate,
      description: news.contentSnippet || news.content || news.description, // Pega todo tipo de descrição
      categories: news.categories || [], // Coloca as categorias em um array
      content: extractParagraphText(news["content:encoded"] || ""),
      image: extractImageUrl(news["content:encoded"] || ""), // Adiciona a imagem
    }));

    return newsItems;
  } catch (err) {
    console.error("Failed to fetch RSS data:", err.message);
    throw err;
  }
};


module.exports = { fetchRSSData };
