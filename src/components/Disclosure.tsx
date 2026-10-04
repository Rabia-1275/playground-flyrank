import { useId, useState } from "react";
import type { ReactNode } from "react";

type DisclosureProps = {
    title: string;
    children: ReactNode;
};

export function Disclosure({ title, children }: DisclosureProps) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <div className="rounded-lg border border-slate-200">
            <button
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(!open)}
                className="group flex w-full items-center justify-between px-4 py-3 text-left font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
                {title}
                <span
                    aria-hidden="true"
                    className="transition-transform group-aria-expanded:rotate-180"
                >
                    ▾
                </span>
            </button>

            <div id={panelId} hidden={!open} className="border-t border-slate-200 px-4 py-3 text-slate-600">
                {children}
            </div>
        </div>
    );
}