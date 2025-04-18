import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Serve static files (index.html, css, js)

const serpApiKey = "05acd82939bbc8ab76c388441669c0d0ad9e92aa7aeb714223a36d488a4e1ac3";

app.get("/search/:query", async (req, res) => {
  const searchQuery = req.params.query;
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&engine=google_shopping&api_key=${serpApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = data.shopping_results?.map((item) => {
      const price =
        item.price ||
        item.extracted_price ||
        item.price_text ||
        "N/A";

      return {
        title: item.title,
        price: typeof price === "number" ? `$${price}` : price,
        thumbnail: item.thumbnail,
        link: item.link || item.product_link || item.source || null,
      };
    }) || [];

    res.json({ products: results });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
