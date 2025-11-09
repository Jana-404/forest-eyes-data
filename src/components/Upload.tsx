import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadResponse {
  message?: string;
}

const DEFAULT_ENDPOINT = "http://0.0.0.0:8000/analyze-zip";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const endpoint = import.meta.env.VITE_UPLOAD_ENDPOINT ?? DEFAULT_ENDPOINT;

  const isZipFile = file
    ? file.type === "application/zip" ||
      file.name.toLowerCase().endsWith(".zip")
    : false;

  const canSubmit = file !== null && isZipFile && status !== "uploading";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setMessage("");
    setStatus("idle");
  };

  // Posts the selected archive to the backend for processing and surfaces the result.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !isZipFile) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("uploading");
      setMessage("");
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Upload fehlgeschlagen");
      }

      const data = (await response.json().catch(() => ({}))) as UploadResponse;
      setStatus("success");
      setMessage(
        data.message ??
          "Der Datensatz wurde zur Analyse eingereiht. Sie werden benachrichtigt, sobald die Verarbeitung abgeschlossen ist."
      );
      setFile(null);
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unerwarteter Fehler beim Hochladen."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16">
        <header className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Cloud Wildlife KI
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Laden Sie Kamerafallen-Datensätze hoch und erhalten Sie sofortige
            Artenerkenntnisse
          </h1>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Förster können komprimierte Bildarchive sicher in unsere
            Cloud-Pipeline hochladen. Wir verteilen die Dateien über den
            gesamten KI-Stack und liefern Erkennungen zurück ins Feld.
          </p>
        </header>

        <main className="flex flex-1 flex-col justify-center">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="dataset"
                  className="mb-3 block text-sm font-medium uppercase tracking-wide text-slate-300"
                >
                  Datensatz-Archiv
                </label>
                <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/80 px-6 py-16 text-center transition hover:border-emerald-400 hover:bg-slate-900">
                  <input
                    id="dataset"
                    name="dataset"
                    type="file"
                    accept=".zip"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                  <div className="pointer-events-none">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        className="h-8 w-8 text-emerald-400"
                        aria-hidden
                      >
                        <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      Ziehen Sie Ihre .zip-Datei hierher
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      Maximal 5 GB pro Archiv. Fügen Sie metadata.json hinzu,
                      falls verfügbar.
                    </p>
                    {file && (
                      <p className="mt-4 text-sm font-medium text-emerald-300">
                        Ausgewählt: {file.name}{" "}
                        {isZipFile ? "" : "(nicht unterstützte Datei)"}
                      </p>
                    )}
                    {!file && (
                      <p className="mt-4 text-sm text-slate-500">
                        Oder klicken Sie, um eine Datei von Ihrem Gerät
                        auszuwählen.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:bg-emerald-500/40 disabled:text-slate-500"
                >
                  {status === "uploading" ? (
                    <>
                      {" "}
                      Wird hochgeladen...
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Datensatz analysieren
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-5 w-5"
                        aria-hidden
                      >
                        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2M9 9h6v6H9z" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {message && (
                <div
                  role="alert"
                  className={`rounded-2xl border px-4 py-3 text-sm transition ${
                    status === "success"
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-200"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Upload;
