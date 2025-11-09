import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Camera, BarChart3, Map, Brain } from "lucide-react";
import heroImage from "@/assets/hero-forest.jpg";

const Index = () => {
  const features = [
    {
      icon: Camera,
      title: "Wildkamera-Netzwerk",
      description: "Moderne Kameratechnologie ermöglicht die kontinuierliche Überwachung verschiedener Waldgebiete rund um die Uhr."
    },
    {
      icon: BarChart3,
      title: "Datenanalyse",
      description: "Umfassende Statistiken zu Tierarten, Sichtungshäufigkeiten und saisonalen Mustern für fundierte Entscheidungen."
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
                Unser Wildkamera-Projekt nutzt modernste Technologie zur Erfassung und Analyse 
                der lokalen Wildtierpopulation. Durch strategisch platzierte Kameras in verschiedenen 
                Waldgebieten sammeln wir kontinuierlich Daten über Bewegungsmuster, Populationsdichten 
                und Verhaltensweisen heimischer Tierarten.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Die gewonnenen Erkenntnisse ermöglichen eine nachhaltige Bewirtschaftung des Waldes 
                und tragen zum Schutz der Biodiversität bei. Künstliche Intelligenz unterstützt uns 
                bei der Auswertung tausender Aufnahmen und wird durch erfahrene Förster kontinuierlich 
                trainiert und verbessert.
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
                  className="p-6 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
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
