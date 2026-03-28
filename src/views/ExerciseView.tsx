import { useState, useRef } from "react";
import type { Lesson } from "../data/curriculum";
import { ArrowLeft, Play, RotateCcw, Lightbulb, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExerciseViewProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

export function ExerciseView({ lesson, onComplete, onBack, isCompleted }: ExerciseViewProps) {
  const [code, setCode] = useState(lesson.exercise.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">(isCompleted ? "success" : "idle");
  const [hintIdx, setHintIdx] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stripTS = (src: string): string => {
    return src
      // Remove type/interface/enum declarations entirely (multi-line)
      .replace(/^(type|interface)\s+\w+[\s\S]*?(?=\n(?:const|let|var|function|class|type|interface|enum|\/\/|$))/gm, (m) => {
        // Keep it as a comment so line numbers don't shift
        return m.split('\n').map(() => '').join('\n');
      })
      // Remove type annotations after colons: `: Type` including generics
      .replace(/:\s*(?:readonly\s+)?(?:[A-Z]\w*(?:<[^>]*>)?(?:\[\])*(?:\s*\|\s*(?:[A-Z]\w*(?:<[^>]*>)?(?:\[\])*|"[^"]*"|'[^']*'|null|undefined))*|string|number|boolean|void|never|any|unknown|null|undefined)(?:\[\])*/g, '')
      // Remove type annotations in destructured params like { a, b }: { a: string; b: number }
      .replace(/\}:\s*\{[^}]*\}/g, '}')
      // Remove angle bracket generics on function calls/definitions: fn<T>(...) → fn(...)
      .replace(/<(?:[A-Z]\w*(?:\s*,\s*[A-Z]\w*)*(?:\s+extends\s+[^>]*)?)>/g, '')
      // Remove `as const` / `as Type`
      .replace(/\s+as\s+(?:const|[A-Z]\w*(?:<[^>]*>)?)/g, '')
      // Remove `satisfies Type`
      .replace(/\s+satisfies\s+\w+(?:<[^>]*>)?/g, '')
      // Remove `!` non-null assertion (but not !== or !=)
      .replace(/(\w)!(?=[.;\s,)\]])/g, '$1')
      // Remove `abstract` keyword
      .replace(/\babstract\s+/g, '')
      // Remove access modifiers
      .replace(/\b(public|private|protected)\s+/g, '')
      // Remove `readonly` keyword
      .replace(/\breadonly\s+/g, '')
      // Remove `implements X`
      .replace(/\s+implements\s+\w+(?:\s*,\s*\w+)*/g, '')
      // Remove `declare` keyword
      .replace(/\bdeclare\s+/g, '')
      // Clean up enum to object
      .replace(/\benum\s+(\w+)\s*\{([^}]*)\}/g, (_m, name, body) => {
        const entries = body.split(',').filter((s: string) => s.trim()).map((entry: string) => {
          const [key, val] = entry.split('=').map((s: string) => s.trim());
          return val ? `${key}: ${val}` : `${key}: "${key}"`;
        });
        return `const ${name} = { ${entries.join(', ')} };`;
      });
  };

  const runCode = () => {
    const logs: string[] = [];
    try {
      const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(" ")) };

      const jsCode = stripTS(code);
      const testCode = lesson.exercise.tests.map((t, i) =>
        `try { if (!(${t})) { throw new Error("Test ${i + 1} falló"); } console.log("✅ Test ${i + 1} pasó"); } catch(e) { throw new Error("❌ Test ${i + 1}: " + e.message); }`
      ).join("\n");

      const fn = new Function("console", jsCode + "\n\n" + testCode);
      fn(mockConsole);
      logs.push("\n🎉 Todos los tests pasaron!");
      setStatus("success");
      onComplete();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logs.push("❌ " + msg);
      setStatus("error");
    }
    setOutput(logs);
  };

  const reset = () => {
    setCode(lesson.exercise.starterCode);
    setOutput([]);
    setStatus("idle");
    setHintIdx(-1);
    setShowSolution(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 bg-card border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-sm md:text-base">Ejercicio: {lesson.title}</h1>
        </div>
        {status === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Prompt */}
        <div className="px-4 md:px-6 py-3 md:py-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm md:text-base text-blue-900 leading-relaxed">{lesson.exercise.prompt}</p>
        </div>

        {/* Editor */}
        <div className="px-4 md:px-6 py-3 md:py-4">
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">editor.ts</span>
              <span className="text-[10px] text-slate-500 hidden md:inline">Ctrl+Enter para ejecutar</span>
              <div className="flex gap-1.5 md:hidden">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={e => { setCode(e.target.value); setStatus("idle"); }}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-slate-100 text-[13px] md:text-sm font-mono p-4 resize-none outline-none leading-relaxed min-h-[200px] md:min-h-[260px]"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* Output */}
        {output.length > 0 && (
          <div className="px-4 md:px-6 pb-3">
            <div className={`rounded-xl p-3 md:p-4 text-sm font-mono whitespace-pre-wrap border ${
              status === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}>
              {output.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            {status === "success" && (
              <div className="mt-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 md:p-5 text-center">
                <p className="font-bold text-lg md:text-xl">+50 XP</p>
                <p className="text-emerald-100 text-sm mt-0.5">Ejercicio completado</p>
              </div>
            )}
          </div>
        )}

        {/* Hints */}
        {hintIdx >= 0 && (
          <div className="px-4 md:px-6 pb-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 md:p-4">
              <p className="text-sm md:text-base text-amber-900">
                <Lightbulb className="w-4 h-4 inline mr-1 -mt-0.5" />
                {lesson.exercise.hints[hintIdx]}
              </p>
            </div>
          </div>
        )}

        {/* Solution toggle */}
        <div className="px-4 md:px-6 pb-3">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showSolution ? "Ocultar solución" : "Ver solución"}
          </button>
          {showSolution && (
            <pre className="mt-2 bg-slate-900 text-slate-100 rounded-lg p-3 md:p-4 text-[13px] md:text-sm font-mono overflow-x-auto">
              {lesson.exercise.solution}
            </pre>
          )}
        </div>

        <div className="h-24" />
      </div>

      {/* Bottom actions */}
      <div className="shrink-0 bg-card border-t p-4 md:p-5 safe-bottom">
        <div className="flex gap-2 md:gap-3">
          <Button onClick={reset} variant="outline" size="icon" className="shrink-0 md:w-11 md:h-11">
            <RotateCcw className="w-4 h-4" />
          </Button>
          {hintIdx < lesson.exercise.hints.length - 1 && (
            <Button
              onClick={() => setHintIdx(prev => Math.min(prev + 1, lesson.exercise.hints.length - 1))}
              variant="outline"
              className="gap-1.5 md:text-base"
            >
              <Lightbulb className="w-4 h-4" />
              Pista
            </Button>
          )}
          <Button
            onClick={runCode}
            className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white md:text-base md:py-5"
          >
            <Play className="w-4 h-4" />
            Ejecutar
          </Button>
        </div>
      </div>
    </div>
  );
}
