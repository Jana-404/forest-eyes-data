import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Identification = () => {
  const [species, setSpecies] = useState("");
  const [reasoning, setReasoning] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!species || !reasoning) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Erfolgreich gespeichert",
      description: "Ihre Identifikation wurde zur KI-Schulung hinzugefügt.",
    });

    // Reset form
    setSpecies("");
    setReasoning("");
  };

  const handleDiscard = () => {
    setSpecies("");
    setReasoning("");
    toast({
      title: "Verworfen",
      description: "Ihre Eingaben wurden zurückgesetzt.",
    });
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

          <Card className="p-6 shadow-elevated">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Zu identifizierendes Bild</h2>
                <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Kamerabild würde hier angezeigt werden
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Aufnahme vom 08.11.2025, 18:42 Uhr - Kamera 2 (Lichtung Ost)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Tierart *</Label>
                <Select value={species} onValueChange={setSpecies}>
                  <SelectTrigger id="species">
                    <SelectValue placeholder="Wählen Sie die identifizierte Tierart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reh">Reh (Capreolus capreolus)</SelectItem>
                    <SelectItem value="wildschwein">Wildschwein (Sus scrofa)</SelectItem>
                    <SelectItem value="fuchs">Fuchs (Vulpes vulpes)</SelectItem>
                    <SelectItem value="hirsch">Rothirsch (Cervus elaphus)</SelectItem>
                    <SelectItem value="dachs">Dachs (Meles meles)</SelectItem>
                    <SelectItem value="marder">Steinmarder (Martes foina)</SelectItem>
                    <SelectItem value="hase">Feldhase (Lepus europaeus)</SelectItem>
                    <SelectItem value="waschbaer">Waschbär (Procyon lotor)</SelectItem>
                    <SelectItem value="unknown">Unbekannt/Unsicher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reasoning">Begründung der Identifikation *</Label>
                <Textarea
                  id="reasoning"
                  placeholder="Beschreiben Sie die Merkmale, die zur Identifikation geführt haben (z.B. Körpergröße, Fellfarbe, Körperbau, Ohrenform, Schwanz, besondere Merkmale)..."
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Je detaillierter Ihre Begründung, desto besser kann die KI lernen
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Bestätigen & Speichern
                </Button>
                <Button 
                  onClick={handleDiscard} 
                  variant="outline" 
                  className="flex-1 gap-2"
                  size="lg"
                >
                  <X className="w-5 h-5" />
                  Verwerfen
                </Button>
              </div>
            </div>
          </Card>

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
