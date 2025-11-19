import { Link2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState = ({ onCreateClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 p-12 text-center">
      {/* Animated Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <Link2 className="h-12 w-12 text-primary" />
        </div>
      </div>

      {/* Text */}
      <h3 className="mb-2 text-2xl font-bold text-foreground">No links yet</h3>
      <p className="mb-8 max-w-md text-muted-foreground">
        Create your first shortened link to get started. It only takes a few seconds and you'll be able to track all your clicks.
      </p>

      {/* CTA */}
      <Button variant="hero" size="lg" onClick={onCreateClick}>
        <Sparkles className="h-5 w-5" />
        <span>Create Your First Link</span>
      </Button>

      {/* Decorative dots */}
      <div className="mt-8 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary/20"
            style={{
              animation: `pulse 2s ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
