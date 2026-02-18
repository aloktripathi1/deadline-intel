import { useEffect, useCallback, useState } from 'react';
import { DeadlineItem, getDaysLeft } from '@/types/deadline';

const NOTIF_KEY = 'deadline-intel-notif';

interface NotifState {
  enabled: boolean;
  leadHours: number; // hours before deadline to notify
  lastNotified: Record<string, string>; // id -> ISO date string of last notification
}

function loadNotifState(): NotifState {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enabled: false, leadHours: 24, lastNotified: {} };
}

function saveNotifState(s: NotifState) {
  localStorage.setItem(NOTIF_KEY, JSON.stringify(s));
}

export function useNotifications(pendingItems: DeadlineItem[]) {
  const [state, setState] = useState<NotifState>(loadNotifState);
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      setState((prev) => {
        const next = { ...prev, enabled: true };
        saveNotifState(next);
        return next;
      });
    }
  }, []);

  const setEnabled = useCallback(async (val: boolean) => {
    if (val && permission !== 'granted') {
      await requestPermission();
      return;
    }
    setState((prev) => {
      const next = { ...prev, enabled: val };
      saveNotifState(next);
      return next;
    });
  }, [permission, requestPermission]);

  const setLeadHours = useCallback((hours: number) => {
    setState((prev) => {
      const next = { ...prev, leadHours: hours };
      saveNotifState(next);
      return next;
    });
  }, []);

  // Fire notifications on load and whenever items/state change
  useEffect(() => {
    if (!state.enabled || permission !== 'granted') return;
    if (typeof Notification === 'undefined') return;

    const today = new Date().toISOString().split('T')[0];
    const newLastNotified = { ...state.lastNotified };
    let changed = false;

    pendingItems.forEach((item) => {
      const daysLeft = getDaysLeft(item.date);
      const hoursLeft = daysLeft * 24;

      // Only notify if within lead window and not already notified today
      if (hoursLeft > state.leadHours) return;
      if (newLastNotified[item.id] === today) return;

      let body = '';
      if (daysLeft < 0) body = `Overdue by ${Math.abs(daysLeft)} day(s)!`;
      else if (daysLeft === 0) body = 'Due today!';
      else if (daysLeft === 1) body = 'Due tomorrow!';
      else body = `Due in ${daysLeft} day(s)`;

      new Notification(`📌 ${item.title}`, {
        body,
        icon: '/favicon.ico',
        tag: item.id,
      });

      newLastNotified[item.id] = today;
      changed = true;
    });

    if (changed) {
      setState((prev) => {
        const next = { ...prev, lastNotified: newLastNotified };
        saveNotifState(next);
        return next;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.enabled, state.leadHours, permission]);

  return {
    notifEnabled: state.enabled,
    notifPermission: permission,
    leadHours: state.leadHours,
    setEnabled,
    setLeadHours,
    requestPermission,
  };
}
