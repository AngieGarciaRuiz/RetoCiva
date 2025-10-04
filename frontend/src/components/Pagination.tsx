import styles from "../App.module.css"

export default function Pagination({
                                       page, size, totalPages, loading,
                                       onPrev, onNext, onChangeSize
                                   }: {
    page: number; size: number; totalPages: number; loading: boolean;
    onPrev: () => void; onNext: () => void; onChangeSize: (s: number) => void;
}) {
    return (
        <section className={styles.row}>
            <label>
                Tamaño:
                <select className={styles.select} value={size} onChange={(e) => onChangeSize(Number(e.target.value))} style={{ marginLeft: 6 }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </label>
            <button className={styles.buttonGhost} disabled={page <= 0 || loading} onClick={onPrev}>◀ Anterior</button>
            <span className={styles.meta}>Página {page + 1} de {Math.max(totalPages, 1)}</span>
            <button className={styles.buttonGhost} disabled={page >= totalPages - 1 || loading} onClick={onNext}>Siguiente ▶</button>
        </section>
    );
}
