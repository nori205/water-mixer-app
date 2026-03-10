import { useState } from "react";

const PASSWORD = "ku-pu25";
const STORAGE_KEY = "nori_auth";

function NumInput({ label, value, onChange, unit, min, max, step = 1 }) {
  const [text, setText] = useState(String(value));

  const handleText = (e) => {
    setText(e.target.value);
    const n = parseFloat(e.target.value);
    if (!isNaN(n) && n >= min && n <= max) onChange(n);
  };

  const handleBlur = () => {
    const n = parseFloat(text);
    if (isNaN(n) || n < min) { onChange(min); setText(String(min)); }
    else if (n > max) { onChange(max); setText(String(max)); }
    else { setText(String(n)); }
  };

  const handleSlider = (e) => {
    const n = parseFloat(e.target.value);
    onChange(n);
    setText(String(n));
  };

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
          step={step}
          value={value}
          onChange={handleSlider}
          style={{ flex: 1, accentColor: "#e8d5a3", cursor: "pointer", height: "4px" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "90px", justifyContent: "flex-end" }}>
          <input
            type="number"
            value={text}
            onChange={handleText}
            onBlur={handleBlur}
            min={min}
            max={max}
            step={step}
            style={{
              width: "64px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(232,213,163,0.3)",
              borderRadius: "6px",
              color: "#e8d5a3",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "right",
              padding: "2px 6px",
              outline: "none",
            }}
          />
          <span style={{ color: "#a89060", fontSize: "13px" }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

function TotalInput({ label, value, onChange, min, max }) {
  const [text, setText] = useState(String(value));

  const handleText = (e) => {
    setText(e.target.value);
    const n = parseInt(e.target.value, 10);
    if (!isNaN(n) && n >= min && n <= max) onChange(n);
  };

  const handleBlur = () => {
    const n = parseInt(text, 10);
    if (isNaN(n) || n < min) { onChange(min); setText(String(min)); }
    else if (n > max) { onChange(max); setText(String(max)); }
    else { setText(String(n)); }
  };

  const handleSlider = (e) => {
    const n = Number(e.target.value);
    onChange(n);
    setText(String(n));
  };

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
          onChange={handleSlider}
          style={{ flex: 1, accentColor: "#e8d5a3", cursor: "pointer", height: "4px" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "90px", justifyContent: "flex-end" }}>
          <input
            type="number"
            value={text}
            onChange={handleText}
            onBlur={handleBlur}
            min={min}
            max={max}
            style={{
              width: "64px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(232,213,163,0.3)",
              borderRadius: "6px",
              color: "#e8d5a3",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "right",
              padding: "2px 6px",
              outline: "none",
            }}
          />
          <span style={{ color: "#a89060", fontSize: "13px" }}>g</span>
        </div>
      </div>
    </div>
  );
}

function PasswordScreen({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "ok");
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

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
      <div style={{ width: "100%", maxWidth: "360px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🍞</div>
        <h1 style={{ color: "#e8d5a3", fontSize: "20px", fontWeight: "normal", letterSpacing: "0.15em", margin: "0 0 6px 0" }}>
          のり米粉パン研究室
        </h1>
        <p style={{ color: "#6b8fa3", fontSize: "12px", letterSpacing: "0.08em", margin: "0 0 36px 0" }}>
          フォロワー限定ツール
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="パスワードを入力"
            autoComplete="current-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${error ? "rgba(255,80,80,0.6)" : "rgba(232,213,163,0.25)"}`,
              borderRadius: "10px",
              color: "#e8d5a3",
              fontSize: "16px",
              padding: "14px 16px",
              outline: "none",
              textAlign: "center",
              letterSpacing: "0.2em",
              marginBottom: "12px",
              transition: "border 0.2s",
            }}
          />
          {error && (
            <p style={{ color: "#e87070", fontSize: "13px", margin: "0 0 12px 0" }}>
              パスワードが違います
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "rgba(232,213,163,0.15)",
              border: "1px solid rgba(232,213,163,0.4)",
              borderRadius: "10px",
              color: "#e8d5a3",
              fontSize: "15px",
              padding: "14px",
              cursor: "pointer",
              letterSpacing: "0.1em",
            }}
          >
            入る
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "ok"
  );
  const [coldTemp, setColdTemp] = useState(20);
  const [hotTemp, setHotTemp] = useState(100);
  const [targetTemp, setTargetTemp] = useState(38);
  const [total, setTotal] = useState(150);

  if (!unlocked) {
    return <PasswordScreen onUnlock={() => setUnlocked(true)} />;
  }

  const isValid = targetTemp > coldTemp && targetTemp < hotTemp;

  let coldG = null;
  let hotG = null;

  if (isValid) {
    coldG = Math.round(total * (targetTemp - hotTemp) / (coldTemp - hotTemp));
    hotG = total - coldG;
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
          <h1 style={{ color: "#e8d5a3", fontSize: "24px", fontWeight: "normal", letterSpacing: "0.12em", margin: "0 0 4px 0" }}>
            ぬるま湯メーカー
          </h1>
          <p style={{ color: "#a89060", fontSize: "11px", letterSpacing: "0.1em", margin: "0 0 4px 0" }}>
            のり米粉パン研究室
          </p>
          <p style={{ color: "#6b8fa3", fontSize: "12px", letterSpacing: "0.08em", margin: 0 }}>
            水とお湯を混ぜる量を計算
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
          <TotalInput
            label="⚖️ 作りたい量"
            value={total}
            onChange={setTotal}
            min={1}
            max={2000}
          />
          <NumInput
            label="💧 今の水温（測ってね）"
            value={coldTemp}
            onChange={setColdTemp}
            unit="°C"
            min={1}
            max={40}
            step={0.1}
          />
          <NumInput
            label="♨️ お湯の温度（測ってね）"
            value={hotTemp}
            onChange={v => setHotTemp(Math.max(targetTemp + 1, v))}
            unit="°C"
            min={50}
            max={100}
          />
          <NumInput
            label="🎯 目標の温度"
            value={targetTemp}
            onChange={v => setTargetTemp(Math.min(hotTemp - 1, Math.max(coldTemp + 1, v)))}
            unit="°C"
            min={coldTemp + 1}
            max={hotTemp - 1}
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
              ⚠️ 目標温度は水温より高く、お湯の温度より低くしてください
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
                  <div style={{ color: "#cc9a6b", fontSize: "11px", letterSpacing: "0.08em", marginBottom: "8px" }}>お湯（{hotTemp}°C）</div>
                  <div style={{ color: "#e8b87a", fontSize: "36px", fontWeight: "bold", lineHeight: 1 }}>{hotG}</div>
                  <div style={{ color: "#a87840", fontSize: "13px", marginTop: "4px" }}>g</div>
                </div>
              </div>
              <div style={{ marginTop: "16px", textAlign: "center", color: "#4a6a7a", fontSize: "12px" }}>
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
