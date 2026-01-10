// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/20 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to InterviewLoop
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform for CS students and professionals in
            Bangladesh to share real interview and job exam experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="p-6 bg-card/80 backdrop-blur border border-primary/20 rounded-lg shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Share Experiences
              </h3>
              <p className="text-muted-foreground">
                Document your interview journey
              </p>
            </div>
            <div className="p-6 bg-card/80 backdrop-blur border border-accent/20 rounded-lg shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-accent mb-2">
                Learn from Others
              </h3>
              <p className="text-muted-foreground">
                Read real interview stories
              </p>
            </div>
            <div className="p-6 bg-card/80 backdrop-blur border border-green-500/20 rounded-lg shadow-sm hover:shadow-lg hover:border-green-500/40 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Prepare Better
              </h3>
              <p className="text-muted-foreground">
                Get insights and tips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
