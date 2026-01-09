import express, { Express } from "express";
import mysql from "mysql2"; 
import historyApiFallback from "connect-history-api-fallback";

// 1. Importa i router (assicurati che i file esistano in src/routes/)
// Se questi nomi sono rossi, verifica che nei file ci sia "export default router"
import camereRouter from "./routes/camere-router";
import prenotazioniRouter from "./routes/prenotazioni-router";
import loginRouter from "./routes/login-router";
import recensioniRouter from "./routes/recensioni-router";

const app: Express = express();
const port: number = 3000;

//per le recensioni
app.use(express.json());
app.use("/api", recensioniRouter);

//Configurazione Connessione Database
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

app.use(historyApiFallback());

//Middleware per il parsing dei dati JSON
// Necessario per leggere i dati inviati da Axios (Login e Prenotazioni)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotte API
// Devono stare PRIMA del historyApiFallback per non essere intercettate dal frontend
app.use("/api", recensioniRouter);
app.use("/api", camereRouter);       // Gestirà axios.get("/api/camere")
app.use("/api", prenotazioniRouter); // Gestirà axios.post("/api/prenotazioni")
app.use("/api", loginRouter);        // Gestirà axios.post("/api/login")

//Fallback per Single Page Application (Dopo le API!)
app.use(historyApiFallback());

//Servizio dei file statici
// Serve la cartella public (per le immagini) e dist-frontend (il sito compilato)
app.use(express.static("public"));
app.use(express.static("dist-frontend"));

//Gestione errore 404 per risorse mancanti
app.use(function(req, res, next) {
  res.status(404).send("Ops... La risorsa richiesta non è stata trovata sul server.");
});

//Avvio del Server
app.listen(port, function() {
  console.log(`Server Backend attivo su http://localhost:${port}`);
});