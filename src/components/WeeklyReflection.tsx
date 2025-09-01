import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target, 
  Heart,
  Calendar,
  DollarSign 
} from "lucide-react";
import { useState } from "react";

interface WeeklyStats {
  totalActions: number;
  totalPoints: number;
  moneySaved: number;
  topCommunityWin: string;
  currentStreak: number;
  actionsBreakdown: {
    borrow: number;
    repair: number;
    noBuy: number;
  };
}

const mockWeeklyStats: WeeklyStats = {
  totalActions: 12,
  totalPoints: 380,
  moneySaved: 47.50,
  topCommunityWin: "Sarah M. borrowed a pressure washer instead of buying one - saved £85!",
  currentStreak: 5,
  actionsBreakdown: {
    borrow: 4,
    repair: 3,
    noBuy: 5,
  },
};

export const WeeklyReflection = () => {
  const [nextWeekGoal, setNextWeekGoal] = useState("");
  const [reflection, setReflection] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReflection = () => {
    // Here you would save the reflection
    setShowForm(false);
    setReflection("");
    setNextWeekGoal("");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-background border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Weekly Reflection
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Your journey this week (March 18-24)
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-3 text-center">
              <BarChart3 className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold">{mockWeeklyStats.totalActions}</div>
              <div className="text-xs text-muted-foreground">Actions Logged</div>
            </div>
            
            <div className="bg-card rounded-lg p-3 text-center">
              <Award className="h-5 w-5 text-accent mx-auto mb-1" />
              <div className="text-lg font-bold">{mockWeeklyStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Points Earned</div>
            </div>
            
            <div className="bg-card rounded-lg p-3 text-center">
              <DollarSign className="h-5 w-5 text-success mx-auto mb-1" />
              <div className="text-lg font-bold">£{mockWeeklyStats.moneySaved}</div>
              <div className="text-xs text-muted-foreground">Money Saved</div>
            </div>
            
            <div className="bg-card rounded-lg p-3 text-center">
              <TrendingUp className="h-5 w-5 text-warning mx-auto mb-1" />
              <div className="text-lg font-bold">{mockWeeklyStats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>

          {/* Actions Breakdown */}
          <div className="bg-card rounded-lg p-3">
            <h4 className="font-medium text-sm mb-2">Actions Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Borrow/Swap</span>
                <Badge variant="secondary">{mockWeeklyStats.actionsBreakdown.borrow}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Repair/Mend</span>
                <Badge variant="secondary">{mockWeeklyStats.actionsBreakdown.repair}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">No-Buy</span>
                <Badge variant="secondary">{mockWeeklyStats.actionsBreakdown.noBuy}</Badge>
              </div>
            </div>
          </div>

          {/* Community Highlight */}
          <div className="bg-card rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-accent" />
              <h4 className="font-medium text-sm">Community Win of the Week</h4>
            </div>
            <p className="text-xs text-muted-foreground">{mockWeeklyStats.topCommunityWin}</p>
          </div>
        </CardContent>
      </Card>

      {/* Goal Setting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-success" />
            Set Next Week's Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Set one easy, achievable goal for next week
              </p>
              <Button 
                variant="hero" 
                onClick={() => setShowForm(true)}
                className="w-full"
              >
                Set Weekly Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal">Your goal for next week</Label>
                <Input
                  id="goal"
                  value={nextWeekGoal}
                  onChange={(e) => setNextWeekGoal(e.target.value)}
                  placeholder="e.g., Borrow tools instead of buying for home project"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reflection">How did this week feel? (optional)</Label>
                <Textarea
                  id="reflection"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Share your thoughts on the week..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="success"
                  onClick={handleSubmitReflection}
                  className="flex-1"
                  disabled={!nextWeekGoal.trim()}
                >
                  Set Goal
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};