import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../App.module.css";

export default function Modal({
                                  open,
                                  title,
                                  children,
                                  onClose,
                              }: {
    open: boolean;
    title?: string;
    children: ReactNode;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose} aria-modal="true" role="dialog">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>{title ?? "Modal"}</h3>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">×</button>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.body
    );
}
