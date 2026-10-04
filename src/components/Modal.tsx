import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useEffect(() => {
        if (!open) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
        (first ?? dialogRef.current)?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus();
        };
    }, [open]);

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Escape") {
            e.stopPropagation();
            onClose();
            return;
        }
        if (e.key !== "Tab") return;

        const focusables =
            dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!focusables || focusables.length === 0) {
            e.preventDefault();
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    if (!open) return null;

    return createPortal(
        <div
            onClick={onClose}
            className="fixed inset-0 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
                className="w-full max-w-md rounded-xl bg-white p-6 text-slate-900 shadow-xl focus:outline-none"
            >
                <h2 id={titleId} className="mb-3 text-xl font-semibold">
                    {title}
                </h2>
                {children}
            </div>
        </div>,
        document.body
    );

}