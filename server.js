require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");
const cors = require("cors");
const path = require("path");
const SAFEX_KNOWLEDGE_BASE = require("./data/knowledge_base.js");

const app = express();
const PORT = process.env.PORT || 3000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Retrieval logic ---
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 2);
}

const STOPWORDS = new Set([
  "the", "and", "for", "are", "you", "your", "with", "that", "this",
  "have", "from", "what", "how", "does", "can", "who", "about", "offer", "provide"
]);

function retrieveTopChunks(query, k = 3) {
  const qTokens = tokenize(query).filter(w => !STOPWORDS.has(w));
  const scored = SAFEX_KNOWLEDGE_BASE.map(chunk => {
    const chunkTokens = tokenize(chunk.topic + " " + chunk.content);
    let score = 0;
    qTokens.forEach(qt => {
      chunkTokens.forEach(ct => {
        if (ct === qt) score += 2;
        else if (ct.includes(qt) || qt.includes(ct)) score += 0.5;
      });
    });
    return { chunk, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter(s => s.score > 0).slice(0, k);
  if (top.length === 0) return [SAFEX_KNOWLEDGE_BASE[0]];
  return top.map(s => s.chunk);
}

// --- API route ---
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const relevantChunks = retrieveTopChunks(question, 3);
    const contextText = relevantChunks.map(c => `[${c.topic}]\n${c.content}`).join("\n\n");
    const topicNames = relevantChunks.map(c => c.topic).join(", ");

    const systemPrompt = `You are the FAQ assistant for SafeX Solutions, a global technology and digital solutions company. Answer the user's question using ONLY the context below, which is drawn from SafeX's real website content. Keep answers conversational, concise (2-4 sentences typically), and specific. If the context does not contain the answer, say so honestly and suggest the user contact SafeX directly at contact@safexsolutions.com rather than making something up. Do not invent pricing, timelines, or specific policies that are not in the context.

CONTEXT:
${contextText}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      temperature: 0.3,
      max_tokens: 400
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "I wasn't able to generate a response. Please try again.";

    res.json({ answer, sources: topicNames });
  } catch (err) {
    console.error("Error calling Groq API:", err);
    res.status(500).json({ error: "Something went wrong reaching the assistant. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`SafeX FAQ bot server running at http://localhost:${PORT}`);
});