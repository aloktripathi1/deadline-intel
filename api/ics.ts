import type { VercelRequest, VercelResponse } from '@vercel/node';

// Proxy Google Calendar ICS feeds to avoid CORS restrictions.
// Only allows fetching from group.calendar.google.com (public calendars).
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const calId = req.query.calId;
  if (!calId || typeof calId !== 'string') {
    return res.status(400).json({ error: 'calId query param required' });
  }

  // Security: only allow Google Calendar group calendar IDs
  const safe = /^c[_^][a-z0-9@._]+group\.calendar\.google\.com$/i.test(calId)
    || /^[a-z0-9_-]+@group\.calendar\.google\.com$/i.test(calId)
    || /^[a-z0-9_]+@gmail\.com$/i.test(calId);

  if (!safe) {
    return res.status(400).json({ error: 'Invalid calendar ID' });
  }

  const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calId)}/public/basic.ics`;

  try {
    const upstream = await fetch(icsUrl, {
      headers: { 'User-Agent': 'DeadlineIntel/1.0' },
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `Google Calendar returned ${upstream.status}` });
    }
    const text = await upstream.text();
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');
    return res.status(200).send(text);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch calendar' });
  }
}
