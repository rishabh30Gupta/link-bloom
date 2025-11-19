import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, TrendingUp, MousePointer, Link2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkCard } from "@/components/LinkCard";
import { LinkForm } from "@/components/LinkForm";
import { StatsCard } from "@/components/StatsCard";
import { EmptyState } from "@/components/EmptyState";
import { toast } from "sonner";

// Mock data
const mockLinks = [
  {
    id: "1",
    shortCode: "abc123",
    targetUrl: "https://example.com/very-long-url-that-needs-shortening",
    clicks: 1234,
    lastClicked: new Date(Date.now() - 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    shortCode: "def456",
    targetUrl: "https://github.com/username/repository-name",
    clicks: 856,
    lastClicked: new Date(Date.now() - 5 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    shortCode: "xyz789",
    targetUrl: "https://docs.example.com/api/documentation/reference",
    clicks: 432,
    lastClicked: new Date(Date.now() - 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState(mockLinks);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateLink = async (url: string, customCode?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newLink = {
      id: Date.now().toString(),
      shortCode: customCode || Math.random().toString(36).substring(2, 8),
      targetUrl: url,
      clicks: 0,
      lastClicked: null,
      createdAt: new Date(),
    };
    
    setLinks([newLink, ...links]);
    setLoading(false);
    
    const shortUrl = `${window.location.origin}/${newLink.shortCode}`;
    toast.success("Link created!", {
      description: shortUrl,
      action: {
        label: "Copy",
        onClick: () => {
          navigator.clipboard.writeText(shortUrl);
          toast.success("Copied to clipboard!");
        },
      },
    });
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
    toast.success("Link deleted");
  };

  const filteredLinks = links.filter(
    (link) =>
      link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                <Link2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">TinyLink</h1>
                <p className="text-sm text-muted-foreground">Your smart link shortener</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 rounded-2xl bg-gradient-hero p-8 md:p-12">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <h2 className="bg-gradient-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Your Links, Your Story
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Shorten links, track clicks, own your connections
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-card/50 px-4 py-2 backdrop-blur-sm">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{links.length} Active Links</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card/50 px-4 py-2 backdrop-blur-sm">
                <MousePointer className="h-5 w-5 text-secondary" />
                <span className="font-semibold text-foreground">{totalClicks.toLocaleString()} Clicks Total</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card/50 px-4 py-2 backdrop-blur-sm">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">↑ 23% vs Last Month</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={BarChart3}
            label="Total Links"
            value={links.length}
            color="emerald"
          />
          <StatsCard
            icon={MousePointer}
            label="Total Clicks"
            value={totalClicks.toLocaleString()}
            trend={{ value: "15%", positive: true }}
            color="emerald"
          />
          <StatsCard
            icon={TrendingUp}
            label="Avg Clicks/Link"
            value={links.length > 0 ? Math.round(totalClicks / links.length) : 0}
            trend={{ value: "8%", positive: true }}
            color="coral"
          />
          <StatsCard
            icon={Link2}
            label="Active Today"
            value={links.filter((l) => l.lastClicked && Date.now() - l.lastClicked.getTime() < 24 * 60 * 60 * 1000).length}
            color="golden"
          />
        </div>

        {/* Link Creation Form */}
        <section className="mb-8">
          <LinkForm onSubmit={handleCreateLink} loading={loading} />
        </section>

        {/* Links Display Section */}
        <section>
          {links.length > 0 ? (
            <>
              {/* Search Bar */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by code or URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-2 border-input bg-card pl-12 text-base focus:border-primary"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {filteredLinks.length} of {links.length} links
                </span>
              </div>

              {/* Links Grid */}
              {filteredLinks.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredLinks.map((link) => (
                    <LinkCard
                      key={link.id}
                      shortCode={link.shortCode}
                      targetUrl={link.targetUrl}
                      clicks={link.clicks}
                      lastClicked={link.lastClicked}
                      createdAt={link.createdAt}
                      onDelete={() => handleDeleteLink(link.id)}
                      onViewStats={() => navigate(`/${link.shortCode}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-8 text-center">
                  <p className="text-muted-foreground">No links match your search</p>
                </div>
              )}
            </>
          ) : (
            <EmptyState onCreateClick={() => document.getElementById("url")?.focus()} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
