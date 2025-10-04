import { useState } from "react";
import { Bus } from "../types/bus";
import { getBus } from "../api/buses";
import styles from "../App.module.css";

export default function SearchById({
                                       onFound,
                                       onClear,
                                   }: {
    onFound: (b: Bus) => void;
    onClear?: () => void;
}) {
    const [searchId, setSearchId] = useState<string>("");
    const [err, setErr] = useState("");

    const search = async () => {
        setErr("");
        const idNum = Number(searchId);
        if (!searchId || Number.isNaN(idNum) || idNum < 1) {
            setErr("Ingresa un ID válido (>=1).");
            return;
        }
        try {
            const bus = await getBus(idNum);
            onFound(bus);
        } catch (e: any) {
            setErr(e.message ?? "No encontrado");
        }
    };

    const clear = () => {
        setSearchId("");
        setErr("");
        onClear?.();     // ⬅️ avisa al padre para ocultar el resultado
    };

    return (
        <section className={styles.card}>
            <h2 className={styles.title}>Buscar por ID</h2>
            <div className={styles.row}>
                <input
                    className={styles.input}
                    type="number" min={1}
                    placeholder="ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                />
                <button className={styles.button} onClick={search}>Buscar</button>
                <button className={styles.buttonGhost} onClick={clear}>Limpiar</button>
                {err && <span className={styles.feedbackErr}>{err}</span>}
            </div>
        </section>
    );
}
