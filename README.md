# SEO Analyzer API

A lightweight backend service for analyzing SEO tags and performance metrics of any public URL. Built with **Node.js**, **Express**, and **jsdom** for parsing real-time HTML responses.

---

## 🔍 What It Does

- Fetches a given website's HTML
- Extracts SEO-relevant tags (title, meta description, canonical, OG, Twitter Card)
- Calculates basic SEO coverage and returns score
- Returns a JSON payload to the frontend

---

## 🚀 API Endpoint

### `GET /analyze?url=https://example.com`

**Query Parameter:**
- `url`: (required) the public website URL to analyze

**Example:**
```http
GET /analyze?url=https://vercel.com
```

**Sample Response:**
```json
{
  "url": "https://example.com",
  "score": 45,
  "essentialTags": { "found": 3, "total": 4 },
  "socialTags": { "found": 2, "total": 6 },
  "technicalTags": { "found": 2, "total": 3 },
  "issues": {
    "critical": [],
    "warnings": ["Missing canonical URL"],
    "suggestions": ["Use schema.org structured data"]
  },
  "metrics": {
    "seo": 45,
    "social": 0,
    "performance": 75
  },
  "analysis": {
    "title": "Example Title",
    "metaDescription": "Site description",
    "openGraph": "",
    "twitterCard": "summary"
  }
}
```

---

## 🧪 Running Locally

```bash
# Install dependencies
npm install

# Run the server
node src/index.js
```

Server will run at [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Support

```bash
# Build the image
docker build -t seo-analyzer-api .

# Run the container
docker run -p 3000:3000 seo-analyzer-api
```

---

## 🛠 Tech Stack

- [Express.js](https://expressjs.com/)
- [jsdom](https://github.com/jsdom/jsdom)
- [node-fetch](https://github.com/node-fetch/node-fetch)

---

## 📃 License

MIT © [Your Name](https://yourwebsite.com)