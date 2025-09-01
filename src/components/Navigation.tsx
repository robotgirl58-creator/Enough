import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Trophy, Users, User } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userPoints: number;
}

export const Navigation = ({ activeTab, onTabChange, userPoints }: NavigationProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "community", label: "Community", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="bg-card border-t border-border px-4 py-2">
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
              className={`flex flex-col gap-1 h-auto py-2 px-3 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
        
        <div className="flex flex-col items-center gap-1">
          <Badge variant="default" className="text-xs px-2 py-1">
            {userPoints}
          </Badge>
          <span className="text-xs text-muted-foreground">pts</span>
        </div>
      </div>
    </nav>
  );
};