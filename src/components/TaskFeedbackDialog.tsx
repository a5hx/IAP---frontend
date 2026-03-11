import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Battery, BatteryMedium, BatteryWarning, Zap } from "lucide-react";
import { Task } from "@/stores/useTaskStore";

interface TaskFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | undefined;
  onComplete: (actualMinutes: number, drainIntensity: number, contextNotes: string[]) => Promise<void>;
}

export default function TaskFeedbackDialog({ open, onOpenChange, task, onComplete }: TaskFeedbackDialogProps) {
  const [actualTime, setActualTime] = useState<string>("");
  const [drain, setDrain] = useState<number>(5);
  const [contextNotes, setContextNotes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill with planned time if available when dialog opens
  // We'll just use a simple effect to clear it on open for now to force user input
  
  const toggleNote = (note: string) => {
      setContextNotes(prev => prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]);
  };

  const handleSubmit = async () => {
    if (!actualTime || isNaN(Number(actualTime))) return;
    setIsSubmitting(true);
    try {
      await onComplete(Number(actualTime), drain, contextNotes);
      onOpenChange(false);
      setActualTime("");
      setDrain(5);
      setContextNotes([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Task Complete! 🎉</DialogTitle>
          <DialogDescription>
            Help your reflexive AI learn by providing quick feedback on <span className="font-semibold text-foreground">{task.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <Label className="text-secondary-foreground font-semibold">Actual Time Taken (minutes)</Label>
            <Input 
              type="number" 
              value={actualTime} 
              onChange={e => setActualTime(e.target.value)} 
              placeholder="e.g. 45"
              className="rounded-xl border-primary/20 focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
                <Label className="text-secondary-foreground font-semibold">Drain Intensity (0 - 10)</Label>
                <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {drain}
                </span>
            </div>
            <div className="flex flex-col gap-2 relative pt-2">
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={drain}
                    onChange={(e) => setDrain(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground px-1 mt-1">
                    <span>0: Effortless</span>
                    <span>10: Exhausting</span>
                </div>
            </div>
          </div>

          <div className="space-y-3">
              <Label className="text-secondary-foreground font-semibold">Context Notes (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                  {["Distracted", "Flow State", "Stuck", "Easy", "Fatigued"].map(note => (
                      <button
                          key={note}
                          onClick={() => toggleNote(note)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                              contextNotes.includes(note)
                                  ? 'bg-primary/20 border-primary text-primary'
                                  : 'bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary'
                          }`}
                      >
                          {note}
                      </button>
                  ))}
              </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isSubmitting} className="rounded-xl">
            Skip
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !actualTime} className="rounded-xl bg-vibrant-blue hover:bg-vibrant-blue/90 text-white">
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
