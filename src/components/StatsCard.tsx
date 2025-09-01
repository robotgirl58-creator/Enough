import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Flame } from "lucide-react";

interface StatsCardProps {
  totalPoints: number;
  currentStreak: number;
  nextBadge: string;
  pointsToNext: number;
}

export const StatsCard = ({ totalPoints, currentStreak, nextBadge, pointsToNext }: StatsCardProps) => {
  return (
    <Card className="bg-gradient-background border-0 shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="font-medium">Total Points</span>
          </div>
          <Badge variant="default" className="text-lg px-3 py-1">
            {totalPoints}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-warning" />
            <span className="font-medium">Current Streak</span>
          </div>
          <Badge variant="outline" className="border-warning text-warning">
            {currentStreak} days
          </Badge>
        </div>
        
        <div className="bg-muted rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Next Badge</span>
            <span className="text-sm text-muted-foreground">{pointsToNext} pts to go</span>
          </div>
          <div className="text-sm text-muted-foreground">{nextBadge}</div>
          <div className="w-full bg-background rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(10, (100 - (pointsToNext / 100) * 100))}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};