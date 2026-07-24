\# Work Log — SafeX FAQ Assistant



A running log of work sessions on this project. Commit hashes reference the actual GitHub history for verification.



\---



\## 01 Jul 2026 — Build, deploy, and document



Built and shipped the full prototype in one working session, covering:



\*\*Prototype\*\*

\- Designed a retrieval-augmented FAQ chatbot for SafeX Solutions, grounded in real content pulled from safexsolutions.com (About, Mission, Services, Contact)

\- Built a 10-chunk knowledge base (`data/knowledge\_base.js`) including the six core service categories from the homepage (Web Dev, Database Design, Software Dev, AI Dev, Cyber Security, Data Management)

\- Implemented keyword-overlap retrieval logic with a fallback path for out-of-scope questions

\- Built the backend as a Node.js + Express server (`server.js`) with a single `/api/ask` endpoint, using Groq (LLaMA 3.3 70B) for generation

\- Built the frontend (`public/index.html`, `style.css`, `app.js`) styled to match SafeX's real site — white background, navy header, blue accent



\*\*Validation\*\*

\- Verified retrieval accuracy against 7 representative test questions

\- Verified the live app correctly declines to invent pricing (not published by SafeX) and redirects to contact info

\- Verified the live app correctly recognizes fully off-topic questions and does not force an answer from the knowledge base



\*\*Documentation\*\*

\- Wrote a full case study (`SafeX\_Case\_Study.docx` / `.md`) covering problem framing, approach, architecture, retrieval validation, guardrail tests with screenshots, limitations, and next steps



\*\*Deployment\*\*

\- Restructured `server.js` to export the Express app (rather than only calling `app.listen()`) for serverless compatibility

\- Added `vercel.json` for routing config

\- Deployed live to Vercel: https://safex-faq-bot.vercel.app/



\*\*Repository\*\*

\- Initialized git, pushed initial commit with full project + case study

\- Built out `README.md` in three incremental passes: base info → architecture diagram (Mermaid) + guardrails → badges, live demo link, and final polish

\- Added deployment section and live demo badge to README after Vercel deploy



\*\*Commits this session:\*\*

| Commit | Description |

|---|---|

| `8120ae0` | Initial commit: SafeX FAQ assistant — Node/Express backend with Groq RAG, case study docs |

| `3a867d2` | docs: add base README with overview, features, and setup |

| `a371e74` | docs: add architecture diagram, flow explanation, and guardrails section |

| `d66c8a1` | docs: add badges, nav links, and final polish |

| `691ad50` | feat: add Vercel serverless support (export app, add vercel.json) |

| `a000d26` | docs: add live demo link, deployment section, and vercel.json to structure |

| `13e3caa` | docs: remove registration number from author line |



\---



