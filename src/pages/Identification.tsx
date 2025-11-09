import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Image as ImageIcon, Info, Upload as UploadIcon, X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface UploadResponse {
  message?: string;
}

interface BoundingBox {
  category: string;
  confidence: number;
  bbox: number[];
}

interface Classification {
  classes: string[];
  scores: number[];
}

interface Prediction {
  image_path: string;
  has_human: boolean;
  has_animal: boolean;
  bounding_boxes: BoundingBox[];
  classifications?: Classification;
}

interface PredictionWithAssessment extends Prediction {
  id: string;
  needsReview: boolean;
  userSpecies?: string;
  userReasoning?: string;
  assessed?: boolean;
}

const DEFAULT_ENDPOINT = "http://0.0.0.0:8000/analyze-zip";
const CONFIDENCE_THRESHOLD = 0.7;

// Mock API response function
const mockAPICall = async (): Promise<{ predictions: Prediction[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dynamically import the mock data
      fetch('/data/predictions.json')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(() => {
          // Fallback if file doesn't exist
          resolve({ predictions: [] });
        });
    }, 2500); // 2.5 second delay
  });
};

const Identification = () => {
  const [species, setSpecies] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [predictions, setPredictions] = useState<PredictionWithAssessment[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showHighConfidence, setShowHighConfidence] = useState(false);
  const { toast } = useToast();

  const endpoint = import.meta.env.VITE_UPLOAD_ENDPOINT ?? DEFAULT_ENDPOINT;

  const isZipFile = file
    ? file.type === "application/zip" ||
      file.name.toLowerCase().endsWith(".zip")
    : false;

  const canSubmitUpload = file !== null && isZipFile && uploadStatus !== "uploading";

  // Filter and process predictions
  const itemsNeedingReview = predictions.filter(p => p.needsReview && !p.assessed);
  const totalNeedsReview = predictions.filter(p => p.needsReview).length;
  const currentItem = itemsNeedingReview[currentReviewIndex];
  const highConfidenceResults = predictions.filter(p => !p.needsReview);

  // Get top classification
  const getTopClassification = (pred: Prediction) => {
    if (!pred.classifications || pred.classifications.scores.length === 0) {
      return { name: "Unbekannt", confidence: 0 };
    }
    const topClass = pred.classifications.classes[0].split(';').pop() || "Unbekannt";
    const confidence = pred.classifications.scores[0];
    return { name: topClass, confidence };
  };

  // Component to render image with bounding boxes
  const ImageWithBoundingBoxes = ({ prediction, className = "" }: { prediction: Prediction; className?: string }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const fallbackSvg =
      "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23ddd%22 width=%22800%22 height=%22600%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2230%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EBild%20nicht%20verf%C3%BCgbar%3C/text%3E%3C/svg%3E";

    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={prediction.image_path}
          alt="Kamerafallenaufnahme"
          className="block w-full h-auto"
          onLoad={() => setImageLoaded(true)}
          onError={(event) => {
            setImageLoaded(false);
            event.currentTarget.src = fallbackSvg;
          }}
        />
        {imageLoaded &&
          prediction.bounding_boxes.map((bbox, idx) => {
            const [xMin, yMin, boxWidth, boxHeight] = bbox.bbox;
            const xMax = Math.min(1, xMin + boxWidth);
            const yMax = Math.min(1, yMin + boxHeight);
            const width = Math.max(0, xMax - xMin);
            const height = Math.max(0, yMax - (yMin));

            if (width <= 0 || height <= 0) {
              return null;
            }

            const color = bbox.category === "animal" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)";

            return (
              <div
                key={idx}
                className="absolute border-2 rounded-sm pointer-events-none"
                style={{
                  left: `${xMin * 100}%`,
                  top: `${(yMin + (height / 2)) * 100}%`,
                  width: `${width * 100}%`,
                  height: `${height * 100}%`,
                  borderColor: color,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.4)"
                }}
              >
                <span
                  className="absolute -top-10 left-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: color, color: "white" }}
                >
                  {bbox.category} {(bbox.confidence * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  const handleSubmit = () => {
    if (!currentItem) {
      toast({
        title: "Fehler",
        description: "Kein Bild zur Bewertung verfügbar.",
        variant: "destructive",
      });
      return;
    }

    if (!species || !reasoning) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    setPredictions((prev) =>
      prev.map((p) =>
        p.id === currentItem.id ? { ...p, userSpecies: species, userReasoning: reasoning, assessed: true } : p
      )
    );

    toast({
      title: "Erfolgreich gespeichert",
      description: "Ihre Identifikation wurde zur KI-Schulung hinzugefügt.",
    });

    setSpecies("");
    setReasoning("");
    setCurrentReviewIndex(0);
  };

  const handleDiscard = () => {
    if (currentItem) {
      setPredictions((prev) =>
        prev.map((p) => (p.id === currentItem.id ? { ...p, assessed: true } : p))
      );
      setCurrentReviewIndex(0);
    }

    setSpecies("");
    setReasoning("");
    toast({
      title: "Übersprungen",
      description: "Dieses Bild wurde übersprungen.",
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setUploadMessage("");
    setUploadStatus("idle");
  };

  const handleUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !isZipFile) return;

    try {
      setUploadStatus("uploading");
      setUploadMessage("");
      setPredictions([]);
      
      // Use mock data instead of real API call
      const data = await mockAPICall();
      
      // Filter out humans and process predictions
      const processedPredictions: PredictionWithAssessment[] = data.predictions
        .filter(p => !p.has_human && p.has_animal) // Filter out humans and empty images
        .map((p, index) => {
          const topClassification = p.classifications ? p.classifications.scores[0] : 0;
          const needsReview = topClassification < CONFIDENCE_THRESHOLD;
          
          return {
            ...p,
            id: `pred-${index}-${Date.now()}`,
            needsReview,
            assessed: false,
          };
        });

      setPredictions(processedPredictions);
      setCurrentReviewIndex(0);
      setUploadStatus("success");
      
      const needsReviewCount = processedPredictions.filter(p => p.needsReview).length;
      const highConfidenceCount = processedPredictions.filter(p => !p.needsReview).length;
      
      setUploadMessage(
        `Analyse abgeschlossen! ${processedPredictions.length} Bilder mit Tieren gefunden. ` +
        `${highConfidenceCount} mit hoher Konfidenz, ${needsReviewCount} benötigen manuelle Überprüfung.`
      );
      setFile(null);
      
      // Reset the form if it exists
      if (event.currentTarget) {
        try {
          event.currentTarget.reset();
        } catch (e) {
          // Form reset failed, but that's okay - we already cleared the file state
        }
      }
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage(
        error instanceof Error
          ? error.message
          : "Unerwarteter Fehler beim Hochladen."
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">KI-Training: Tieridentifikation</h1>
          <p className="text-muted-foreground mb-8">
            Helfen Sie uns, die KI zu verbessern, indem Sie Tierarten identifizieren und begründen
          </p>

          <Card className="p-6 mb-6 bg-accent/10 border-accent/30">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Wie funktioniert das Training?</h3>
                <p className="text-sm text-muted-foreground">
                  Jede von Ihnen vorgenommene Identifikation hilft der KI, Muster zu erkennen und 
                  Tierarten präziser zu unterscheiden. Beschreiben Sie möglichst genau, welche 
                  Merkmale Sie zur Identifikation genutzt haben (z.B. Körperbau, Fellfarbe, 
                  Schwanzform, Ohren, Größe).
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6 shadow-elevated">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Datensatz hochladen</h2>
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div>
                <Label htmlFor="dataset" className="mb-3 block">
                  Datensatz-Archiv (.zip)
                </Label>
                <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 px-6 py-12 text-center transition hover:border-primary hover:bg-muted">
                  <input
                    id="dataset"
                    name="dataset"
                    type="file"
                    accept=".zip"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                  <div className="pointer-events-none">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <UploadIcon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-base font-semibold text-foreground">
                      Ziehen Sie Ihre .zip-Datei hierher
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Maximal 5 GB pro Archiv. Fügen Sie metadata.json hinzu, falls verfügbar.
                    </p>
                    {file && (
                      <p className="mt-3 text-sm font-medium text-primary">
                        Ausgewählt: {file.name}{" "}
                        {isZipFile ? "" : "(nicht unterstützte Datei)"}
                      </p>
                    )}
                    {!file && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        Oder klicken Sie, um eine Datei auszuwählen
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={!canSubmitUpload}
                  size="lg"
                  className="gap-2"
                >
                  {uploadStatus === "uploading" ? (
                    <>
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
                      <UploadIcon className="h-5 w-5" />
                      Datensatz analysieren
                    </>
                  )}
                </Button>
              </div>

              {uploadMessage && (
                <div
                  role="alert"
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    uploadStatus === "success"
                      ? "border-primary/40 bg-primary/10 text-foreground"
                      : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`}
                >
                  {uploadMessage}
                </div>
              )}
            </form>
          </Card>
          {/* Manual Review Section */}
          {currentItem && (
            <Card className="p-6 mb-6 bg-amber-500/5 border-amber-500/30 shadow-elevated">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Manuelle Überprüfung erforderlich
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {totalNeedsReview} markierte Aufnahmen • {itemsNeedingReview.length} verbleibend zur manuellen Prüfung
                  </p>
                </div>
              </div>

              {/* Image Preview with Bounding Boxes */}
              <div className="mb-4 rounded-lg overflow-hidden bg-black/5 border-2 border-primary/30">
                <ImageWithBoundingBoxes prediction={currentItem} className="w-full max-h-[520px]" />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <p className="font-medium text-foreground text-sm">
                      {currentItem.image_path}
                    </p>
                  </div>
                </div>
                {currentItem.classifications && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">KI-Vorschläge:</p>
                    {currentItem.classifications.classes.slice(0, 3).map((cls, idx) => {
                      const name = cls.split(';').pop() || "Unbekannt";
                      const score = currentItem.classifications!.scores[idx];
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{name}</span>
                          <span className={`font-medium ${score >= CONFIDENCE_THRESHOLD ? 'text-green-600' : 'text-amber-600'}`}>
                            {(score * 100).toFixed(1)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          )}

          {(currentItem || predictions.length === 0) && (
            <Card className={`p-6 shadow-elevated ${currentItem ? "border border-primary/50" : ""}`}>
              {currentItem ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Tierart bestätigen</h3>
                    <span className="text-xs text-muted-foreground">
                      Bild {currentReviewIndex + 1} von {itemsNeedingReview.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="species">Tierart *</Label>
                      <Select value={species} onValueChange={setSpecies}>
                        <SelectTrigger id="species">
                          <SelectValue placeholder="Tierart auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fuchs">Fuchs</SelectItem>
                          <SelectItem value="biber">Biber</SelectItem>
                          <SelectItem value="kaninchen">Kaninchen</SelectItem>
                          <SelectItem value="maeusebussard">Mäusebussard</SelectItem>
                          <SelectItem value="eichhoernchen">Eichhörnchen</SelectItem>
                          <SelectItem value="reh">Reh</SelectItem>
                          <SelectItem value="hirsch">Hirsch</SelectItem>
                          <SelectItem value="wildschwein">Wildschwein</SelectItem>
                          <SelectItem value="vogel">Vogel</SelectItem>
                          <SelectItem value="wolf">Wolf</SelectItem>
                          <SelectItem value="luchs">Luchs</SelectItem>
                          <SelectItem value="otter">Otter</SelectItem>
                          <SelectItem value="waldkauz">Eule (Waldkauz)</SelectItem>
                          <SelectItem value="fledermaus">Fledermaus</SelectItem>
                          <SelectItem value="maulwurf">Maulwurf</SelectItem>
                          <SelectItem value="maus">Maus</SelectItem>
                          <SelectItem value="ratte">Ratte</SelectItem>
                          <SelectItem value="wuehlmaus">Wühlmaus</SelectItem>
                          <SelectItem value="igel">Igel</SelectItem>
                          <SelectItem value="dachs">Dachs</SelectItem>
                          <SelectItem value="waschbaer">Waschbär</SelectItem>
                          <SelectItem value="marder">Marder</SelectItem>
                          <SelectItem value="goldschakal">Goldschakal</SelectItem>
                          <SelectItem value="elch">Elch</SelectItem>
                          <SelectItem value="stachelschwein">Stachelschwein</SelectItem>
                          <SelectItem value="rentier">Rentier</SelectItem>
                          <SelectItem value="vielfrass">Vielfraß</SelectItem>
                          <SelectItem value="unknown">Unbekannt/Unsicher</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Wählen Sie die Tierart, die Ihrer Einschätzung entspricht.
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="reasoning">Begründung *</Label>
                      <Textarea
                        id="reasoning"
                        placeholder="Relevante Merkmale in wenigen Stichpunkten..."
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        rows={4}
                        className="resize-none min-h-[128px] md:h-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 md:flex-row">
                    <Button
                      onClick={handleSubmit}
                      className="md:flex-1 gap-2"
                      size="lg"
                      disabled={!currentItem}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Bestätigen & Speichern
                    </Button>
                    <Button
                      onClick={handleDiscard}
                      variant="outline"
                      className="md:flex-1 gap-2"
                      size="lg"
                      disabled={!currentItem}
                    >
                      <X className="w-5 h-5" />
                      Überspringen
                    </Button>
                  </div>
                </>
              ) : predictions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center">
                  Laden Sie einen Datensatz hoch, um mit der Identifikation zu beginnen.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  Alle unsicheren Aufnahmen wurden bereits bewertet.
                </p>
              )}
            </Card>
          )}

          {/* Analyse Overview */}
          {predictions.length > 0 && (
            <Card className="p-6 mb-6 shadow-elevated">
              <button
                type="button"
                onClick={() => setShowHighConfidence((prev) => !prev)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-foreground">Analyse-Ergebnisse</h3>
                  <svg
                    className={`w-5 h-5 transition-transform ${showHighConfidence ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-primary/10 p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{predictions.length}</p>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Gesamt</p>
                  </div>
                  <div className="rounded-lg bg-green-500/10 p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{highConfidenceResults.length}</p>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Hohe Konfidenz</p>
                  </div>
                  <div className="rounded-lg bg-amber-500/10 p-3 text-center">
                    <p className="text-2xl font-bold text-amber-600">{itemsNeedingReview.length}</p>
                    <p className="text-xs font-medium uppercase text-muted-foreground">Offen</p>
                  </div>
                </div>
              </button>

              {showHighConfidence && (
                <div className="mt-4 space-y-4">
                  {highConfidenceResults.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-h-[520px] overflow-y-auto pr-1">
                      {highConfidenceResults.map((pred) => {
                        const { name, confidence } = getTopClassification(pred);
                        return (
                          <div
                            key={pred.id}
                            className="rounded-lg border border-border bg-muted/40 transition hover:border-primary/50"
                          >
                            <div className="relative bg-black/5">
                              <ImageWithBoundingBoxes prediction={pred} className="w-full max-h-72" />
                              <div className="absolute top-2 right-2 z-10 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                {(confidence * 100).toFixed(1)}%
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="font-medium text-foreground capitalize">{name}</p>
                              <p className="text-xs text-muted-foreground truncate">{pred.image_path}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Keine automatischen Erkennungen mit hoher Konfidenz vorhanden.
                    </p>
                  )}
                </div>
              )}
            </Card>
          )}

          <Card className="p-6 mt-6 bg-gradient-card">
            <h3 className="font-semibold mb-4">Ihre Trainings-Statistik</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">47</p>
                <p className="text-sm text-muted-foreground">Identifikationen</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">94%</p>
                <p className="text-sm text-muted-foreground">Genauigkeit</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">12</p>
                <p className="text-sm text-muted-foreground">Diese Woche</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Identification;
