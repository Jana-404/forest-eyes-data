import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MapPin } from "lucide-react";

const Cameras = () => {
  const [selectedCamera, setSelectedCamera] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [showStats, setShowStats] = useState(false);

  const cameras = [
    { id: "cam1", name: "Kamera 1 - Waldrand Nord", location: { lat: 51.5074, lng: -0.1278 } },
    { id: "cam2", name: "Kamera 2 - Lichtung Ost", location: { lat: 51.5154, lng: -0.1425 } },
    { id: "cam3", name: "Kamera 3 - Bachlauf Süd", location: { lat: 51.5074, lng: -0.1520 } },
    { id: "cam4", name: "Kamera 4 - Hochstand West", location: { lat: 51.4994, lng: -0.1278 } },
  ];

  const speciesData = [
    { name: "Reh", value: 42, color: "hsl(var(--primary))" },
    { name: "Wildschwein", value: 28, color: "hsl(var(--secondary))" },
    { name: "Fuchs", value: 18, color: "hsl(var(--accent))" },
    { name: "Hirsch", value: 8, color: "hsl(var(--moss-green))" },
    { name: "Sonstige", value: 4, color: "hsl(var(--muted))" },
  ];

  const activityData = [
    { hour: "00-04", aktivität: 8 },
    { hour: "04-08", aktivität: 15 },
    { hour: "08-12", aktivität: 6 },
    { hour: "12-16", aktivität: 4 },
    { hour: "16-20", aktivität: 12 },
    { hour: "20-24", aktivität: 18 },
  ];

  const handleAnalyze = () => {
    if (selectedCamera && timeRange) {
      setShowStats(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Kamera-Analyse</h1>
          <p className="text-muted-foreground mb-8">
            Analysieren Sie die Aufnahmen einzelner Wildkameras
          </p>

          <Card className="p-6 mb-8 shadow-soft">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Kamera-Standorte
            </h2>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-6">
              <p className="text-muted-foreground">
                Kartenansicht - Integration verfügbar mit Mapbox
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="camera">Kamera auswählen</Label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger id="camera">
                    <SelectValue placeholder="Wählen Sie eine Kamera" />
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera) => (
                      <SelectItem key={camera.id} value={camera.id}>
                        {camera.name}
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
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={handleAnalyze} 
                  className="w-full"
                  disabled={!selectedCamera || !timeRange}
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
                  Tierarten-Verteilung
                </h2>
                <p className="text-muted-foreground mb-6">
                  Welche Tierarten wurden an diesem Standort erfasst
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={speciesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {speciesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 shadow-soft">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Tageszeit-Aktivität
                </h2>
                <p className="text-muted-foreground mb-6">
                  Zu welchen Tageszeiten sind die Tiere am aktivsten
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="aktivität" 
                      fill="hsl(var(--primary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 shadow-soft bg-gradient-card">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary mb-1">124</p>
                    <p className="text-sm text-muted-foreground">Gesamt Aufnahmen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent mb-1">5</p>
                    <p className="text-sm text-muted-foreground">Tierarten</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-secondary mb-1">82%</p>
                    <p className="text-sm text-muted-foreground">Erfolgsrate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-moss-green mb-1">18-22</p>
                    <p className="text-sm text-muted-foreground">Peak Zeit (Uhr)</p>
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

export default Cameras;
