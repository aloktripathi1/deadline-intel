import { useState, useCallback } from 'react';
import { DeadlineItem } from '@/types/deadline';

const CUSTOM_STORAGE_KEY = 'deadline-intel-custom';

export interface CustomDeadlineInput {
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
}

function loadCustomDeadlines(): DeadlineItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveCustomDeadlines(deadlines: DeadlineItem[]) {
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(deadlines));
}

export function useCustomDeadlines() {
  const [customDeadlines, setCustomDeadlines] = useState<DeadlineItem[]>(loadCustomDeadlines);

  const addCustomDeadline = useCallback((input: CustomDeadlineInput) => {
    const newItem: DeadlineItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: input.title.trim(),
      subject: 'ALL',
      type: 'custom',
      date: input.date,
      description: input.description?.trim() || undefined,
      priority: 3,
      isCustom: true,
    };
    setCustomDeadlines((prev) => {
      const updated = [...prev, newItem];
      saveCustomDeadlines(updated);
      return updated;
    });
  }, []);

  const deleteCustomDeadline = useCallback((id: string) => {
    setCustomDeadlines((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      saveCustomDeadlines(updated);
      return updated;
    });
  }, []);

  return { customDeadlines, addCustomDeadline, deleteCustomDeadline };
}
