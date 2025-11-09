import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Leaf, TreePine, Bird, Bug } from "lucide-react";

const Biodiversity = () => {
  const stats = [
    { label: "Tierarten", value: "24" },
    { label: "Lebensräume", value: "8" },
    { label: "Beobachtungspunkte", value: "12" },
    { label: "Schutzgebiete", value: "3" },
  ];

  const ecosystemFeatures = [
    { icon: TreePine, label: "Wälder" },
    { icon: Leaf, label: "Wiesen" },
    { icon: Bird, label: "Vögel" },
    { icon: Bug, label: "Insekten" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Biodiversität</h1>
          <p className="text-muted-foreground mb-8">
            Artenvielfalt in unserer Region
          </p>

          <Card className="p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Artenvielfalt vor Ort</h2>
            <div className="space-y-4 text-foreground/90">
              <p>
                Das Artensterben in Deutschland passiert leise, aber es betrifft uns alle. Immer weniger Tiere und Pflanzen leben in unseren Wäldern, auf Feldern und in Gewässern. Wenn Arten verschwinden, bricht das natürliche Zusammenspiel der Natur auseinander – und das hat Folgen für alles, was wir zum Leben brauchen.</p>
<p>Jede Art hat eine Aufgabe. Sie bestäubt Pflanzen, lockert Böden, jagt Schädlinge oder sorgt dafür, dass Nährstoffe im Kreislauf bleiben. Geht eine Art verloren, fehlt ein wichtiges Teil im Puzzle. Der Rückgang von Insekten zeigt das deutlich: weniger Bestäubung, weniger Vögel, weniger gesunder Boden. </p>
<p>Artenvielfalt ist wie ein Schutzschild für die Natur. Sie hilft, mit Trockenheit, Stürmen oder Krankheiten umzugehen. Wenn die Vielfalt abnimmt, wird die Natur anfälliger und das spüren auch wir. </p>
<p>Biodiversität bedeutet sauberes Wasser, gesunde Wälder, stabile Ernten und eine intakte Umwelt. Doch das, was lange selbstverständlich war, gerät aus dem Gleichgewicht. </p>
<p>Das Artensterben ist nicht nur ein Umweltproblem. Es ist eine Frage unserer Zukunft. Es betrifft unsere Ernährung, unsere Gesundheit und unsere Heimat.</p>
<p>WildWatch will sichtbar machen, was im Wald wirklich passiert – damit wir verstehen, wo Arten verschwinden, wann neue auftauchen und wie wir die Vielfalt der Natur erhalten können.

              </p>
            </div>
          </Card>

          <Card className="p-8 mb-8 shadow-soft bg-gradient-card">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Biodiversitäts-Daten</h2>
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
            <h2 className="text-2xl font-semibold text-foreground mb-4">Ökosysteme</h2>
            <p className="text-foreground/90 mb-6">
              Die verschiedenen Ökosysteme in unserer Region sind eng miteinander vernetzt. 
              Von dichten Waldgebieten über blühende Wiesen bis hin zu kleinen Gewässern - 
              jeder Lebensraum trägt zur <strong>biologischen Vielfalt</strong> bei und 
              verdient unseren Schutz.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ecosystemFeatures.map((feature) => {
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

export default Biodiversity;