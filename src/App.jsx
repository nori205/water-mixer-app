import { useState } from "react";

const HOT_TEMP = 100;

function NumInput({ label, value, onChange, unit, min, max }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", color: "#6b8fa3", fontSize: "12px", letterSpacing: "0.1em", marginBottom: "8px" }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#e8d5a3", cursor: "pointer", height: "4px" }}
        />
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", minWidth: "80px", justifyContent: "flex-end" }}>
          <span style={{ color: "#e8d5a3", fontSize: "22px", fontWeight: "bold" }}>{value}</span>
          <span style={{ color: "#a89060", fontSize: "13px" }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [coldTemp, setColdTemp] = useState(20);
  const [targetTemp, setTargetTemp] = useState(38);
  const [total, setTotal] = useState(150);

  const isValid = targetTemp > coldTemp && targetTemp < HOT_TEMP;

  let coldG = null;
  let hotG = null;

  if (isValid) {
    coldG = Math.round(total * (targetTemp - HOT_TEMP) / (coldTemp - HOT_TEMP));
    hotG = total - coldG;
    // clamp negatives just in case
    if (coldG < 0) coldG = 0;
    if (hotG < 0) hotG = 0;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1628 0%, #0d2137 60%, #0a1628 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "44px", marginBottom: "8px" }}>🌡️</div>
          <h1 style={{ color: "#e8d5a3", fontSize: "24px", fontWeight: "normal", letterSpacing: "0.12em", margin: "0 0 6px 0" }}>
            ぬるま湯メーカー
          </h1>
          <p style={{ color: "#6b8fa3", fontSize: "12px", letterSpacing: "0.08em", margin: 0 }}>
            水とわかしたてのお湯（100°C）を混ぜる量を計算
          </p>
        </div>

        {/* Inputs */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(232,213,163,0.15)",
          borderRadius: "16px",
          padding: "28px 28px 8px",
          marginBottom: "16px",
        }}>
          <NumInput
            label="💧 今の水温（測ってね）"
            value={coldTemp}
            onChange={setColdTemp}
            unit="°C"
            min={1}
            max={40}
          />
          <NumInput
            label="🎯 目標の温度"
            value={targetTemp}
            onChange={v => setTargetTemp(Math.min(99, Math.max(coldTemp + 1, v)))}
            unit="°C"
            min={coldTemp + 1}
            max={99}
          />
          <NumInput
            label="⚖️ 作りたい量"
            value={total}
            onChange={setTotal}
            unit="g"
            min={50}
            max={2000}
          />
        </div>

        {/* Result */}
        <div style={{
          background: isValid
            ? "linear-gradient(135deg, rgba(232,213,163,0.1), rgba(180,140,80,0.06))"
            : "rgba(255,80,80,0.05)",
          border: `1px solid ${isValid ? "rgba(232,213,163,0.35)" : "rgba(255,80,80,0.2)"}`,
          borderRadius: "16px",
          padding: "28px",
        }}>
          {!isValid ? (
            <p style={{ color: "#e87070", fontSize: "13px", textAlign: "center", margin: 0 }}>
              ⚠️ 目標温度は水温より高く、100°C未満にしてください
            </p>
          ) : (
            <>
              <p style={{ color: "#6b8fa3", fontSize: "11px", letterSpacing: "0.12em", textAlign: "center", margin: "0 0 20px 0" }}>
                こうやって混ぜてね
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{
                  flex: 1,
                  background: "rgba(100,160,220,0.1)",
                  border: "1px solid rgba(100,160,220,0.25)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>💧</div>
                  <div style={{ color: "#8ab4cc", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "8px" }}>水</div>
                  <div style={{ color: "#b0d4e8", fontSize: "36px", fontWeight: "bold", lineHeight: 1 }}>{coldG}</div>
                  <div style={{ color: "#6b8fa3", fontSize: "13px", marginTop: "4px" }}>g</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", color: "#6b8fa3", fontSize: "20px" }}>+</div>
                <div style={{
                  flex: 1,
                  background: "rgba(220,140,80,0.1)",
                  border: "1px solid rgba(220,140,80,0.25)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>♨️</div>
                  <div style={{ color: "#cc9a6b", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "8px" }}>お湯（100°C）</div>
                  <div style={{ color: "#e8b87a", fontSize: "36px", fontWeight: "bold", lineHeight: 1 }}>{hotG}</div>
                  <div style={{ color: "#a87840", fontSize: "13px", marginTop: "4px" }}>g</div>
                </div>
              </div>
              <div style={{
                marginTop: "16px",
                textAlign: "center",
                color: "#4a6a7a",
                fontSize: "12px",
              }}>
                合計 {total}g ／ 仕上がり約 {targetTemp}°C
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#2a3f50", fontSize: "11px", marginTop: "16px", letterSpacing: "0.05em" }}>
          熱量保存の法則による計算
        </p>
      </div>
    </div>
  );
}
