import { Link2, Copy, Trash2, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface LinkCardProps {
  shortCode: string;
  targetUrl: string;
  clicks: number;
  lastClicked: Date | null;
  createdAt: Date;
  onDelete: () => void;
  onViewStats: () => void;
}

export const LinkCard = ({
  shortCode,
  targetUrl,
  clicks,
  lastClicked,
  createdAt,
  onDelete,
  onViewStats,
}: LinkCardProps) => {
  const copyToClipboard = () => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied!", {
      description: shortUrl,
    });
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <Card className="group relative overflow-hidden border-2 border-border bg-card hover-lift p-6 transition-smooth hover:border-primary/50">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="relative space-y-4">
        {/* Short Code Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            <code className="text-2xl font-bold text-primary">{shortCode}</code>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {/* Target URL */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Target URL</p>
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-foreground/80 hover:text-primary transition-colors"
            title={targetUrl}
          >
            {truncateUrl(targetUrl)}
          </a>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-background/50 p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart3 className="h-3 w-3" />
              <span>Clicks</span>
            </div>
            <p className="text-2xl font-bold text-primary">{clicks.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Last Clicked</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {lastClicked ? formatDistanceToNow(lastClicked, { addSuffix: true }) : "Never"}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Created {formatDistanceToNow(createdAt, { addSuffix: true })}
          </p>
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewStats}
              className="hover:text-primary"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
