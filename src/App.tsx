import { useState, useCallback } from "react";
import { modules, type Lesson, type Module } from "./data/curriculum";
import { HomeView } from "./views/HomeView";
import { LessonView } from "./views/LessonView";
import { ExerciseView } from "./views/ExerciseView";
import { FlashcardView } from "./views/FlashcardView";
import { PlaygroundView } from "./views/PlaygroundView";
import { ProgressView } from "./views/ProgressView";

export type View = "home" | "lesson" | "exercise" | "flashcards" | "playground" | "progress";

export interface AppState {
  view: View;
  currentModule: Module | null;
  currentLesson: Lesson | null;
  completedLessons: Set<string>;
  completedExercises: Set<string>;
  xp: number;
  streak: number;
}

function App() {
  const [state, setState] = useState<AppState>({
    view: "home",
    currentModule: null,
    currentLesson: null,
    completedLessons: new Set<string>(),
    completedExercises: new Set<string>(),
    xp: 0,
    streak: 0,
  });

  const navigate = useCallback((view: View, mod?: Module | null, lesson?: Lesson | null) => {
    setState(prev => ({
      ...prev,
      view,
      currentModule: mod !== undefined ? mod : prev.currentModule,
      currentLesson: lesson !== undefined ? lesson : prev.currentLesson,
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setState(prev => {
      const newCompleted = new Set(prev.completedLessons);
      newCompleted.add(lessonId);
      return { ...prev, completedLessons: newCompleted, xp: prev.xp + 20 };
    });
  }, []);

  const completeExercise = useCallback((lessonId: string) => {
    setState(prev => {
      const newCompleted = new Set(prev.completedExercises);
      const isNew = !newCompleted.has(lessonId);
      newCompleted.add(lessonId);
      return {
        ...prev,
        completedExercises: newCompleted,
        xp: prev.xp + (isNew ? 50 : 10),
        streak: isNew ? prev.streak + 1 : prev.streak,
      };
    });
  }, []);

  const getNextLesson = useCallback((): { module: Module; lesson: Lesson } | null => {
    if (!state.currentModule || !state.currentLesson) return null;
    const mod = state.currentModule;
    const lessonIdx = mod.lessons.findIndex(l => l.id === state.currentLesson!.id);

    // Next lesson in same module
    if (lessonIdx < mod.lessons.length - 1) {
      return { module: mod, lesson: mod.lessons[lessonIdx + 1] };
    }

    // First lesson of next module
    const modIdx = modules.findIndex(m => m.id === mod.id);
    if (modIdx < modules.length - 1) {
      const nextMod = modules[modIdx + 1];
      return { module: nextMod, lesson: nextMod.lessons[0] };
    }

    return null;
  }, [state.currentModule, state.currentLesson]);

  const renderView = () => {
    switch (state.view) {
      case "home":
        return (
          <HomeView
            modules={modules}
            state={state}
            onSelectLesson={(mod, lesson) => navigate("lesson", mod, lesson)}
            onNavigate={navigate}
          />
        );
      case "lesson":
        return state.currentLesson ? (
          <LessonView
            lesson={state.currentLesson}
            onComplete={() => {
              if (state.currentLesson) completeLesson(state.currentLesson.id);
            }}
            onGoToExercise={() => navigate("exercise")}
            onGoToFlashcards={() => navigate("flashcards")}
            onBack={() => navigate("home")}
            isCompleted={state.completedLessons.has(state.currentLesson.id)}
          />
        ) : null;
      case "exercise": {
        const nextLesson = getNextLesson();
        return state.currentLesson ? (
          <ExerciseView
            lesson={state.currentLesson}
            onComplete={() => {
              if (state.currentLesson) completeExercise(state.currentLesson.id);
            }}
            onBack={() => navigate("lesson")}
            isCompleted={state.completedExercises.has(state.currentLesson.id)}
            onNextLesson={nextLesson ? () => navigate("lesson", nextLesson.module, nextLesson.lesson) : undefined}
            nextLessonTitle={nextLesson?.lesson.title}
          />
        ) : null;
      }
      case "flashcards":
        return state.currentLesson ? (
          <FlashcardView
            flashcards={state.currentLesson.flashcards}
            lessonTitle={state.currentLesson.title}
            onBack={() => navigate("lesson")}
          />
        ) : null;
      case "playground":
        return <PlaygroundView onBack={() => navigate("home")} />;
      case "progress":
        return (
          <ProgressView
            modules={modules}
            completedLessons={state.completedLessons}
            completedExercises={state.completedExercises}
            xp={state.xp}
            streak={state.streak}
            onBack={() => navigate("home")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-3xl mx-auto relative">
      {renderView()}
    </div>
  );
}

export default App;
