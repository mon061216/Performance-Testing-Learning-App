import { Heart } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function HeartsDisplay({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Heart
          key={i}
          className={cn(
            "w-4 h-4",
            i < count
              ? "fill-[#ff4b4b] text-[#ff4b4b]"
              : "text-white/10 fill-white/10",
          )}
        />
      ))}
    </div>
  );
}
