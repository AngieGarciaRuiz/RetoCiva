import { useEffect, useState } from "react";
import { Bus, SpringPage } from "./types/bus";
import { listBuses } from "./api/buses";
import CreateBusForm from "./components/CreateBusForm";
import SearchById from "./components/SearchById";
import BusTable from "./components/BusTable";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import styles from "./App.module.css";

export default function App() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Bus | null>(null);

  const [openCreate, setOpenCreate] = useState(false);

  const fetchAndSet = async (p = page, s = size) => {
    try {
      setLoading(true); setErr("");
      const data: SpringPage<Bus> = await listBuses(p, s);
      setBuses(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);
    } catch (e: any) {
      setErr(e.message ?? "Error");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAndSet(); /* eslint-disable-next-line */ }, [page, size]);

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Gestión de Buses</h1>

        {/* Botón que abre el modal */}
        <div className={styles.row} style={{ marginBottom: 12 }}>
          <button className={styles.button} onClick={() => setOpenCreate(true)}>➕ Nuevo bus</button>
        </div>

        {/* Modal de creación */}
        <Modal open={openCreate} title="Registrar bus" onClose={() => setOpenCreate(false)}>
          <CreateBusForm
              onCreated={() => { setPage(0); fetchAndSet(0, size); }}
              onClose={() => setOpenCreate(false)}
          />
        </Modal>

        <div className={styles.spacer} />
          
          <SearchById
              onFound={(b) => { setSelected(b); setHighlightId(b.id); }}
              onClear={() => { setSelected(null); setHighlightId(null); }}   // ⬅️ nuevo
          />
        {selected && (
            <div className={styles.card} style={{ marginTop: 12 }}>
              <h3 className={styles.title}>Bus #{selected.id}</h3>
              <p className={styles.meta}><b>Número:</b> {selected.numeroBus}</p>
              <p className={styles.meta}><b>Placa:</b> {selected.placa}</p>
              <p className={styles.meta}><b>Marca:</b> {selected.marcaBuses}</p>
              <p className={styles.meta}><b>Estado:</b> {selected.estado ? "Activo" : "Inactivo"}</p>
              <p className={styles.meta}><b>Descripción:</b> {selected.descripcion ?? "-"}</p>
              <p className={styles.meta}><b>Creado:</b> {new Date(selected.fechaCreacion).toLocaleString()}</p>
            </div>
        )}

        <div className={styles.spacer} />

        <Pagination
            page={page}
            size={size}
            totalPages={totalPages}
            loading={loading}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            onChangeSize={(s) => { setPage(0); setSize(s); }}
        />

        {loading && <p className={styles.meta}>Cargando...</p>}
        {err && <p className={styles.feedbackErr}>Error: {err}</p>}

        <BusTable buses={buses} highlightId={highlightId} />
      </div>
  );
}
