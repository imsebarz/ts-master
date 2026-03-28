import { useState } from "react";
import type { Module, Lesson } from "../data/curriculum";
import type { AppState, View } from "../App";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Code2,
  Trophy,
  ChevronRight,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface HomeViewProps {
  modules: Module[];
  state: AppState;
  onSelectLesson: (mod: Module, lesson: Lesson) => void;
  onNavigate: (view: View) => void;
}

export function HomeView({ modules, state, onSelectLesson, onNavigate }: HomeViewProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = state.completedLessons.size;
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const levelColors: Record<string, string> = {
    beginner: "from-emerald-500 to-teal-600",
    intermediate: "from-blue-500 to-indigo-600",
    advanced: "from-orange-500 to-red-600",
    expert: "from-purple-600 to-fuchsia-600",
  };

  const levelLabels: Record<string, string> = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    expert: "Experto",
  };

  const isLessonUnlocked = (mod: Module, lessonIdx: number): boolean => {
    if (lessonIdx === 0) {
      const modIdx = modules.indexOf(mod);
      if (modIdx === 0) return true;
      const prevMod = modules[modIdx - 1];
      return prevMod.lessons.every(l => state.completedExercises.has(l.id));
    }
    return state.completedExercises.has(mod.lessons[lessonIdx - 1].id);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 pb-8 md:p-8 md:pb-10 md:rounded-b-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">TS Master</h1>
            <p className="text-blue-100 text-sm md:text-base mt-0.5">Aprende TypeScript jugando</p>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="font-semibold text-sm md:text-base">{state.xp} XP</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-100">Progreso general</span>
            <span className="text-sm font-semibold">{completedCount}/{totalLessons}</span>
          </div>
          <Progress value={overallProgress} className="h-2.5 bg-white/20 [&>div]:bg-white" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 md:px-6 -mt-4">
        <div className="grid grid-cols-3 gap-2.5 md:gap-4">
          <button
            onClick={() => onNavigate("playground")}
            className="bg-card rounded-xl p-3 md:p-4 shadow-sm border flex flex-col items-center gap-1.5 md:gap-2 active:scale-95 transition-transform hover:border-blue-300"
          >
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            <span className="text-xs md:text-sm font-medium text-foreground">Playground</span>
          </button>
          <button
            onClick={() => onNavigate("progress")}
            className="bg-card rounded-xl p-3 md:p-4 shadow-sm border flex flex-col items-center gap-1.5 md:gap-2 active:scale-95 transition-transform hover:border-amber-300"
          >
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            <span className="text-xs md:text-sm font-medium text-foreground">Progreso</span>
          </button>
          <button
            onClick={() => {
              const incomplete = modules.flatMap(m =>
                m.lessons.filter(l => !state.completedLessons.has(l.id))
              );
              if (incomplete.length > 0) {
                const lesson = incomplete[0];
                const mod = modules.find(m => m.lessons.includes(lesson))!;
                onSelectLesson(mod, lesson);
              }
            }}
            className="bg-card rounded-xl p-3 md:p-4 shadow-sm border flex flex-col items-center gap-1.5 md:gap-2 active:scale-95 transition-transform hover:border-emerald-300"
          >
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            <span className="text-xs md:text-sm font-medium text-foreground">Continuar</span>
          </button>
        </div>
      </div>

      {/* Streak banner */}
      {state.streak > 0 && (
        <div className="mx-4 md:mx-6 mt-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 md:p-4 flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-semibold text-amber-900 text-sm md:text-base">{state.streak} ejercicios seguidos</p>
            <p className="text-amber-700 text-xs md:text-sm">Segui asi!</p>
          </div>
        </div>
      )}

      {/* Module list */}
      <div className="px-4 md:px-6 mt-6 space-y-3">
        <h2 className="text-base md:text-lg font-bold text-foreground px-1">Curriculum</h2>

        {modules.map((mod) => {
          const isExpanded = expandedModule === mod.id;
          const modCompleted = mod.lessons.filter(l => state.completedLessons.has(l.id)).length;
          const modProgress = (modCompleted / mod.lessons.length) * 100;

          return (
            <div key={mod.id} className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <button
                onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                className="w-full p-4 md:p-5 flex items-center gap-3 md:gap-4 text-left active:bg-muted/50 transition-colors"
              >
                <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${levelColors[mod.level]} flex items-center justify-center text-lg md:text-xl shrink-0`}>
                  {mod.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm md:text-base text-foreground truncate">{mod.title}</h3>
                    <span className="text-[10px] md:text-xs font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                      {levelLabels[mod.level]}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{mod.lessons.length} lecciones</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Progress value={modProgress} className="h-1.5 flex-1 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-500" />
                    <span className="text-[11px] text-muted-foreground shrink-0">{modCompleted}/{mod.lessons.length}</span>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 md:w-5 md:h-5 text-muted-foreground transition-transform shrink-0 ${isExpanded ? "rotate-90" : ""}`}
                />
              </button>

              {isExpanded && (
                <div className="border-t bg-muted/30">
                  {mod.lessons.map((lesson, idx) => {
                    const unlocked = isLessonUnlocked(mod, idx);
                    const isDone = state.completedLessons.has(lesson.id);
                    const exerciseDone = state.completedExercises.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => unlocked && onSelectLesson(mod, lesson)}
                        disabled={!unlocked}
                        className={`w-full flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 text-left transition-colors ${
                          unlocked ? "active:bg-muted/80 hover:bg-muted/60" : "opacity-50"
                        } ${idx < mod.lessons.length - 1 ? "border-b border-border/50" : ""}`}
                      >
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold shrink-0 ${
                          isDone
                            ? "bg-emerald-100 text-emerald-700"
                            : unlocked
                            ? "bg-blue-100 text-blue-700"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : unlocked ? (
                            idx + 1
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm md:text-base font-medium truncate ${isDone ? "text-emerald-700" : "text-foreground"}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground truncate">{lesson.description}</p>
                        </div>
                        {exerciseDone && (
                          <span className="text-[10px] md:text-xs bg-emerald-100 text-emerald-700 font-medium px-1.5 py-0.5 rounded-full">
                            +50 XP
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
