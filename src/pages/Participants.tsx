import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type Participant = {
  id: string;
  name: string;
  team: string;
  value: string;
  created_at: string;
};

const TEAMS = [
  { key: "ww", name: "Wonder Women", icon: "👑", color: "#e040fb" },
  { key: "cat", name: "Catwomen", icon: "🐱", color: "#00e5ff" },
  { key: "sg", name: "Supergirls", icon: "⚡", color: "#ffea00" },
  { key: "bw", name: "Black Widows", icon: "🕷️", color: "#69ff47" },
];

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("participants")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setParticipants(data);
    };
    fetch();

    const channel = supabase
      .channel("participants-page")
      .on("postgres_changes", { event: "*", schema: "public", table: "participants" }, () => {
        fetch();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const grouped = TEAMS.map((t) => ({
    ...t,
    members: participants.filter((p) => p.team === t.key),
  }));

  const total = participants.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#06060b",
      fontFamily: "'DM Sans', sans-serif",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none", border: "1px solid rgba(255,255,255,0.15)",
              color: "#6a6878", fontSize: "0.82rem", borderRadius: "8px",
              padding: "0.45rem 0.9rem", cursor: "pointer", marginBottom: "1.5rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ← Home
          </button>

          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900,
            background: "linear-gradient(135deg, #e040fb, #00e5ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "0.3rem",
          }}>
            Partecipanti Live
          </h1>
          <p style={{ color: "#6a6878", fontSize: "0.9rem", marginBottom: "2rem" }}>
            {total} partecipant{total === 1 ? "e" : "i"} registrat{total === 1 ? "a" : "e"} in tempo reale
          </p>
        </motion.div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem", marginBottom: "2rem",
        }}>
          {grouped.map((team, ti) => (
            <motion.div
              key={team.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ti * 0.1 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${team.color}22`,
                borderRadius: "16px",
                padding: "1.2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{team.icon}</span>
                <span style={{ color: team.color, fontWeight: 700, fontSize: "0.9rem" }}>{team.name}</span>
                <span style={{
                  marginLeft: "auto", background: `${team.color}22`, color: team.color,
                  fontSize: "0.7rem", fontWeight: 700, borderRadius: "100px", padding: "0.15rem 0.5rem",
                }}>
                  {team.members.length}
                </span>
              </div>

              {team.members.length === 0 ? (
                <p style={{ color: "#484644", fontSize: "0.78rem", fontStyle: "italic" }}>Nessun membro</p>
              ) : (
                <AnimatePresence>
                  {team.members.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.35rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontSize: "0.82rem",
                      }}
                    >
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: team.color, flexShrink: 0,
                      }} />
                      <span style={{ color: "#e0dfe4" }}>{m.name}</span>
                      <span style={{
                        marginLeft: "auto", color: "#6a6878", fontSize: "0.7rem",
                        background: "rgba(255,255,255,0.06)", borderRadius: "100px",
                        padding: "0.1rem 0.45rem",
                      }}>
                        {m.value}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", color: "#484644", fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.05em", marginTop: "3rem" }}>
          © Luigi Rossetti 2026 — All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Participants;
