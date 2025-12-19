import express, { Request, Response } from "express";
import { db } from "../app"; // Importa la connessione 'db' esportata da app.ts

const router = express.Router();

// Questa rotta gestisce il salvataggio delle prenotazioni
router.post("/prenotazioni", (req: Request, res: Response) => {
    // Recuperiamo i dati inviati dal frontend (axios.post)
    const { id_utente, id_camera, data_inizio, data_fine } = req.body;

    // Query SQL per inserire i dati nella tabella 'prenotazioni'
    // Assicurati che i nomi delle colonne nel DB siano identici (id_utente, id_camera, ecc.)
    const sql = "INSERT INTO prenotazioni (id_utente, id_camera, data_inizio, data_fine) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [id_utente, id_camera, data_inizio, data_fine], (err, result) => {
        if (err) {
            console.error("Errore nell'inserimento della prenotazione:", err);
            return res.status(500).json({ success: false, message: "Errore interno del server" });
        }
        
        // Se tutto va bene, rispondiamo con successo
        res.json({ success: true, message: "Prenotazione registrata con successo!" });
    });
});

// Questa riga è FONDAMENTALE per togliere l'errore rosso in app.ts
export default router;