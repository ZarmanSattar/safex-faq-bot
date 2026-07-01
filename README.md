# SafeX Solutions — AI FAQ Assistant

A retrieval-grounded chatbot that answers only from what SafeX actually publishes — never invented.

## Overview

Visitors to [safexsolutions.com](https://safexsolutions.com) have no way to interactively ask about services, mission, or contact info — they have to read through the site manually. This prototype closes that gap with a chatbot that:

- Answers **only** from real SafeX Solutions website content
- Openly declines to invent facts (like pricing) that aren't published
- Shows exactly which knowledge topics each answer was grounded in

Built as an internship AI/ML prototype task. Full write-up, architecture diagrams, and validation screenshots are in [`SafeX_Case_Study.docx`](./SafeX_Case_Study.docx).

## Features

| Feature | Description |
|---|---|
| Retrieval-augmented generation | Keyword-overlap retrieval selects relevant context before generation — no hallucinated answers |
| Groq / LLaMA 3.3 70B | Fast, low-temperature generation tuned for factual consistency |
| Honest fallback | Declines and redirects to `contact@safexsolutions.com` when a question falls outside its knowledge base |
| On-brand UI | White/blue interface matching SafeX's actual site design |
| Source transparency | Every answer is tagged with the knowledge topics it was grounded in |

## Setup

```bash
npm install
```

Create a `.env` file in the project root: