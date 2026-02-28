import { Github, Star, ExternalLink, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PROJECTS = [
  {
    name: "GradeGenie",
    desc: "A precise grade calculator built by an IITM BS student for fellow students.",
    url: "https://github.com/aloktripathi1/gradegenie",
  },
  {
    name: "Learnsy",
    desc: "A focused learning tracker to build consistent study habits.",
    url: "https://github.com/aloktripathi1/learnsy",
  },
];

const About = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">About</p>
        <h1 className="text-3xl font-bold tracking-tight">Creator</h1>
      </div>

      {/* Creator card */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/142301030?v=4"
              alt="Alok Tripathi"
              className="h-16 w-16 rounded-2xl object-cover shrink-0 border border-border/50"
            />
            <div className="min-w-0 space-y-1">
              <h2 className="text-lg font-bold tracking-tight">Alok Tripathi</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Data Science undergrad at IIT Madras · AI/ML &amp; Backend Engineering
              </p>
              <a
                href="https://github.com/aloktripathi1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
              >
                <Github className="h-3.5 w-3.5" />
                github.com/aloktripathi1
                <ExternalLink className="h-3 w-3 opacity-50" />
              </a>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Built Deadline Intel to help fellow IITM BS students stay on top of the relentless stream
            of GAs, quizzes, OPPEs and project milestones — so nothing slips through the cracks.
          </p>
        </CardContent>
      </Card>

      {/* Star the repo */}
      <Card className="glass-card border-amber/20 bg-amber/[0.03]">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-amber/10 flex items-center justify-center shrink-0">
            <Star className="h-5 w-5 text-amber" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Did Deadline Intel help you?
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If this app made your semester a little less chaotic, consider dropping a ⭐ on the repo — it means a lot and helps others find it too.
            </p>
          </div>
          <a
            href="https://github.com/aloktripathi1/deadline-intel"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber/10 border border-amber/25 text-amber text-xs font-semibold hover:bg-amber/20 transition-colors"
          >
            <Star className="h-3.5 w-3.5" />
            Star on GitHub
          </a>
        </CardContent>
      </Card>

      {/* Other projects */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">You might also like</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="glass-card glass-card-hover h-full">
                <CardContent className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold group-hover:text-foreground transition-colors">{p.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <Github className="h-3 w-3 text-muted-foreground/60" />
                    <span className="text-[10px] text-muted-foreground/60 font-mono">aloktripathi1/{p.name.toLowerCase()}</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
