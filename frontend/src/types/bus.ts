export type MarcaBuses = "Volvo" | "Scania" | "Fiat" | "Solaris" | string;

export interface Bus {
    id: number;
    numeroBus: number;
    placa: string;
    descripcion?: string;
    marcaBuses: MarcaBuses;
    estado: boolean;
    fechaCreacion: string;
}

export interface SpringPage<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // página actual (0-based)
    size: number;
}
