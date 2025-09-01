import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  DollarSign,
  Target,
  Heart,
  AlertCircle,
  CheckCircle 
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  target: string;
  current: number;
  targetValue: number;
  icon: React.ComponentType<any>;
  status: "good" | "warning" | "poor";
}

const MetricCard = ({ title, value, target, current, targetValue, icon: Icon, status }: MetricCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "good": return "text-success";
      case "warning": return "text-warning";
      case "poor": return "text-destructive";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "good": return CheckCircle;
      case "warning": return AlertCircle;
      case "poor": return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon();
  const percentage = Math.min((current / targetValue) * 100, 100);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <StatusIcon className={`h-4 w-4 ${getStatusColor()}`} />
        </div>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">Target: {target}</div>
          
          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                status === "good" ? "bg-success" : 
                status === "warning" ? "bg-warning" : "bg-destructive"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const MetricsDashboard = () => {
  const metrics = [
    {
      title: "24h Activation",
      value: "42%",
      target: "≥40%",
      current: 42,
      targetValue: 40,
      icon: Activity,
      status: "good" as const,
    },
    {
      title: "Week-1 Engagement", 
      value: "28%",
      target: "≥30%",
      current: 28,
      targetValue: 30,
      icon: TrendingUp,
      status: "warning" as const,
    },
    {
      title: "Week-2 Retention",
      value: "31%", 
      target: "≥25%",
      current: 31,
      targetValue: 25,
      icon: Users,
      status: "good" as const,
    },
    {
      title: "Avg £ Not Spent",
      value: "£23.40",
      target: "£20/week",
      current: 23.40,
      targetValue: 20,
      icon: DollarSign,
      status: "good" as const,
    },
    {
      title: "Kudos per Post",
      value: "4.2",
      target: "≥3.0",
      current: 4.2,
      targetValue: 3.0,
      icon: Heart,
      status: "good" as const,
    },
    {
      title: "Daily Action Cap",
      value: "2 max",
      target: "No-Buy only",
      current: 100,
      targetValue: 100,
      icon: Target,
      status: "good" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-background border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Core Metrics Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Early MVP health indicators
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trust & Fairness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Photo Proof</span>
              <Badge variant="outline">Optional for £10+ saves</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Daily No-Buy Cap</span>
              <Badge variant="outline">Max 2 count for points</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Privacy Mode</span>
              <Badge variant="outline">First name + initial</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Forgiving Streaks</span>
              <Badge variant="outline">1 skip day/week allowed</Badge>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              🤝 We default to trust and keep the system fair for everyone
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};