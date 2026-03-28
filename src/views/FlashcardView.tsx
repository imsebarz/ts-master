import { useState } from "react";
import type { Flashcard } from "../data/curriculum";
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlashcardViewProps {
  flashcards: Flashcard[];
  lessonTitle: string;
  onBack: () => void;
}

export function FlashcardView({ flashcards, lessonTitle, onBack }: FlashcardViewProps) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const card = flashcards[idx];
  const total = flashcards.length;

  const next = (markKnown?: boolean) => {
    if (markKnown) {
      setKnown(prev => { const n = new Set(prev); n.add(idx); return n; });
    }
    setFlipped(false);
    setIdx(prev => (prev + 1) % total);
  };

  const prev = () => {
    setFlipped(false);
    setIdx(prev => (prev - 1 + total) % total);
  };

  const restart = () => {
    setIdx(0);
    setFlipped(false);
    setKnown(new Set());
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 bg-card border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-sm md:text-base">Flashcards: {lessonTitle}</h1>
          <p className="text-xs md:text-sm text-muted-foreground">{idx + 1} / {total} &middot; {known.size} aprendidas</p>
        </div>
        <button onClick={restart} className="p-1 active:scale-90 transition-transform">
          <RotateCcw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="px-4 pt-4 flex gap-1.5 justify-center flex-wrap">
        {flashcards.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === idx
                ? "w-6 bg-blue-500"
                : known.has(i)
                ? "w-1.5 bg-emerald-400"
                : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8">
        <button
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-sm md:max-w-lg active:scale-[0.98] transition-transform"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative w-full min-h-[280px] md:min-h-[340px] transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-card border-2 border-blue-200 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lg"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">Pregunta</span>
              <p className="text-lg md:text-xl font-semibold text-center text-foreground leading-relaxed">{card.front}</p>
              <span className="text-xs text-muted-foreground mt-6">Toca para voltear</span>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-lg"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-xs uppercase tracking-wider text-indigo-500 mb-4 font-medium">Respuesta</span>
              <p className="text-base md:text-lg text-center text-foreground leading-relaxed">{card.back}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Bottom actions */}
      <div className="shrink-0 bg-card border-t p-4 md:p-5 safe-bottom">
        <div className="flex gap-2 md:gap-3">
          <Button onClick={prev} variant="outline" size="icon" className="shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => next(false)}
            variant="outline"
            className="flex-1 md:text-base"
          >
            Repetir
          </Button>
          <Button
            onClick={() => next(true)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white md:text-base"
          >
            La sé
          </Button>
          <Button onClick={() => next()} variant="outline" size="icon" className="shrink-0">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
