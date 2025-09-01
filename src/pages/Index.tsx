import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionCard } from "@/components/ActionCard";
import { StatsCard } from "@/components/StatsCard";
import { CommunityFeed } from "@/components/CommunityFeed";
import { LogActionModal } from "@/components/LogActionModal";
import { Navigation } from "@/components/Navigation";
import { NudgesCard } from "@/components/NudgesCard";
import { WeeklyReflection } from "@/components/WeeklyReflection";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { Leaf, Sparkles, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"borrow" | "repair" | "no-buy" | null>(null);
  
  // Mock user data
  const userStats = {
    totalPoints: 180,
    currentStreak: 3,
    nextBadge: "7-Day Streak Master",
    pointsToNext: 20,
  };

  const handleActionClick = (action: "borrow" | "repair" | "no-buy") => {
    setSelectedAction(action);
    setModalOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-background">
              <img 
                src={heroImage} 
                alt="Sustainable living" 
                className="w-full h-48 object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-primary/80 flex items-center justify-center">
                <div className="text-center text-primary-foreground px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Leaf className="h-8 w-8" />
                    <h1 className="text-3xl font-bold">Enough</h1>
                  </div>
                  <p className="text-sm opacity-90">Live well with less. Celebrate sufficiency.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Log Your Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ActionCard type="borrow" points={30} onClick={() => handleActionClick("borrow")} />
                <ActionCard type="repair" points={30} onClick={() => handleActionClick("repair")} />
                <ActionCard type="no-buy" points={20} onClick={() => handleActionClick("no-buy")} />
              </div>
            </div>

            {/* Stats */}
            <StatsCard {...userStats} />
            
            {/* Nudges */}
            <NudgesCard />
          </div>
        );
      
      case "community":
        return <CommunityFeed />;
      
      case "reflection":
        return <WeeklyReflection />;
      
      case "metrics":
        return <MetricsDashboard />;
      
      case "leaderboard":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Weekly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Emma L.", points: 340 },
                  { rank: 2, name: "Mike R.", points: 285 },
                  { rank: 3, name: "You", points: 180 },
                  { rank: 4, name: "Sarah M.", points: 165 },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <Badge variant={user.rank <= 3 ? "default" : "secondary"}>
                        #{user.rank}
                      </Badge>
                      <span className={user.name === "You" ? "font-semibold" : ""}>{user.name}</span>
                    </div>
                    <span className="font-semibold">{user.points} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container max-w-md mx-auto py-6 px-4 pb-20">
        {renderContent()}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <Navigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userPoints={userStats.totalPoints}
        />
      </div>

      <LogActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        actionType={selectedAction}
      />
    </div>
  );
};

export default Index;
