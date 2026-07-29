import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widget test",
  robots: { index: false, follow: false },
};

const WIDGET_SRC = "https://demo.pr-96.aresistest.online/widget";
const LAUNCHER_SRC = "https://demo.pr-96.aresistest.online/widget-launcher.js";

export default function WidgetTestPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto grid max-w-3xl gap-12">
        <div className="grid gap-2">
          <h1 className="text-2xl font-semibold">Aresis widget test</h1>
          <p className="text-muted-foreground">
            Cross-domain embed check for the Aresis customer portal widget (PR #96 preview).
          </p>
        </div>

        <section className="grid gap-4">
          <h2 className="text-lg font-medium">Inline embed</h2>
          <iframe
            src={WIDGET_SRC}
            width="1000"
            height="1000"
            style={{ border: 0, maxWidth: "100%" }}
            className="rounded-lg border border-border"
          />
        </section>

        <section className="grid gap-4">
          <h2 className="text-lg font-medium">Popup embed</h2>
          <p className="text-sm text-muted-foreground">
            Launcher button should appear bottom-right of the page.
          </p>
          <script
            src={LAUNCHER_SRC}
            data-src={WIDGET_SRC}
            data-width="1000"
            data-height="1000"
            data-color="#111827"
            async
          />
        </section>
      </div>
    </main>
  );
}
