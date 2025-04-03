"use client";

import {
  initializeLikes,
  incrementLike,
  subscribeToLikes,
} from "@/lib/firestoreService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const formatLikes = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    initializeLikes();

    const hasLiked = localStorage.getItem("hasLiked");
    setLiked(hasLiked === "true");

    const unsubscribe = subscribeToLikes(setLikes);
    return () => unsubscribe();
  }, []);

  const handleLike = () => {
    if (!liked) {
      incrementLike();
      setLiked(true);
      localStorage.setItem("hasLiked", "true");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`h-8 gap-[6px] font-clashgrotesk ${
        liked ? "bg-red-500 text-white border-red-500" : "bg-transparent"
      }`}
      onClick={handleLike}
      disabled={liked}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-white" : "fill-none"}`} />
      <span className="pt-[3px] text-[15px] max-[400px]:hidden">
        {formatLikes(likes)} Likes
      </span>
    </Button>
  );
};

export default LikeButton;
