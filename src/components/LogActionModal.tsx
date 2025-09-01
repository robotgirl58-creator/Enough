import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Recycle, Wrench, ShoppingCart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "borrow" | "repair" | "no-buy" | null;
}

const actionConfig = {
  borrow: {
    icon: Recycle,
    title: "Borrow / Swap",
    basePoints: 30,
    color: "text-primary",
  },
  repair: {
    icon: Wrench,
    title: "Repair / Mend",
    basePoints: 30,
    color: "text-accent",
  },
  "no-buy": {
    icon: ShoppingCart,
    title: "No-Buy",
    basePoints: 20,
    color: "text-success",
  },
};

export const LogActionModal = ({ isOpen, onClose, actionType }: LogActionModalProps) => {
  const [item, setItem] = useState("");
  const [moneySaved, setMoneySaved] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  if (!actionType) return null;

  const config = actionConfig[actionType];
  const Icon = config.icon;
  const savedAmount = parseFloat(moneySaved) || 0;
  const bonusPoints = Math.min(savedAmount, 30);
  const totalPoints = config.basePoints + bonusPoints;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast with animation
    toast({
      title: "🎉 Amazing work!",
      description: `+${totalPoints} points earned! Another step toward enough.`,
      duration: 4000,
    });

    // Reset form and close
    setItem("");
    setMoneySaved("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            Log {config.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item">What did you {actionType === "no-buy" ? "skip buying" : actionType}?</Label>
            <Input
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder={
                actionType === "borrow" 
                  ? "e.g., Power drill from neighbor"
                  : actionType === "repair"
                  ? "e.g., Fixed broken headphones"
                  : "e.g., Impulse coffee purchase"
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="money">Money saved (£) - Optional</Label>
            <Input
              id="money"
              type="number"
              step="0.01"
              value={moneySaved}
              onChange={(e) => setMoneySaved(e.target.value)}
              placeholder="0.00"
            />
            {savedAmount > 0 && (
              <p className="text-xs text-success">
                +{bonusPoints} bonus points for saving £{savedAmount}!
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">How did it feel? - Optional</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
            />
          </div>

          <div className="bg-gradient-background rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="font-medium">Points Earned</span>
              </div>
              <Badge variant="default" className="text-lg px-3 py-1">
                +{totalPoints}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Base: {config.basePoints} pts
              {bonusPoints > 0 && ` + Bonus: ${bonusPoints} pts`}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="success" className="flex-1">
              Log Action
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};