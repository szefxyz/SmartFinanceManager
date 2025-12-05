import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("Łączenie z backendem...");

  useEffect(() => {
    fetch("http://localhost:5092/") // <-- testowy GET
      .then((res) => res.text())
      .then((text) => setMessage(text))
      .catch((err) => setMessage("Błąd: " + err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Test połączenia Frontend → Backend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
