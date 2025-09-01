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
import { Switch } from "@/components/ui/switch";
import { Recycle, Wrench, ShoppingCart, Sparkles, Camera, Shield } from "lucide-react";
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
  const [shareToFeed, setShareToFeed] = useState(true);
  const [needsPhotoProof, setNeedsPhotoProof] = useState(false);
  const { toast } = useToast();

  if (!actionType) return null;

  const config = actionConfig[actionType];
  const Icon = config.icon;
  const savedAmount = parseFloat(moneySaved) || 0;
  const bonusPoints = Math.min(savedAmount, 30);
  const totalPoints = config.basePoints + bonusPoints;
  
  // Check if photo proof is recommended for large savings
  const shouldSuggestPhoto = savedAmount >= 10;

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
    setShareToFeed(true);
    setNeedsPhotoProof(false);
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
            {shouldSuggestPhoto && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-accent/10 rounded border border-accent/20">
                <Shield className="h-3 w-3 text-accent" />
                <p className="text-xs text-accent">
                  Consider adding photo proof for savings over £10
                </p>
              </div>
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Photo Proof (Optional)</span>
              </div>
              <Switch
                checked={needsPhotoProof}
                onCheckedChange={setNeedsPhotoProof}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Share to Community</span>
              </div>
              <Switch
                checked={shareToFeed}
                onCheckedChange={setShareToFeed}
              />
            </div>
            
            {!shareToFeed && (
              <p className="text-xs text-muted-foreground">
                Your action will be private and not shown in the community feed
              </p>
            )}
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