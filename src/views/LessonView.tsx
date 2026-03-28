import { useState } from "react";
import type { Lesson } from "../data/curriculum";
import { ArrowLeft, Code2, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onGoToExercise: () => void;
  onGoToFlashcards: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_m, _lang, code) => {
      const highlighted = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\b(const|let|var|function|return|if|else|switch|case|type|interface|extends|class|new|typeof|instanceof|import|export|default|readonly|void|never|null|undefined|true|false|number|string|boolean|async|await|throw|try|catch|finally|abstract|private|protected|public|static|get|set|declare|module|namespace|enum|implements|super|this|keyof|infer|satisfies|as)\b/g,
          '<span style="color:#c678dd">$1</span>')
        .replace(/(["'`])(?:(?!\1).)*?\1/g, '<span style="color:#98c379">$&</span>')
        .replace(/(\/\/.*)/g, '<span style="color:#5c6370;font-style:italic">$1</span>')
        .replace(/:\s*(number|string|boolean|void|never|null|undefined|unknown|any)\b/g,
          ': <span style="color:#e5c07b">$1</span>');
      return `<pre class="bg-slate-900 text-slate-100 rounded-lg p-4 text-[13px] md:text-sm leading-relaxed overflow-x-auto my-3 font-mono"><code>${highlighted}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, '<code class="bg-muted text-sm px-1.5 py-0.5 rounded font-mono text-blue-600">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base md:text-lg font-bold mt-5 mb-2 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg md:text-xl font-bold mt-6 mb-2 text-foreground">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl md:text-2xl font-bold mt-4 mb-3 text-foreground">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="text-sm md:text-base leading-relaxed text-foreground/80 mb-3">');

  return `<p class="text-sm md:text-base leading-relaxed text-foreground/80 mb-3">${html}</p>`;
}

export function LessonView({ lesson, onComplete, onGoToExercise, onGoToFlashcards, onBack, isCompleted }: LessonViewProps) {
  const [hasRead, setHasRead] = useState(isCompleted);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      if (!hasRead) {
        setHasRead(true);
        onComplete();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 bg-card border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-sm md:text-base truncate">{lesson.title}</h1>
          <p className="text-xs md:text-sm text-muted-foreground truncate">{lesson.description}</p>
        </div>
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" onScroll={handleScroll}>
        <div
          className="px-5 md:px-8 py-4 md:py-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
        />
        <div className="h-20" />
      </div>

      {/* Bottom actions */}
      <div className="shrink-0 bg-card border-t p-4 md:p-5 safe-bottom">
        <div className="flex gap-2 md:gap-3">
          <Button
            onClick={onGoToFlashcards}
            variant="outline"
            className="flex-1 gap-2 md:text-base md:py-5"
          >
            <Layers className="w-4 h-4" />
            Flashcards
          </Button>
          <Button
            onClick={onGoToExercise}
            className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white md:text-base md:py-5"
          >
            <Code2 className="w-4 h-4" />
            Ejercicio
          </Button>
        </div>
      </div>
    </div>
  );
}
