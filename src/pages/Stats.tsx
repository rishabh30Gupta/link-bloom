import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, Clock, Calendar, Activity, Copy, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatDistanceToNow, format, subDays } from "date-fns";

// Mock data for charts
const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      date: format(date, "MMM dd"),
      clicks: Math.floor(Math.random() * 100) + 50,
    };
  });
};

const Stats = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  // Mock data (in real app, fetch based on code)
  const linkData = {
    shortCode: code || "abc123",
    targetUrl: "https://example.com/very-long-url-that-needs-shortening",
    totalClicks: 1234,
    lastClicked: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    avgClicksPerDay: 176,
    peakClicks: { count: 234, date: "Dec 15" },
  };

  const chartData = generateChartData();

  const copyShortLink = () => {
    const shortUrl = `${window.location.origin}/${linkData.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.success("Link copied!", {
      description: shortUrl,
    });
  };

  const handleDelete = () => {
    toast.success("Link deleted");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <code className="text-3xl font-bold text-primary">{linkData.shortCode}</code>
                <Button variant="ghost" size="icon" onClick={copyShortLink}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ExternalLink className="h-4 w-4" />
                <a
                  href={linkData.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {linkData.targetUrl}
                </a>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyShortLink}>
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={BarChart3}
            label="Total Clicks"
            value={linkData.totalClicks.toLocaleString()}
            trend={{ value: "15%", positive: true }}
            color="emerald"
          />
          <StatsCard
            icon={Clock}
            label="Last Clicked"
            value={formatDistanceToNow(linkData.lastClicked, { addSuffix: true })}
            color="coral"
          />
          <StatsCard
            icon={Calendar}
            label="Created"
            value={format(linkData.createdAt, "MMM dd, yyyy")}
            color="golden"
          />
          <StatsCard
            icon={Activity}
            label="Status"
            value="Active"
            color="emerald"
          />
        </div>

        {/* Click Analytics Chart */}
        <Card className="mb-8 border-2 border-border bg-card p-6 shadow-card">
          <div className="mb-6">
            <h3 className="mb-2 text-2xl font-bold text-foreground">Click Analytics</h3>
            <p className="text-muted-foreground">Last 7 days performance</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--emerald))" stopOpacity={1} />
                  <stop offset="100%" stopColor="hsl(var(--coral))" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="clicks" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-background/50 p-4">
              <p className="mb-1 text-sm text-muted-foreground">Average clicks/day</p>
              <p className="text-2xl font-bold text-primary">{linkData.avgClicksPerDay}</p>
            </div>
            <div className="rounded-lg bg-background/50 p-4">
              <p className="mb-1 text-sm text-muted-foreground">Peak performance</p>
              <p className="text-2xl font-bold text-primary">
                {linkData.peakClicks.count} <span className="text-base text-muted-foreground">on {linkData.peakClicks.date}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Target URL Card */}
        <Card className="border-2 border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-xl font-bold text-foreground">Target URL</h3>
          <div className="flex items-center justify-between rounded-lg bg-background p-4">
            <a
              href={linkData.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="break-all">{linkData.targetUrl}</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(linkData.targetUrl);
                toast.success("Target URL copied!");
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Stats;
