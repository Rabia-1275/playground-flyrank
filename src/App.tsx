import { useState } from "react";
import { Disclosure } from "./components/Disclosure";
import { Tabs } from "./components/Tabs";
import { Modal } from "./components/Modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs as ShadTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const btn =
  "rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
const btnPrimary =
  "rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const heading =
  "text-sm font-semibold uppercase tracking-wide text-slate-500";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Accessible Components Playground
      </h1>

      <section className="space-y-3">
        <h2 className={heading}>Disclosure</h2>
        <Disclosure title="What is ARIA?">
          <p>ARIA helps screen readers understand custom widgets.</p>
        </Disclosure>
      </section>

      <section className="space-y-3">
        <h2 className={heading}>Tabs</h2>
        <Tabs
          label="Example tabs"
          tabs={[
            { id: "one", label: "Overview", content: <p>Overview content</p> },
            { id: "two", label: "Details", content: <p>Details content</p> },
            { id: "three", label: "Reviews", content: <p>Reviews content</p> },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className={heading}>Modal</h2>
        <button onClick={() => setModalOpen(true)} className={btnPrimary}>
          Open modal
        </button>
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h2 className={heading}>shadcn versions (for comparison)</h2>

        <ShadTabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">Overview</TabsTrigger>
            <TabsTrigger value="two">Details</TabsTrigger>
            <TabsTrigger value="three">Reviews</TabsTrigger>
            <TabsTrigger value="two" disabled>Details</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Overview content</TabsContent>
          <TabsContent value="two">Details content</TabsContent>
          <TabsContent value="three">Reviews content</TabsContent>
        </ShadTabs>

        <Dialog>
          <DialogTrigger className={btnPrimary}>
            Open shadcn dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>shadcn dialog</DialogTitle>
              <DialogDescription>
                Compare me with my own modal.
              </DialogDescription>
            </DialogHeader>
            <input
              placeholder="Type here"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </DialogContent>
        </Dialog>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Example modal"
      >
        <p className="mb-4 text-slate-600">
          Press Tab to move focus. It should stay inside this dialog.
        </p>
        <input
          placeholder="Type here"
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
        <div className="flex gap-2">
          <button className={btn}>Button A</button>
          <button className={btn}>Button B</button>
          <button className={btn}>Button C</button>
          <button
            onClick={() => setModalOpen(false)}
            className={`ml-auto ${btnPrimary}`}
          >
            Close
          </button>
        </div>
      </Modal>
    </main>
  );
}