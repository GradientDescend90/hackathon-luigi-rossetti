import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Participant = {
  id: string;
  name: string;
  created_at: string;
};

const Participants = () => {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial participants
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from("participants")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setParticipants(data);
    };
    fetchParticipants();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("participants-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "participants" },
        (payload) => {
          setParticipants((prev) => [...prev, payload.new as Participant]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleJoin = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    await supabase.from("participants").insert({ name: trimmed });
    setName("");
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06060b",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 480, textAlign: "center" }}
      >
        <a
          href="/"
          style={{
            color: "#6a6878",
            fontSize: "0.82rem",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "1.5rem",
          }}
        >
          ← Home
        </a>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e040fb, #00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          Partecipanti
        </h1>
        <p style={{ color: "#6a6878", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Inserisci il tuo nome per unirti all'hackathon
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            placeholder="Il tuo nome..."
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              fontSize: "0.95rem",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleJoin}
            disabled={loading || !name.trim()}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #e040fb, #00e5ff)",
              color: "#fff",
              fontWeight: 700,
              border: "none",
              cursor: loading || !name.trim() ? "not-allowed" : "pointer",
              opacity: loading || !name.trim() ? 0.5 : 1,
              fontSize: "0.95rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {loading ? "..." : "Join"}
          </motion.button>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
              padding: "0 0.5rem",
            }}
          >
            <span style={{ color: "#9a98a0", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Partecipanti
            </span>
            <span
              style={{
                background: "rgba(224,64,251,0.15)",
                color: "#e040fb",
                fontSize: "0.75rem",
                fontWeight: 700,
                borderRadius: "100px",
                padding: "0.2rem 0.7rem",
              }}
            >
              {participants.length}
            </span>
          </div>

          {participants.length === 0 ? (
            <p style={{ color: "#484644", fontSize: "0.85rem", padding: "1rem 0" }}>
              Nessun partecipante ancora. Sii il primo!
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <AnimatePresence>
                {participants.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.6rem 0.5rem",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: `hsl(${(i * 47) % 360}, 70%, 55%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </span>
                    <span style={{ color: "#e0dfe4", fontSize: "0.9rem" }}>{p.name}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        <div
          style={{
            marginTop: "3rem",
            color: "#484644",
            fontSize: "0.75rem",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          © Luigi Rossetti 2026 — All rights reserved
        </div>
      </motion.div>
    </div>
  );
};

export default Participants;
