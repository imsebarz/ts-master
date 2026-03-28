import { useState } from "react";
import { ArrowLeft, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaygroundViewProps {
  onBack: () => void;
}

const EXAMPLES = [
  {
    name: "Hello TS",
    code: `const greeting: string = "Hola TypeScript!";\nconsole.log(greeting);`,
  },
  {
    name: "Interface",
    code: `interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = { name: "Sebas", age: 28 };\nconsole.log(user.name, "tiene", user.age, "años");`,
  },
  {
    name: "Generics",
    code: `function identity<T>(val: T): T {\n  return val;\n}\n\nconsole.log(identity<string>("hola"));\nconsole.log(identity<number>(42));`,
  },
  {
    name: "Enum",
    code: `enum Color {\n  Rojo = "ROJO",\n  Verde = "VERDE",\n  Azul = "AZUL"\n}\n\nconst favorito: Color = Color.Azul;\nconsole.log("Mi color favorito es:", favorito);`,
  },
  {
    name: "Result<T>",
    code: `type Result<T> = { ok: true; value: T } | { ok: false; error: string };\n\nfunction divide(a: number, b: number): Result<number> {\n  if (b === 0) return { ok: false, error: "División por cero" };\n  return { ok: true, value: a / b };\n}\n\nconst r = divide(10, 3);\nif (r.ok) console.log("Resultado:", r.value);\nelse console.log("Error:", r.error);`,
  },
  {
    name: "Class",
    code: `class Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void { this.items.push(item); }\n  pop(): T | undefined { return this.items.pop(); }\n  peek(): T | undefined { return this.items[this.items.length - 1]; }\n  get size(): number { return this.items.length; }\n}\n\nconst stack = new Stack<number>();\nstack.push(10);\nstack.push(20);\nconsole.log("Top:", stack.peek());\nconsole.log("Size:", stack.size);`,
  },
];

export function PlaygroundView({ onBack }: PlaygroundViewProps) {
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState<string[]>([]);

  const run = () => {
    const logs: string[] = [];
    try {
      const mockConsole = {
        log: (...args: unknown[]) => logs.push(args.map(a => {
          if (typeof a === "object") return JSON.stringify(a, null, 2);
          return String(a);
        }).join(" ")),
        error: (...args: unknown[]) => logs.push("❌ " + args.map(String).join(" ")),
        warn: (...args: unknown[]) => logs.push("⚠️ " + args.map(String).join(" ")),
      };
      const jsCode = code
        .replace(/:\s*(?:readonly\s+)?(?:[A-Z]\w*(?:<[^>]*>)?(?:\[\])*(?:\s*\|\s*(?:[A-Z]\w*(?:<[^>]*>)?(?:\[\])*|"[^"]*"|'[^']*'|null|undefined))*|string|number|boolean|void|never|any|unknown|null|undefined)(?:\[\])*/g, '')
        .replace(/\}:\s*\{[^}]*\}/g, '}')
        .replace(/<(?:[A-Z]\w*(?:\s*,\s*[A-Z]\w*)*(?:\s+extends\s+[^>]*)?)>/g, '')
        .replace(/\s+as\s+(?:const|[A-Z]\w*(?:<[^>]*>)?)/g, '')
        .replace(/\s+satisfies\s+\w+(?:<[^>]*>)?/g, '')
        .replace(/\b(public|private|protected)\s+/g, '')
        .replace(/\breadonly\s+/g, '')
        .replace(/\babstract\s+/g, '')
        .replace(/\s+implements\s+\w+(?:\s*,\s*\w+)*/g, '')
        .replace(/\benum\s+(\w+)\s*\{([^}]*)\}/g, (_m: string, name: string, body: string) => {
          const entries = body.split(',').filter((s: string) => s.trim()).map((entry: string) => {
            const [key, val] = entry.split('=').map((s: string) => s.trim());
            return val ? `${key}: ${val}` : `${key}: "${key}"`;
          });
          return `const ${name} = { ${entries.join(', ')} };`;
        });
      const fn = new Function("console", jsCode);
      fn(mockConsole);
      if (logs.length === 0) logs.push("(sin output)");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logs.push("❌ Error: " + msg);
    }
    setOutput(logs);
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
      run();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 bg-card border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-sm md:text-base flex-1">Playground</h1>
        <span className="text-[10px] md:text-xs text-muted-foreground hidden md:inline">Ctrl+Enter para ejecutar</span>
      </div>

      {/* Examples */}
      <div className="shrink-0 px-4 md:px-6 py-2 md:py-3 flex gap-2 overflow-x-auto scrollbar-hide border-b bg-muted/30">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.name}
            onClick={() => { setCode(ex.code); setOutput([]); }}
            className="shrink-0 text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card border hover:border-blue-300 transition-colors active:scale-95"
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 min-h-0 md:min-w-0">
          <div className="h-full bg-slate-900">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">playground.ts</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-[calc(100%-36px)] bg-transparent text-slate-100 text-[13px] md:text-sm font-mono p-4 resize-none outline-none leading-relaxed"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* Output panel */}
        <div className="shrink-0 md:shrink md:flex-1 border-t md:border-t-0 md:border-l max-h-[35%] md:max-h-full overflow-y-auto bg-slate-950">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700 sticky top-0">
            <span className="text-xs text-slate-400 font-mono">console</span>
            {output.length > 0 && (
              <button onClick={() => setOutput([])} className="p-0.5">
                <Trash2 className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
              </button>
            )}
          </div>
          <div className="p-3 md:p-4 font-mono text-[13px] md:text-sm min-h-[60px]">
            {output.length === 0 ? (
              <p className="text-slate-600">Presiona Ejecutar para ver el resultado...</p>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`${line.startsWith("❌") ? "text-red-400" : line.startsWith("⚠️") ? "text-yellow-400" : "text-emerald-400"}`}>
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="shrink-0 bg-card border-t p-4 md:p-5 safe-bottom">
        <div className="flex gap-2 md:gap-3">
          <Button
            onClick={() => { setCode(""); setOutput([]); }}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={run}
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
