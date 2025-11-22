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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imie, nazwisko, email, telefon, miasto, data } = req.body;

  if (!imie || !nazwisko || !email || !telefon || !miasto || !data) {
    return res.status(400).json({ error: "Brak wymaganych danych" });
  }

  try {
    await push(ref(db, "zapisy/"), {
      Imie: imie,
      Nazwisko: nazwisko,
      Email: email,
      Telefon: telefon,
      Miasto: miasto,
      Data: data
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
