import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Camera, BarChart3, Map, Brain } from "lucide-react";
import heroImage from "@/assets/hero-forest.jpg";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "Kamera-Netzwerk",
      description: "WildWatch nutzt ein Netzwerk moderner Wildkameras, die strategisch in verschiedenen Waldgebieten installiert sind. Sie erfassen kontinuierlich Tierbewegungen – Tag und Nacht, bei jedem Wetter – und liefern so ein verlässliches Bild der lokalen Tierwelt. In Zukunft sollen auch private Kameras, Drohnen und zusätzliche Sensoren eingebunden werden, um die Datenbasis weiter zu erweitern und schwer zugängliche Gebiete abzudecken."
    },
    {
      icon: BarChart3,
      title: "KI-gestützte Datenanalyse",
      description: "Eine eigens trainierte künstliche Intelligenz unterstützt bei der Auswertung der Aufnahmen. Sie erkennt Tierarten automatisch, dokumentiert Bewegungsmuster und liefert aussagekräftige Statistiken über Populationsentwicklungen. Förster und Forschende prüfen die Ergebnisse bei Unsicherheiten und geben Feedback, wodurch die KI kontinuierlich verbessert wird."
    },
    {
      icon: Map,
      title: "Standort-Übersicht",
      description: "Geografische Visualisierung aller Kamerastandorte mit detaillierten Informationen zu jedem Beobachtungspunkt."
    },
    {
      icon: Brain,
      title: "KI-gestützte Erkennung",
      description: "Künstliche Intelligenz zur automatischen Tieridentifikation, kontinuierlich verbessert durch Förster-Feedback."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-background"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Wildtiererkennung durch Kameratechnologie
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
            Moderne Überwachung und Analyse der heimischen Wildtierpopulation 
            für nachhaltiges Forstmanagement
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Project Info */}
          <section className="mb-16 mt-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Das Projekt
            </h2>
            <Card className="p-8 shadow-elevated">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          WILDWATCH ist ein Gemeinschaftsprojekt, das modernste KI-Technologie mit dem Engagement einer wachsenden Community verbindet. Ziel ist es, heimische Wildtierbestände besser zu verstehen und langfristig zu schützen.
Über ein Netzwerk aus Wildkameras erfassen wir Daten zu Bewegungsmustern, Populationsdichten und Verhaltensweisen verschiedenster Tierarten. Eine eigens KI- Model unterstützt bei der automatischen Erkennung und Auswertung der Aufnahmen, während Försterinnen, Forscher und Naturbegeisterte ihr Wissen einbringen, um die Ergebnisse zu verbessern.
Die gewonnenen Erkenntnisse fließen direkt in Maßnahmen zum Schutz und zur nachhaltigen Bewirtschaftung unserer Wälder ein. Gleichzeitig bietet WILDWATCH allen Teilnehmenden die Möglichkeit, aktiv Teil des Projekts zu werden – durch das Teilen von Beobachtungen, die Analyse von Daten oder den Austausch innerhalb der Community.
So entsteht eine Plattform, die Forschung, Naturschutz und gemeinsames Handeln vereint – für eine Zukunft, in der Mensch und Natur im Einklang stehen.
              </p>
            </Card>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Projektfunktionen
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="mt-16">
            <Card className="p-8 bg-gradient-card shadow-elevated">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Projekt in Zahlen
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">12</p>
                  <p className="text-sm text-muted-foreground">Wildkameras</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent mb-2">8</p>
                  <p className="text-sm text-muted-foreground">Tierarten erfasst</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-secondary mb-2">2.4k</p>
                  <p className="text-sm text-muted-foreground">Sichtungen/Monat</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-moss-green mb-2">89%</p>
                  <p className="text-sm text-muted-foreground">KI-Genauigkeit</p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
