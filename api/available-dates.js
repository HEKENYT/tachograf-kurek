// import admin from "firebase-admin";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       type: process.env.FIREBASE_TYPE,
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//       private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//       client_id: process.env.FIREBASE_CLIENT_ID,
//       auth_uri: process.env.FIREBASE_AUTH_URI,
//       token_uri: process.env.FIREBASE_TOKEN_URI,
//       auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
//       client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT
//     }),
//     databaseURL: process.env.FIREBASE_DB_URL
//   });
// }

// const db = admin.database();

// function generujDaty(miesiac) {
//   const [rok, m] = miesiac.split('-').map(Number);
//   const daty = [];
//   const dzis = new Date();

//   let d = new Date(rok, m - 1, 1);
//   while (d.getDay() !== 6) d.setDate(d.getDate() + 1); // 6 = sobota

//   while (d.getMonth() === m - 1) {
//     if (d >= dzis) {
//       const dzien = String(d.getDate()).padStart(2, '0');
//       const miesiacL = String(d.getMonth() + 1).padStart(2, '0');
//       const rokL = d.getFullYear();
//       daty.push(`${rokL}-${miesiacL}-${dzien}`);
//     }
//     d.setDate(d.getDate() + 7);
//   }

//   return daty;
// }

// export default async function handler(req, res) {
//   if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

//   try {
//     const { miasto, miesiac } = req.query;
//     const wszystkieDaty = generujDaty(miesiac);

//     const snapshot = await db.ref("zapisy")
//       .orderByChild("miasto")
//       .equalTo(miasto)
//       .once("value");

//     const zapisy = snapshot.val() || {};
//     const zajeteDaty = Object.values(zapisy).map(z => z.data);

//     const dostepne = wszystkieDaty.filter(d => !zajeteDaty.includes(d));
//     res.status(200).json({ daty: dostepne });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// }
