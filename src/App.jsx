import { useState } from "react";

const InputRow = ({ label, icon, value, onChange, unit, min, max, step = 1, isLast }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: isLast ? 0 : "20px",
    marginBottom: isLast ? 0 : "20px",
    borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
  }}>
    <span style={{ fontSize: "20px", width: "28px", textAlign: "center" }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ color: "#6b8fa3", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "6px" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ flex: 1, accentColor: "#e8d5a3", cursor: "pointer" }}
        />
        <div style={{
          color: "#e8d5a3",
          fontSize: "16px",
          fontWeight: "bold",
          minWidth: "80px",
          textAlign: "right",
        }}>
          {value.toLocaleString()} <span style={{ fontSize: "12px", color: "#a89060" }}>{unit}</span>
        </div>
      </div>
    </div>
  </div>
);

const StatBadge = ({ label, value, highlight }) => (
  <div style={{
    background: highlight ? "rgba(232,213,163,0.12)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${highlight ? "rgba(232,213,163,0.3)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "10px",
    padding: "10px 16px",
    minWidth: "110px",
  }}>
    <div style={{ color: "#6b8fa3", fontSize: "10px", letterSpacing: "0.1em", marginBottom: "4px" }}>{label}</div>
    <div style={{ color: highlight ? "#e8d5a3" : "#8aa0b0", fontSize: "15px", fontWeight: "bold" }}>{value}</div>
  </div>
);

export default function App() {
  const [coldTemp, setColdTemp] = useState(15);
  const [coldAmount, setColdAmount] = useState(1000);
  const [hotTemp, setHotTemp] = useState(100);
  const [targetTemp, setTargetTemp] = useState(42);

  const isValid = hotTemp > targetTemp && targetTemp > coldTemp;

  const hotAmount = isValid
    ? Math.round((coldAmount * (targetTemp - coldTemp)) / (hotTemp - targetTemp))
    : null;

  const totalAmount = hotAmount !== null ? coldAmount + hotAmount : null;

  const mixedTemp = hotAmount !== null
    ? Math.round((coldAmount * coldTemp + hotAmount * hotTemp) / (coldAmount + hotAmount))
    : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a1628 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
    }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🛁</div>
          <h1 style={{
            color: "#e8d5a3",
            fontSize: "28px",
            fontWeight: "normal",
            letterSpacing: "0.12em",
            margin: "0 0 6px 0",
          }}>お湯の計算</h1>
          <p style={{ color: "#6b8fa3", fontSize: "13px", letterSpacing: "0.1em", margin: 0 }}>
            水とお湯を混ぜる量を計算します
          </p>
        </div>

        {/* Inputs */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(232,213,163,0.15)",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "20px",
        }}>
          <InputRow label="水の温度" icon="🚰" value={coldTemp} onChange={setColdTemp} unit="°C" min={0} max={40} />
          <InputRow label="水の量" icon="💧" value={coldAmount} onChange={setColdAmount} unit="mL" min={100} max={10000} step={100} />
          <InputRow label="お湯の温度" icon="♨️" value={hotTemp} onChange={setHotTemp} unit="°C" min={41} max={100} />
          <InputRow label="目標温度" icon="🌡️" value={targetTemp} onChange={setTargetTemp} unit="°C" min={coldTemp + 1} max={hotTemp - 1} isLast />
        </div>

        {/* Result */}
        <div style={{
          background: isValid
            ? "linear-gradient(135deg, rgba(232,213,163,0.12), rgba(180,140,80,0.08))"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${isValid ? "rgba(232,213,163,0.35)" : "rgba(255,80,80,0.25)"}`,
          borderRadius: "16px",
          padding: "28px",
          textAlign: "center",
        }}>
          {!isValid ? (
            <p style={{ color: "#e87070", fontSize: "14px", margin: 0, letterSpacing: "0.05em" }}>
              ⚠️ 目標温度は水温より高く、お湯の温度より低くしてください
            </p>
          ) : (
            <>
              <p style={{ color: "#6b8fa3", fontSize: "12px", letterSpacing: "0.12em", margin: "0 0 16px 0" }}>
                必要なお湯の量
              </p>
              <div style={{ color: "#e8d5a3", fontSize: "56px", fontWeight: "bold", lineHeight: 1, marginBottom: "6px" }}>
                {hotAmount?.toLocaleString()}
              </div>
              <div style={{ color: "#a89060", fontSize: "18px", marginBottom: "24px" }}>mL</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <StatBadge label="合計" value={`${totalAmount?.toLocaleString()} mL`} />
                <StatBadge label="実際の温度" value={`${mixedTemp}°C`} highlight />
              </div>
            </>
          )}
        </div>

        <p style={{
          textAlign: "center",
          color: "#3a5568",
          fontSize: "11px",
          marginTop: "20px",
          letterSpacing: "0.05em",
        }}>
          熱量保存の法則に基づく計算
        </p>
      </div>
    </div>
  );
}
