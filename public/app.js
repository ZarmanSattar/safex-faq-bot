const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const suggestionsEl = document.getElementById("suggestions");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function addMessage(role, text, sourceTag) {
  const row = document.createElement("div");
  row.className = "msg-row " + role;

  const avatar = document.createElement("div");
  avatar.className = "avatar " + role;
  avatar.textContent = role === "bot" ? "SX" : "You";
  avatar.style.fontSize = role === "bot" ? "11px" : "10px";

  const bubble = document.createElement("div");
  bubble.className = "bubble " + role;
  bubble.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");

  if (sourceTag) {
    const tag = document.createElement("span");
    tag.className = "source-tag";
    tag.textContent = "Grounded in: " + sourceTag;
    bubble.appendChild(tag);
  }

  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addTyping() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  row.id = "typingRow";

  const avatar = document.createElement("div");
  avatar.className = "avatar bot";
  avatar.textContent = "SX";
  avatar.style.fontSize = "11px";

  const bubble = document.createElement("div");
  bubble.className = "bubble bot";
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

  row.appendChild(avatar);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  const row = document.getElementById("typingRow");
  if (row) row.remove();
}

async function handleQuery(question) {
  addMessage("user", question);
  inputEl.value = "";
  sendBtn.disabled = true;
  addTyping();

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    removeTyping();

    if (!response.ok) {
      addMessage("bot", data.error || "Something went wrong. Please try again.");
      return;
    }

    addMessage("bot", data.answer, data.sources);
  } catch (err) {
    removeTyping();
    addMessage("bot", "Could not reach the server. Make sure the backend is running, or email contact@safexsolutions.com directly.");
    console.error("Frontend fetch error:", err);
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", () => {
  const q = inputEl.value.trim();
  if (q) handleQuery(q);
});

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = inputEl.value.trim();
    if (q) handleQuery(q);
  }
});

suggestionsEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("chip")) {
    handleQuery(e.target.dataset.q);
  }
});

addMessage("bot", "Hi! I'm the SafeX Solutions assistant. Ask me about our services, mission, or how to get in touch - I'll answer using what's actually published on our site.");