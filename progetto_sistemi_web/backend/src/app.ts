import express, { Express } from "express";
import mysql from "mysql2"; 
// In Caso A, historyApiFallback non serve al backend perché se ne occupa Vite
// import historyApiFallback from "connect-history-api-fallback"; 

import camereRouter from "./routes/camere-router";
import prenotazioniRouter from "./routes/prenotazioni-router";
import loginRouter from "./routes/login-router";
import recensioniRouter from "./routes/recensioni-router";

const app: Express = express();
const port: number = 3000;

// --- 1. MIDDLEWARE PER I DATI (Fondamentali) ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- 2. ROTTE API (Il cuore del tuo backend) ---
// Queste funzioneranno perché il frontend le chiamerà tramite il proxy
app.use("/api", camereRouter);       
app.use("/api", prenotazioniRouter); 
app.use("/api", loginRouter);        
app.use("/api", recensioniRouter);

// --- 3. GESTIONE FILE (Solo cartella public) ---
// Commentiamo il fallback e la cartella dist perché non le stai usando
app.use(express.static("public")); 
// app.use(historyApiFallback()); 
// app.use(express.static("dist-frontend")); 

// --- 4. CONNESSIONE DATABASE ---
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Hotel" 
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database Hotel:", err);
    return;
  }
  console.log("Connesso al database 'Hotel' con successo!");
});

// --- 5. AVVIO SERVER ---
app.listen(port, () => {
  console.log(`Server Backend attivo su http://localhost:${port}`);
});