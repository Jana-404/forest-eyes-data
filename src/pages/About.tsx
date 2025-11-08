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
          <h1 className="text-4xl font-bold text-foreground mb-2">Über uns</h1>
          <p className="text-muted-foreground mb-8">
            Wildtiererkennung für unsere Region
          </p>

          <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Das Projekt</h2>
            <div className="space-y-4 text-foreground/90">
              <p>
                Das WildCam-Projekt wurde von <strong>Smart City Hameln-Pyrmont</strong> ins 
                Leben gerufen und entstand im Rahmen des <strong>Hamelnhack</strong> – einem 
                innovativen Hackathon, der digitale Lösungen für regionale Herausforderungen entwickelt.
              </p>
              <p>
                Unser Ziel ist es, <strong>Bürgerinnen und Bürger aktiv in die Naturbeobachtung 
                einzubeziehen</strong> und Tierbeobachtungen in der Region systematisch zu dokumentieren. 
                Gleichzeitig stellen wir wertvolle Informationen für Förster bereit, die so einen 
                besseren Überblick über die Wildtierpopulation erhalten.
              </p>
              <p>
                Durch den Einsatz moderner Wildkameras und KI-gestützter Bilderkennung machen wir 
                die heimische Tierwelt sichtbar und schaffen eine Datenbasis für nachhaltiges 
                Wildtiermanagement.
              </p>
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
