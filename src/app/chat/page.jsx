"use client";

import React, { useState, useRef, useEffect } from "react";

const SUGGESTED_QUESTIONS = [
  "How do I choose the right sofa size?",
  "What's the best wood for dining tables?",
  "How do I price my used furniture to sell?",
  "Tips for a Scandinavian style living room?",
];

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const userMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error connecting to assistant. Please try again.",
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Jost:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f5f0eb;
          font-family: 'Jost', sans-serif;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 820px;
          margin: 0 auto;
          background: #fdfaf7;
          box-shadow: 0 0 80px rgba(101, 67, 33, 0.1);
        }

        /* HEADER */
        .header {
          background: linear-gradient(135deg, #3b2a1a 0%, #6b4423 55%, #8b5e3c 100%);
          padding: 20px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: -40px; right: -20px;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }

        .header::after {
          content: '';
          position: absolute;
          bottom: -25px; left: 35%;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: rgba(255,220,180,0.06);
        }

        .header-icon {
          width: 50px; height: 50px;
          background: rgba(255,255,255,0.12);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px;
          border: 1px solid rgba(255,255,255,0.18);
          flex-shrink: 0;
        }

        .header-text h1 {
          font-family: 'Playfair Display', serif;
          font-size: 21px;
          color: #fff8f0;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .header-text p {
          font-size: 12px;
          color: rgba(255,240,220,0.6);
          margin-top: 3px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .header-badges {
          margin-left: auto;
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .badge.buy {
          background: rgba(255,255,255,0.15);
          color: #ffe0b2;
          border: 1px solid rgba(255,200,140,0.3);
        }

        .badge.sell {
          background: rgba(76,175,80,0.25);
          color: #a5d6a7;
          border: 1px solid rgba(76,175,80,0.3);
        }

        /* CHAT AREA */
        .chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .chat-area::-webkit-scrollbar { width: 4px; }
        .chat-area::-webkit-scrollbar-track { background: transparent; }
        .chat-area::-webkit-scrollbar-thumb { background: #d5c5b0; border-radius: 4px; }

        /* EMPTY STATE */
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          gap: 16px;
        }

        .empty-icon {
          font-size: 56px;
          line-height: 1;
          filter: drop-shadow(0 4px 12px rgba(101,67,33,0.2));
        }

        .empty-state h2 {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #3b2a1a;
          font-weight: 600;
        }

        .empty-state p {
          font-size: 14px;
          color: #8a7060;
          max-width: 360px;
          line-height: 1.7;
          font-weight: 300;
        }

        .category-pills {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-pill {
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 20px;
          background: #f0e8df;
          color: #6b4423;
          border: 1px solid #d5c0aa;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          justify-content: center;
          max-width: 540px;
          margin-top: 6px;
        }

        .suggestion-btn {
          background: white;
          border: 1.5px solid #d5c0aa;
          color: #4a3020;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          padding: 9px 16px;
          border-radius: 22px;
          cursor: pointer;
          transition: all 0.22s;
          font-weight: 400;
          box-shadow: 0 2px 6px rgba(101,67,33,0.08);
        }

        .suggestion-btn:hover {
          background: #6b4423;
          color: #fff8f0;
          border-color: #6b4423;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(101,67,33,0.22);
        }

        /* MESSAGES */
        .message-row {
          display: flex;
          margin-bottom: 14px;
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-row.user { justify-content: flex-end; }
        .message-row.assistant { justify-content: flex-start; }

        .avatar {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b2a1a, #6b4423);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          margin-right: 10px;
          margin-top: 2px;
          box-shadow: 0 2px 8px rgba(59,42,26,0.25);
        }

        .bubble {
          max-width: 72%;
          padding: 13px 17px;
          border-radius: 18px;
          font-size: 14.5px;
          line-height: 1.68;
          white-space: pre-wrap;
        }

        .bubble.user {
          background: linear-gradient(135deg, #3b2a1a, #6b4423);
          color: #fff8f0;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(59,42,26,0.22);
        }

        .bubble.assistant {
          background: white;
          color: #2c1f12;
          border-bottom-left-radius: 4px;
          border: 1px solid #e8ddd2;
          box-shadow: 0 2px 10px rgba(101,67,33,0.07);
        }

        /* TYPING */
        .typing-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          animation: fadeUp 0.3s ease;
        }

        .typing-bubble {
          background: white;
          border: 1px solid #e8ddd2;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          padding: 14px 18px;
          display: flex;
          gap: 5px;
          align-items: center;
          box-shadow: 0 2px 10px rgba(101,67,33,0.07);
        }

        .typing-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #8b5e3c;
          animation: typingBounce 1.2s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* INPUT AREA */
        .input-area {
          padding: 14px 22px 20px;
          background: #fdfaf7;
          border-top: 1px solid #e8ddd2;
          flex-shrink: 0;
        }

        .input-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .disclaimer {
          font-size: 11px;
          color: #b0957a;
          letter-spacing: 0.2px;
        }

        .powered {
          font-size: 10px;
          color: #c4aa92;
          letter-spacing: 0.3px;
        }

        .input-row {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          background: white;
          border: 1.5px solid #d5c0aa;
          border-radius: 16px;
          padding: 8px 8px 8px 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(101,67,33,0.06);
        }

        .input-row:focus-within {
          border-color: #6b4423;
          box-shadow: 0 0 0 3px rgba(107,68,35,0.1);
        }

        .input-row textarea {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: 'Jost', sans-serif;
          font-size: 14.5px;
          color: #2c1f12;
          resize: none;
          line-height: 1.5;
          max-height: 120px;
          padding: 4px 0;
        }

        .input-row textarea::placeholder { color: #c4aa92; }

        .send-btn {
          width: 42px; height: 42px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #3b2a1a, #6b4423);
          color: #fff8f0;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(59,42,26,0.3);
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59,42,26,0.35);
        }

        .send-btn:disabled {
          background: #d5c0aa;
          box-shadow: none;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .app { height: 100dvh; }
          .header { padding: 14px 16px; }
          .header-badges { display: none; }
          .chat-area { padding: 16px 14px; }
          .input-area { padding: 12px 14px 16px; }
          .bubble { max-width: 86%; font-size: 14px; }
          .header-text h1 { font-size: 18px; }
        }
      `}</style>

      <div className="app">
        {/* Header */}
        <div className="header">
          <div className="header-icon">🛋️</div>
          <div className="header-text">
            <h1>FurniBot</h1>
            <p>Your Furniture Buy & Sell Expert</p>
          </div>
          <div className="header-badges">
            <span className="badge buy">🛒 Buy</span>
            <span className="badge sell">💰 Sell</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {isEmpty ? (
            <div className="empty-state">
              <div className="empty-icon">🪑</div>
              <h2>Welcome to FurniBot</h2>
              <p>
                Ask me anything about buying, selling, or caring for furniture.
                I'll help you find the perfect piece or get the best price.
              </p>
              <div className="category-pills">
                <span className="category-pill">🛋️ Sofas</span>
                <span className="category-pill">🪞 Decor</span>
                <span className="category-pill">🛏️ Beds</span>
                <span className="category-pill">🪴 Outdoor</span>
                <span className="category-pill">📦 Selling Tips</span>
              </div>
              <div className="suggestions">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    className="suggestion-btn"
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.role}`}>
                  {msg.role === "assistant" && <div className="avatar">🛋️</div>}
                  <div className={`bubble ${msg.role}`}>{msg.content}</div>
                </div>
              ))}

              {loading && (
                <div className="typing-row">
                  <div className="avatar">🛋️</div>
                  <div className="typing-bubble">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-meta">
            <span className="disclaimer">
              🪵 Expert furniture advice · Buy smart, sell well
            </span>
            <span className="powered">Powered by Groq AI</span>
          </div>
          <div className="input-row">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask about furniture styles, pricing, materials..."
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              {loading ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
