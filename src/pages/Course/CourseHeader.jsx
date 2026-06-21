import { ArrowLeft, Flame } from "lucide-react";
import { useNavigate } from "react-router";
import HeartsDisplay from "@/components/common/HeartsDisplay";

export default function CourseHeader({ streak, hearts }) {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-20 border-b border-white/[0.06]"
      style={{
        background: "rgba(13,27,42,0.85)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3 select-none">
          <div className="flex items-center gap-1 text-[#FF9600] font-black text-sm">
            <Flame className="w-4 h-4 fill-[#FF9600]" />
            {streak}
          </div>
          <HeartsDisplay count={hearts} />
        </div>
      </div>
    </header>
  );
}
