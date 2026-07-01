\# SafeX Solutions — AI FAQ Assistant



A retrieval-grounded FAQ chatbot for SafeX Solutions, built with Node.js, Express, and Groq (LLaMA 3.3 70B). Answers are generated only from real SafeX Solutions website content (About, Mission, Services, Contact) — never invented.



Built as an internship AI/ML prototype task, documented as a full case study in `SafeX\_Case\_Study.docx`.



\## Live demo



Runs locally at `http://localhost:3000`. Not yet deployed to a public host.



\## Setup



```bash

npm install

```



Create a `.env` file in the project root:

GROQ\_API\_KEY=your\_groq\_api\_key\_here



PORT=3000



\## Run



```bash

node server.js

```



Then open `http://localhost:3000` in a browser.



\## How it works



1\. User submits a question in the browser.

2\. The frontend POSTs it to `/api/ask`.

3\. The backend tokenizes the question and scores it against knowledge base chunks via keyword overlap (retrieval-augmented generation).

4\. The top 2–3 relevant chunks are inserted into a system prompt.

5\. Groq (LLaMA 3.3 70B) generates an answer using only that context — explicitly instructed not to invent facts not present in the context.

6\. The answer and its source topics are returned and displayed, with a "Grounded in: ..." tag for transparency.



\## Project structure

safex-faq-bot/



├── server.js              Express server, /api/ask route, retrieval logic



├── package.json



├── .env                    GROQ\_API\_KEY (create this yourself, gitignored)



├── .gitignore



├── data/



│   └── knowledge\_base.js   SafeX content chunks, sourced from safexsolutions.com



├── public/



│   ├── index.html          Chat UI markup



│   ├── style.css           SafeX-matched white/blue styling



│   └── app.js              Frontend logic, calls /api/ask



└── SafeX\_Case\_Study.docx  Full write-up: approach, architecture, results, limitations



\## Guardrails



The assistant is instructed to answer only from its knowledge base and to decline rather than guess when a question falls outside it — verified against both in-domain edge cases (e.g. pricing, which SafeX doesn't publish) and out-of-domain questions entirely unrelated to SafeX. Details and screenshots in the case study.



\## Author



Zarman Sattar (FA23-BAI-053), BS Artificial Intelligence, COMSATS University Islamabad.

