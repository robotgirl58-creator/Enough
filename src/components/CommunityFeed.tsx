import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Recycle, Wrench, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface FeedItem {
  id: string;
  user: string;
  action: "borrow" | "repair" | "no-buy";
  item: string;
  points: number;
  moneySaved?: number;
  time: string;
  likes: number;
  hasLiked: boolean;
}

const actionIcons = {
  borrow: Recycle,
  repair: Wrench,
  "no-buy": ShoppingCart,
};

const actionColors = {
  borrow: "text-primary",
  repair: "text-accent",
  "no-buy": "text-success",
};

const mockFeedData: FeedItem[] = [
  {
    id: "1",
    user: "Sarah M.",
    action: "borrow",
    item: "Power drill from neighbor",
    points: 30,
    moneySaved: 15,
    time: "2 hours ago",
    likes: 12,
    hasLiked: false,
  },
  {
    id: "2",
    user: "Mike R.",
    action: "repair",
    item: "Fixed broken bike chain",
    points: 35,
    moneySaved: 25,
    time: "5 hours ago",
    likes: 8,
    hasLiked: true,
  },
  {
    id: "3",
    user: "Emma L.",
    action: "no-buy",
    item: "Resisted impulse coffee purchase",
    points: 25,
    moneySaved: 4,
    time: "1 day ago",
    likes: 15,
    hasLiked: false,
  },
];

export const CommunityFeed = () => {
  const [feedItems, setFeedItems] = useState(mockFeedData);

  const handleLike = (id: string) => {
    setFeedItems(items =>
      items.map(item =>
        item.id === id
          ? {
              ...item,
              likes: item.hasLiked ? item.likes - 1 : item.likes + 1,
              hasLiked: !item.hasLiked,
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Heart className="h-5 w-5 text-accent" />
        Community Feed
      </h2>
      
      {feedItems.map((item) => {
        const Icon = actionIcons[item.action];
        const iconColor = actionColors[item.action];
        
        return (
          <Card key={item.id} className="animate-slide-up">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-semibold">
                      {item.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{item.user}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +{item.points} pts
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-full bg-muted ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.item}</p>
                  {item.moneySaved && (
                    <p className="text-xs text-success">Saved £{item.moneySaved}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-xs ${item.hasLiked ? 'text-accent' : 'text-muted-foreground'}`}
                  onClick={() => handleLike(item.id)}
                >
                  <Heart className={`h-3 w-3 mr-1 ${item.hasLiked ? 'fill-current' : ''}`} />
                  {item.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Kudos
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};