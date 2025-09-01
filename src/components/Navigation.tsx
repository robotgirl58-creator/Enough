import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Trophy, Users, Calendar, BarChart3 } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userPoints: number;
}

export const Navigation = ({ activeTab, onTabChange, userPoints }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "community", label: "Community", icon: Users },
    { id: "leaderboard", label: "Leaders", icon: Trophy },
    { id: "reflection", label: "Weekly", icon: Calendar },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
  ];

  return (
    <nav className="bg-card border-t border-border px-2 py-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col gap-1 h-auto py-2 px-2 text-xs ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs leading-none">{tab.label}</span>
            </Button>
          );
        })}
        
        <div className="flex flex-col items-center gap-1 px-2">
          <Badge variant="default" className="text-xs px-2 py-0.5 leading-none">
            {userPoints}
          </Badge>
          <span className="text-xs text-muted-foreground leading-none">pts</span>
        </div>
      </div>
    </nav>
  );
};