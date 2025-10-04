import { useState } from "react";
import { Bus, MarcaBuses } from "../types/bus";
import { createBus } from "../api/buses";
import styles from "../App.module.css";

export default function CreateBusForm({
                                          onCreated,
                                          onClose,
                                      }: {
    onCreated: (b: Bus) => void;
    onClose: () => void;
}) {
    const [numeroBus, setNumeroBus] = useState<number | "">("");
    const [placa, setPlaca] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [marcaBuses, setMarcaBuses] = useState<MarcaBuses>("Volvo");
    const [estado, setEstado] = useState(false);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});

    const validate = () => {
        if (numeroBus === "" || Number.isNaN(Number(numeroBus)) || Number(numeroBus) < 0) return "Número de bus inválido.";
        if (!placa.trim()) return "La placa es obligatoria.";
        return "";
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg({});
        const v = validate();
        if (v) { setMsg({ err: v }); return; }
        try {
            setBusy(true);
            const created = await createBus({
                numeroBus: Number(numeroBus),
                placa: placa.trim(),
                descripcion: descripcion.trim() || undefined,
                marcaBuses,
                estado,
            });
            setMsg({ ok: `Creado Bus #${created.id}` });
            onCreated(created);
            onClose();
        } catch (e: any) {
            setMsg({ err: e.message ?? "Error" });
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className={styles.grid}>
            <label>
                Número de bus
                <input
                    className={styles.input}
                    type="number"
                    min={0}
                    value={numeroBus}
                    onChange={(e) => setNumeroBus(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                />
            </label>
            <label>
                Placa
                <input
                    className={styles.input}
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    placeholder="ABC-123"
                    required
                />
            </label>
            <label>
                Marca
                <select className={styles.select} value={marcaBuses} onChange={(e) => setMarcaBuses(e.target.value)}>
                    <option value="Volvo">Volvo</option>
                    <option value="Scania">Scania</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Solaris">Solaris</option>
                </select>
            </label>
            <label>
                Estado
                <div className={styles.row}>
                    <input id="estadoChk" type="checkbox" checked={estado} onChange={(e) => setEstado(e.target.checked)} />
                    <label htmlFor="estadoChk">Activo</label>
                </div>
            </label>
            <label className={styles.full}>
                Descripción
                <input
                    className={styles.input}
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripción (opcional)"
                />
            </label>

            <div className={`${styles.full} ${styles.row}`}>
                <button className={styles.button} type="submit" disabled={busy}>
                    {busy ? "Creando..." : "Crear"}
                </button>
                <button className={styles.buttonGhost} type="button" onClick={onClose}>Cancelar</button>
                {msg.ok && <span className={styles.feedbackOk}>{msg.ok}</span>}
                {msg.err && <span className={styles.feedbackErr}>{msg.err}</span>}
            </div>
        </form>
    );
}
