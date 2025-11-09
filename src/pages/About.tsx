import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Camera, Smartphone, MousePointer2, Squirrel } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Gesamt Sichtungen", value: "2.847" },
    { label: "Aktive Nutzer", value: "156" },
    { label: "Häufigste Art", value: "Reh" },
    { label: "Aktivster Monat", value: "Mai 2024" },
  ];

  const appFeatures = [
    { icon: Camera, label: "Wildkamera-Aufnahmen" },
    { icon: Smartphone, label: "Mobile Nutzung" },
    { icon: MousePointer2, label: "Swipe-Interface" },
    { icon: Squirrel, label: "KI-Erkennung" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Über uns - WILDWATCH</h1>
          <p className="text-muted-foreground mb-8">
            Daten für Artenvielfalt. Lokal erfasst, global genutzt.
          </p>

          <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unsere Mission</h2>
            <div className="space-y-4 text-foreground/90">
              <p>
                Wir wollen wissen, was im Wald passiert.
                Welche Tiere leben hier? Welche kehren zurück? Und welche verschwinden?
                Mit WildWatch machen wir das Unsichtbare sichtbar – durch moderne Sensorik, künstliche Intelligenz und die Kraft einer engagierten Gemeinschaft.
                Denn nur was wir sehen, können wir schützen.
              </p>
            </div>
          </Card>

          <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unsere Vision</h2>
            <div className="space-y-4 text-foreground/90">
              <p>
               Ein Europa, das seine Tierwelt wieder sieht – klar, vernetzt, lebendig.
WildWatch ist mehr als eine Plattform: Es ist ein Frühwarnsystem für die Natur, ein Werkzeug für Schutzgebiete und ein Ort für alle, die Verantwortung übernehmen wollen.
              </p>
            </div>
          </Card>

          
                    <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Warum das zählt</h2>
            <div className="space-y-4 text-foreground/90">
              <p>
                Unsere Natur verändert sich im Stillen. Arten verschwinden und Lebensräume geraten aus dem Gleichgewicht.
Noch fehlen genaue Daten, um diese Entwicklungen rechtzeitig zu erkennen – und genau hier setzt WildWatch an.
Jedes Bild, jede Meldung, jede Bestätigung bringt uns der Antwort näher:
Wie steht es wirklich um unsere Wildtiere?
Mit vereinten Kräften von Förstern, Forschern und Naturfreunden entsteht ein neues Verständnis für die Vielfalt des Lebens.
              </p>
            </div>
          </Card>

          
          <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unsere Ziele</h2>
            <div className="space-y-4 text-foreground/90">
              <ul className="list-disc pl-6 space-y-2">
                <li>Wildtierbestände sichtbar und nachvollziehbar machen</li>
                <li>Wanderungen und Populationsveränderungen frühzeitig erkennen</li>
                <li>Bedrohte oder invasive Arten aufspüren</li>
                <li>Offene Daten für Wissenschaft und Gesellschaft bereitstellen</li>
                <li>Mit Technologie und Gemeinschaft Biodiversität sichern</li>
              </ul>
            </div>
          </Card>


          <Card className="p-8 mb-8 shadow-soft bg-gradient-card">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Projektstatistiken</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Unsere App</h2>
            <p className="text-foreground/90 mb-6">
              Mit unserer mobilen App können Nutzer spielerisch dabei helfen, die KI zu trainieren. 
              Ähnlich wie bei Tinder können Tierfotos per <strong>Swipe-Geste</strong> bestätigt 
              oder korrigiert werden – eine einfache und intuitive Methode, um die Erkennungsgenauigkeit 
              kontinuierlich zu verbessern.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.label} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/80">{feature.label}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
