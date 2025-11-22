import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FB_DB_URL
  });
}

const db = admin.database();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imie, nazwisko, email, telefon, miasto, data } = req.body;

    if (!imie || !nazwisko || !email || !telefon || !miasto || !data) {
      return res.status(400).json({ error: "Brak wymaganych danych" });
    }

    await db.ref("zapisy/").push({ imie, nazwisko, email, telefon, miasto, data });
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Firebase error:", err);
    return res.status(500).json({ error: err.message });
  }
}
