import { Bus } from "../types/bus";
import styles from "../App.module.css";

export default function BusTable({ buses, highlightId }: { buses: Bus[]; highlightId?: number | null }) {
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
            <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Número</th>
                <th className={styles.th}>Placa</th>
                <th className={styles.th}>Marca</th>
                <th className={styles.th}>Estado</th>
                <th className={styles.th}>Descripción</th>
                <th className={styles.th}>Fecha creación</th>
            </tr>
            </thead>
            <tbody>
            {buses.map((b) => (
                <tr key={b.id} className={highlightId === b.id ? styles.highlight : undefined}>
                    <td className={styles.td}>{b.id}</td>
                    <td className={styles.td}>{b.numeroBus}</td>
                    <td className={styles.td}>{b.placa}</td>
                    <td className={styles.td}>{b.marcaBuses}</td>
                    <td className={styles.td}>{b.estado ? "Activo" : "Inactivo"}</td>
                    <td className={styles.td}>{b.descripcion ?? "-"}</td>
                    <td className={styles.td}>{new Date(b.fechaCreacion).toLocaleString()}</td>
                </tr>
            ))}
            {buses.length === 0 && (
                <tr><td className={styles.td} colSpan={7} style={{ textAlign: "center" }}>Sin datos</td></tr>
            )}
            </tbody>
        </table>
    );
}
