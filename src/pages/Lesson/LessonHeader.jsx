import { X } from "lucide-react";
import ProgressBar from "@/components/common/ProgressBar";
import HeartsDisplay from "@/components/common/HeartsDisplay";

export default function LessonHeader({ progress, courseColor, hearts, onClose }) {
  return (
    <header
      className="border-b border-white/[0.06]"
      style={{
        background: "rgba(13,27,42,0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 select-none">
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <ProgressBar value={progress} color={courseColor} />
        </div>
        <HeartsDisplay count={hearts} />
      </div>
    </header>
  );
}
