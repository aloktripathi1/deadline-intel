import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { CustomDeadlineInput } from '@/hooks/use-custom-deadlines';

interface AddCustomDeadlineDialogProps {
  onAdd: (input: CustomDeadlineInput) => void;
}

export function AddCustomDeadlineDialog({ onAdd }: AddCustomDeadlineDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!date) {
      setError('Date is required.');
      return;
    }
    onAdd({ title, date, description: description || undefined });
    setTitle('');
    setDate('');
    setDescription('');
    setError('');
    setOpen(false);
  }

  function handleOpenChange(val: boolean) {
    setOpen(val);
    if (!val) {
      setTitle('');
      setDate('');
      setDescription('');
      setError('');
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Add Custom Deadline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Custom Deadline</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="custom-title">Title <span className="text-destructive">*</span></Label>
            <Input
              id="custom-title"
              placeholder="e.g. Submit assignment draft"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="custom-date">Date <span className="text-destructive">*</span></Label>
            <Input
              id="custom-date"
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="custom-desc">Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Textarea
              id="custom-desc"
              placeholder="Any notes about this deadline…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={400}
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">Save Deadline</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
