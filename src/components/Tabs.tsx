import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type TabItem = {
    id: string;
    label: string;
    content: ReactNode;
};

type TabsProps = {
    tabs: TabItem[];
    label: string;
};

export function Tabs({ tabs, label }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const baseId = useId();

    function goTo(index: number) {
        setActiveIndex(index);
        tabRefs.current[index]?.focus();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
        const last = tabs.length - 1;

        if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(index === last ? 0 : index + 1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(index === 0 ? last : index - 1);
        } else if (e.key === "Home") {
            e.preventDefault();
            goTo(0);
        } else if (e.key === "End") {
            e.preventDefault();
            goTo(last);
        }
    }

    return (
        <div>
            <div role="tablist" aria-label={label} className="flex gap-1 rounded-lg bg-slate-100 p-1">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.id}
                        role="tab"
                        id={`${baseId}-tab-${tab.id}`}
                        aria-selected={i === activeIndex}
                        aria-controls={`${baseId}-panel-${tab.id}`}
                        tabIndex={i === activeIndex ? 0 : -1}
                        ref={(el) => {
                            tabRefs.current[i] = el;
                        }}
                        onClick={() => setActiveIndex(i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        className="flex-1 rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 aria-selected:bg-white aria-selected:text-indigo-600 aria-selected:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {tabs.map((tab, i) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`${baseId}-panel-${tab.id}`}
                    aria-labelledby={`${baseId}-tab-${tab.id}`}
                    hidden={i !== activeIndex}
                    tabIndex={0}
                    className="mt-3 rounded-lg border border-slate-200 p-4 text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}