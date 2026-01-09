import express, { Request, Response } from "express";
import { db } from "../app"; 

const router = express.Router();

// --- 1. SALVATAGGIO PRENOTAZIONE ---
router.post("/prenotazioni", (req: Request, res: Response) => {
    // Usiamo i nomi che arrivano dal form Vue: idcamera, username, datainizio, datafine, ospiti
    const { idcamera, username, datainizio, datafine, ospiti } = req.body;

    const sql = "INSERT INTO prenotazioni (idcamera, username, datainizio, datafine, ospiti) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [idcamera, username, datainizio, datafine, ospiti], (err) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, message: "Prenotazione registrata!" });
    });
});

// --- 2. LETTURA PRENOTAZIONI (Filtrata) ---
router.get("/prenotazioni", (req: Request, res: Response) => {
    const { username, tipo } = req.query;

    let sql = "SELECT * FROM prenotazioni";
    let params: any[] = [];

    // Se è cliente, vede solo le sue. Se è dipendente, vede tutto.
    if (tipo === "cliente") {
        sql += " WHERE username = ?";
        params.push(username);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// --- 3. CANCELLAZIONE ---
router.delete("/prenotazioni/:id", (req: Request, res: Response) => {
    const sql = "DELETE FROM prenotazioni WHERE idprenotazione = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

export default router;