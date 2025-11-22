import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID
};

// Upewnij się, że Firebase nie inicjalizuje się wielokrotnie
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (err) {
  // jeśli już zainicjalizowane, użyj istniejącej instancji
  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imie, nazwisko, email, telefon, miasto, data } = req.body;

    if (!imie || !nazwisko || !email || !telefon || !miasto || !data) {
      return res.status(400).json({ error: "Brak wymaganych danych" });
    }

    await push(ref(db, "zapisy/"), { imie, nazwisko, email, telefon, miasto, data });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Błąd Firebase:", err);
    return res.status(500).json({ error: err.message });
  }
}
