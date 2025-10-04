import { Bus, SpringPage } from "../types/bus";

const API = "http://localhost:8080/buses"; // cambia a "/buses" si usas proxy CRA

const ensureJson = async (res: Response) => {
    if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) throw new Error(`No JSON (${ct})`);
};

export async function listBuses(page = 0, size = 5): Promise<SpringPage<Bus>> {
    const res = await fetch(`${API}?page=${page}&size=${size}`);
    await ensureJson(res);
    return res.json();
}

export async function getBus(id: number): Promise<Bus> {
    // Tu backend actual: GET /buses/list/{id}
    const res = await fetch(`${API}/list/${id}`);
    await ensureJson(res);
    return res.json();
}

export type CreateBusInput = {
    numeroBus: number;
    placa: string;
    descripcion?: string;
    marcaBuses: string;
    estado: boolean;
};

export async function createBus(payload: CreateBusInput): Promise<Bus> {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    await ensureJson(res);
    return res.json();
}
