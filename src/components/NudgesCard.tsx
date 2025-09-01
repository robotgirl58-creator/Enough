import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Target, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Nudge {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "reminder" | "challenge" | "reflection";
  completed?: boolean;
}

const mockNudges: Nudge[] = [
  {
    id: "1",
    title: "Borrow Before Weekend",
    message: "Planning any DIY projects? Consider borrowing tools instead of buying!",
    time: "Friday 3:00 PM",
    type: "reminder",
  },
  {
    id: "2", 
    title: "Fix-It Hour",
    message: "Pick one small repair to tackle today. Your future self will thank you!",
    time: "Sunday 11:00 AM",
    type: "challenge",
  },
  {
    id: "3",
    title: "No-Buy Check-in",
    message: "Did you skip a purchase today? Even small wins count!",
    time: "Today 6:00 PM",
    type: "reflection",
  },
];

export const NudgesCard = () => {
  const [nudges, setNudges] = useState(mockNudges);

  const handleComplete = (id: string) => {
    setNudges(prev =>
      prev.map(nudge =>
        nudge.id === id ? { ...nudge, completed: true } : nudge
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reminder": return "text-primary";
      case "challenge": return "text-accent";
      case "reflection": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reminder": return Bell;
      case "challenge": return Target;
      case "reflection": return Clock;
      default: return Bell;
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          Gentle Nudges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {nudges.map((nudge) => {
          const Icon = getTypeIcon(nudge.type);
          const isCompleted = nudge.completed;
          
          return (
            <div 
              key={nudge.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isCompleted 
                  ? "bg-success/10 border-success/20" 
                  : "bg-muted/50 border-border hover:bg-muted"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${getTypeColor(nudge.type)}`} />
                    <span className="font-medium text-sm">{nudge.title}</span>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-success" />}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{nudge.message}</p>
                  <Badge variant="outline" className="text-xs">
                    {nudge.time}
                  </Badge>
                </div>
                
                {!isCompleted && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleComplete(nudge.id)}
                    className="text-xs px-2"
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Implementation intentions help build lasting habits
          </p>
        </div>
      </CardContent>
    </Card>
  );
};