async function searchProduct() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "🔍 Searching...";

  const response = await fetch(`/search/${encodeURIComponent(query)}`);
  const data = await response.json();

  resultsDiv.innerHTML = "";

  if (data.products.length === 0) {
    resultsDiv.innerHTML = "❌ No products found.";
    return;
  }

  data.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const title = document.createElement("h2");
    title.textContent = product.title;
    card.appendChild(title);

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    card.appendChild(img);

    const buyLink = document.createElement("a");
    buyLink.href = product.link;
    buyLink.textContent = "🛒 Buy Now";
    buyLink.target = "_blank";
    buyLink.className = "buy-button";
    card.appendChild(buyLink);

    resultsDiv.appendChild(card);
  });
}
