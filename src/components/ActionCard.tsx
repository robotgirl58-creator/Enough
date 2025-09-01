import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recycle, Wrench, ShoppingCart } from "lucide-react";

interface ActionCardProps {
  type: "borrow" | "repair" | "no-buy";
  points: number;
  onClick: () => void;
}

const actionConfig = {
  borrow: {
    icon: Recycle,
    title: "Borrow / Swap",
    description: "Use what already exists",
    color: "bg-gradient-primary",
    points: 30,
  },
  repair: {
    icon: Wrench,
    title: "Repair / Mend",
    description: "Extend product life",
    color: "bg-gradient-accent",
    points: 30,
  },
  "no-buy": {
    icon: ShoppingCart,
    title: "No-Buy",
    description: "Skip a purchase",
    color: "bg-success",
    points: 20,
  },
};

export const ActionCard = ({ type, points, onClick }: ActionCardProps) => {
  const config = actionConfig[type];
  const Icon = config.icon;

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${config.color} text-white`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary" className="font-semibold">
            +{config.points} pts
          </Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{config.description}</p>
        <Button variant="hero" className="w-full" size="sm">
          Log Action
        </Button>
      </CardContent>
    </Card>
  );
};