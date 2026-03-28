import type { Module } from "../data/curriculum";
import { ArrowLeft, Zap, Flame, BookOpen, Code2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProgressViewProps {
  modules: Module[];
  completedLessons: Set<string>;
  completedExercises: Set<string>;
  xp: number;
  streak: number;
  onBack: () => void;
}

export function ProgressView({ modules, completedLessons, completedExercises, xp, streak, onBack }: ProgressViewProps) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalExercises = totalLessons;

  const level = xp < 100 ? "Novato" : xp < 300 ? "Aprendiz" : xp < 600 ? "Desarrollador" : xp < 1000 ? "Senior" : "Master";
  const levelEmoji = xp < 100 ? "🌱" : xp < 300 ? "📘" : xp < 600 ? "💻" : xp < 1000 ? "🚀" : "👑";

  const nextLevelXp = xp < 100 ? 100 : xp < 300 ? 300 : xp < 600 ? 600 : xp < 1000 ? 1000 : 1500;
  const prevLevelXp = xp < 100 ? 0 : xp < 300 ? 100 : xp < 600 ? 300 : xp < 1000 ? 600 : 1000;
  const levelProgress = ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="shrink-0 bg-card border-b px-4 md:px-6 py-3 md:py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-sm md:text-base">Tu Progreso</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Level card */}
        <div className="m-4 md:m-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 md:p-7 text-white">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl md:text-4xl">
              {levelEmoji}
            </div>
            <div className="flex-1">
              <p className="text-blue-100 text-xs md:text-sm uppercase tracking-wider">Nivel actual</p>
              <p className="text-xl md:text-2xl font-bold">{level}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs md:text-sm text-blue-200 mb-1">
                  <span>{xp} XP</span>
                  <span>{nextLevelXp} XP</span>
                </div>
                <Progress value={levelProgress} className="h-2 md:h-2.5 bg-white/20 [&>div]:bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">{xp}</p>
              <p className="text-xs md:text-sm text-muted-foreground">XP Total</p>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">{streak}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Racha</p>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">{completedLessons.size}/{totalLessons}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Lecciones</p>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">{completedExercises.size}/{totalExercises}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Ejercicios</p>
            </div>
          </div>
        </div>

        {/* Module breakdown */}
        <div className="px-4 md:px-6 mt-6 pb-8">
          <h2 className="text-sm md:text-base font-bold mb-3">Por módulo</h2>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            {modules.map(mod => {
              const done = mod.lessons.filter(l => completedLessons.has(l.id)).length;
              const pct = (done / mod.lessons.length) * 100;
              return (
                <div key={mod.id} className="bg-card border rounded-xl p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base md:text-lg">{mod.emoji}</span>
                    <span className="text-sm md:text-base font-semibold flex-1">{mod.title}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">{done}/{mod.lessons.length}</span>
                  </div>
                  <Progress value={pct} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4 md:px-6 pb-8">
          <h2 className="text-sm md:text-base font-bold mb-3">Logros</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { emoji: "🎯", label: "Primera lección", unlocked: completedLessons.size >= 1 },
              { emoji: "💪", label: "5 ejercicios", unlocked: completedExercises.size >= 5 },
              { emoji: "🔥", label: "Racha de 3", unlocked: streak >= 3 },
              { emoji: "🧠", label: "100 XP", unlocked: xp >= 100 },
              { emoji: "⚡", label: "Todas básicas", unlocked: modules[0]?.lessons.every(l => completedLessons.has(l.id)) },
              { emoji: "🏗️", label: "OOP Master", unlocked: modules.find(m => m.id === "classes-oop")?.lessons.every(l => completedLessons.has(l.id)) ?? false },
              { emoji: "🔮", label: "Generics Pro", unlocked: modules.find(m => m.id === "generics")?.lessons.every(l => completedLessons.has(l.id)) ?? false },
              { emoji: "👑", label: "Master TS", unlocked: completedLessons.size === totalLessons },
            ].map((ach, i) => (
              <div
                key={i}
                className={`border rounded-xl p-3 md:p-4 flex flex-col items-center gap-1 md:gap-2 ${
                  ach.unlocked ? "bg-card" : "bg-muted/50 opacity-50"
                }`}
              >
                <span className="text-2xl md:text-3xl">{ach.emoji}</span>
                <span className="text-[10px] md:text-xs font-medium text-center text-muted-foreground">{ach.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
