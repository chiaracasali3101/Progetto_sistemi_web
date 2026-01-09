import express, { Express } from "express";
import mysql from "mysql2"; 

import camereRouter from "./routes/camere-router";
import prenotazioniRouter from "./routes/prenotazioni-router";
import loginRouter from "./routes/login-router";
import recensioniRouter from "./routes/recensioni-router";

const app: Express = express();
const port: number = 3000;

// --- 1. MIDDLEWARE PER I DATI ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. ROTTE API ---
app.use("/api", camereRouter);       
app.use("/api", prenotazioniRouter); 
app.use("/api", loginRouter);        
app.use("/api", recensioniRouter);

// --- 3. GESTIONE FILE STATICI ---
app.use(express.static("public")); 

// --- 4. CONNESSIONE DATABASE (Versione ROBUSTA con Pool) ---
// Il pool gestisce le riconnessioni automaticamente se il DB cade o va in timeout
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "Hotel",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testiamo la connessione all'avvio
db.getConnection((err, connection) => {
  if (err) {
    console.error("ERRORE CRITICO: Impossibile collegarsi a MySQL via XAMPP:", err.message);
    console.log("Assicurati che XAMPP sia aperto e che MySQL sia RUNNING (verde).");
    return;
  }
  console.log("✅ Connessione al database 'Hotel' stabilita con successo!");
  connection.release(); // Rilasciamo la connessione di test nel pool
});

// --- 5. AVVIO SERVER ---
app.listen(port, () => {
  console.log(`🚀 Server Backend attivo su http://localhost:${port}`);
});