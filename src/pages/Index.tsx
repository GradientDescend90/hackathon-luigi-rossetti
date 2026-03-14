import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const pages = [
  { id: "teams", label: "🏆 Spirito di Squadra", src: "/coding-girlz.html", gradient: "linear-gradient(135deg, #e040fb, #00e5ff)" },
  { id: "competenze", label: "📊 Risultati", src: "/coding-girlz-competenze.html", gradient: "linear-gradient(135deg, #c9a96e, #5b9cf6)" },
];

const FloatingOrb = ({ color, size, x, y, duration }: { color: string; size: number; x: string; y: string; duration: number }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
      left: x,
      top: y,
      filter: "blur(40px)",
      pointerEvents: "none",
    }}
    animate={{
      y: [0, -30, 0, 30, 0],
      x: [0, 20, 0, -20, 0],
      scale: [1, 1.15, 1, 0.9, 1],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  />
);

const GridLines = () => (
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  }} />
);

const Footer = () => (
  <div style={{
    position: "absolute",
    bottom: "1.2rem",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#484644",
    fontSize: "0.75rem",
    fontWeight: 300,
    letterSpacing: "0.05em",
    zIndex: 1,
  }}>
    © Luigi Rossetti 2026 — All rights reserved
  </div>
);

const Index = () => {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!active) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#06060b",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>
        <GridLines />
        <FloatingOrb color="#e040fb" size={400} x="10%" y="20%" duration={8} />
        <FloatingOrb color="#00e5ff" size={350} x="70%" y="10%" duration={10} />
        <FloatingOrb color="#ffea00" size={300} x="50%" y="65%" duration={12} />
        <FloatingOrb color="#69ff47" size={250} x="20%" y="70%" duration={9} />

        <motion.div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(224,64,251,0.3), transparent)",
            pointerEvents: "none",
          }}
          animate={{ top: ["-5%", "105%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e040fb",
              border: "1px solid rgba(224,64,251,0.4)",
              borderRadius: "100px",
              padding: "0.35rem 1.2rem",
              marginBottom: "1.5rem",
            }}
            animate={{ boxShadow: ["0 0 0 0 rgba(224,64,251,0.4)", "0 0 0 10px rgba(224,64,251,0)", "0 0 0 0 rgba(224,64,251,0.4)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Hackathon 2026
          </motion.div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e040fb 0%, #00e5ff 40%, #ffea00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.05,
            marginBottom: "0.5rem",
          }}>
            Coding Girlz
          </h1>

          <p style={{
            color: "#9a98a0",
            fontSize: "1.15rem",
            fontStyle: "italic",
            fontWeight: 300,
            marginBottom: "2.5rem",
            letterSpacing: "0.02em",
          }}>
            I dati siamo noi
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {pages.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={() => setActive(p.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                style={{
                  padding: "1rem 2.2rem",
                  borderRadius: "14px",
                  background: p.gradient,
                  color: "#fff",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <Footer />
      </div>
    );
  }

  const activePage = pages.find((p) => p.id === active)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0a0a12" }}>
      <nav style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.6rem 1rem",
        background: "linear-gradient(180deg, #12121e 0%, #0e0e18 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        flexShrink: 0,
        backdropFilter: "blur(12px)",
      }}>
        <button
          onClick={() => setActive(null)}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#c0bfca",
            borderRadius: "8px",
            padding: "0.45rem 0.9rem",
            cursor: "pointer",
            fontSize: "0.82rem",
            fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
            marginRight: "0.3rem",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#c0bfca"; }}
        >
          ← Home
        </button>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 0.3rem" }} />
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={{
              background: active === p.id ? "rgba(255,255,255,0.08)" : "none",
              border: active === p.id ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
              color: active === p.id ? "#fff" : "#6a6878",
              borderRadius: "8px",
              padding: "0.45rem 1rem",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: active === p.id ? 600 : 400,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (active !== p.id) e.currentTarget.style.color = "#aaa"; }}
            onMouseLeave={e => { if (active !== p.id) e.currentTarget.style.color = "#6a6878"; }}
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
