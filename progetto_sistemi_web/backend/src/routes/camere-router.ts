import express, { Request, Response } from "express";
import { db } from "../app";

const router = express.Router();

router.get("/camere", (req: Request, res: Response) => {
    // Usiamo il nome esatto della tua tabella: DettagliCamera
    const query = "SELECT * FROM DettagliCamera";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Errore query:", err);
            return res.status(500).json({ error: "Errore database" });
        }
        res.json(results); // Restituisce l'array di camere al frontend
    });
});

export default router;