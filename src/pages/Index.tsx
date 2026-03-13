const Index = () => {
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
        <a
          href="/coding-girlz.html"
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #e040fb, #00e5ff)",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "1rem",
            transition: "transform 0.2s",
          }}
        >
          🏆 Team Builder
        </a>
        <a
          href="/coding-girlz-competenze.html"
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #c9a96e, #5b9cf6)",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "1rem",
            transition: "transform 0.2s",
          }}
        >
          📊 Competenze Pre/Post
        </a>
      </div>
    </div>
  );
};

export default Index;
