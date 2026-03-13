import { useState } from "react";

const pages = [
  { id: "teams", label: "🏆 Spirito di Squadra", src: "/coding-girlz.html" },
  { id: "competenze", label: "📊 Risultati", src: "/coding-girlz-competenze.html" },
];

const Index = () => {
  const [active, setActive] = useState<string | null>(null);

  if (!active) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0a0a12",
        fontFamily: "'DM Sans', sans-serif",
        gap: "1.5rem",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          background: "linear-gradient(135deg, #e040fb, #00e5ff, #ffea00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}>
          Coding Girlz
        </h1>
        <p style={{ color: "#7a7a9a", fontSize: "1.1rem" }}>Scegli la dashboard da visualizzare</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: "1rem 2rem",
                borderRadius: "12px",
                background: p.id === "teams"
                  ? "linear-gradient(135deg, #e040fb, #00e5ff)"
                  : "linear-gradient(135deg, #c9a96e, #5b9cf6)",
                color: "#fff",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const activePage = pages.find((p) => p.id === active)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0a0a12" }}>
      <nav style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        background: "#12121e",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        flexShrink: 0,
      }}>
        <button
          onClick={() => setActive(null)}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#f0eaff",
            borderRadius: "8px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          ← Home
        </button>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={{
              background: active === p.id ? "rgba(255,255,255,0.1)" : "none",
              border: active === p.id ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
              color: active === p.id ? "#fff" : "#7a7a9a",
              borderRadius: "8px",
              padding: "0.4rem 1rem",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            {p.label}
          </button>
        ))}
      </nav>
      <iframe
        src={activePage.src}
        title={activePage.label}
        style={{ flex: 1, width: "100%", border: "none", display: "block" }}
      />
    </div>
  );
};

export default Index;
