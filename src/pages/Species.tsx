import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Species = () => {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [showStats, setShowStats] = useState(false);

  const species = [
    "Fuchs",
    "Biber",
    "Kaninchen",
    "Mäusebussard",
    "Eichhörnchen",
    "Reh",
    "Hirsch",
    "Vogel",
    "Wolf",
    "Luchs",
    "Otter",
    "Eule (Waldkauz)",
    "Fledermaus",
    "Maulwurf",
    "Maus",
    "Ratte",
    "Wühlmaus",
    "Igel",
    "Dachs",
    "Waschbär",
    "Marder",
    "Goldschakal",
    "Elch",
    "Stachelschwein",
    "Rentier",
    "Vielfraß",
  ];

  const locationData = [
    { name: "Standort A", value: 35, color: "hsl(var(--primary))" },
    { name: "Standort B", value: 25, color: "hsl(var(--secondary))" },
    { name: "Standort C", value: 20, color: "hsl(var(--accent))" },
    { name: "Standort D", value: 15, color: "hsl(var(--moss-green))" },
    { name: "Standort E", value: 5, color: "hsl(var(--muted))" },
  ];

  const timelineData = [
    { month: "Jan", Sichtungen: 12 },
    { month: "Feb", Sichtungen: 19 },
    { month: "Mär", Sichtungen: 15 },
    { month: "Apr", Sichtungen: 25 },
    { month: "Mai", Sichtungen: 32 },
    { month: "Jun", Sichtungen: 28 },
  ];

  const handleAnalyze = () => {
    if (selectedSpecies && timeRange) {
      setShowStats(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Tierarten-Analyse</h1>
          <p className="text-muted-foreground mb-8">
            Wählen Sie eine Tierart und einen Zeitraum für detaillierte Statistiken
          </p>

          <Card className="p-6 mb-8 shadow-soft">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="species">Tierart</Label>
                <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                  <SelectTrigger id="species">
                    <SelectValue placeholder="Wählen Sie eine Tierart" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map((animal) => (
                      <SelectItem key={animal} value={animal}>
                        {animal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timerange">Zeitraum</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="timerange">
                    <SelectValue placeholder="Zeitraum wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Letzte 7 Tage</SelectItem>
                    <SelectItem value="30days">Letzte 30 Tage</SelectItem>
                    <SelectItem value="3months">Letzte 3 Monate</SelectItem>
                    <SelectItem value="6months">Letzte 6 Monate</SelectItem>
                    <SelectItem value="1year">Letztes Jahr</SelectItem>
                    <SelectItem value="all">Gesamter Zeitraum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleAnalyze} 
                  className="w-full"
                  disabled={!selectedSpecies || !timeRange}
                >
                  Analysieren
                </Button>
              </div>
            </div>
          </Card>

          {showStats && (
            <div className="space-y-6">
              <Card className="p-6 shadow-soft">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Sichtungen von {selectedSpecies}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Verteilung der Sichtungen nach Standorten
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 shadow-soft">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Sichtungen
                </h2>
                <p className="text-muted-foreground mb-6">
                  Anzahl der Sichtungen über den gewählten Zeitraum
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="Sichtungen" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 shadow-soft bg-gradient-card">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary mb-1">96</p>
                    <p className="text-sm text-muted-foreground">Gesamt Sichtungen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent mb-1">5</p>
                    <p className="text-sm text-muted-foreground">Standorte</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary mb-1">18</p>
                    <p className="text-sm text-muted-foreground">Ø pro Standort</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Species;
