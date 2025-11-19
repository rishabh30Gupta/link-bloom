import { useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface LinkFormProps {
  onSubmit: (url: string, customCode?: string) => void;
  loading?: boolean;
}

export const LinkForm = ({ onSubmit, loading = false }: LinkFormProps) => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [urlValid, setUrlValid] = useState<boolean | null>(null);

  const validateUrl = (value: string) => {
    if (!value) {
      setUrlValid(null);
      return;
    }
    try {
      new URL(value);
      setUrlValid(true);
    } catch {
      setUrlValid(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    validateUrl(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !urlValid) {
      toast.error("Please enter a valid URL");
      return;
    }
    onSubmit(url, customCode || undefined);
  };

  return (
    <Card className="border-2 border-border bg-card p-6 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-semibold text-foreground">
            Long URL
          </label>
          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="url"
              type="url"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={handleUrlChange}
              className="h-14 border-2 border-input bg-background pl-12 pr-12 text-base focus:border-primary focus:ring-primary"
            />
            {urlValid !== null && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {urlValid ? (
                  <span className="text-primary">✓</span>
                ) : (
                  <span className="text-destructive">✗</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-semibold text-foreground">
            Custom Code <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="code"
            type="text"
            placeholder="my-custom-link"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="h-12 border-2 border-input bg-background text-base focus:border-primary focus:ring-primary"
            maxLength={20}
          />
          <p className="text-xs text-muted-foreground">
            Leave empty for auto-generated code. 6-20 alphanumeric characters.
          </p>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={loading || !urlValid}
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>Shorten Link</span>
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
