import type { EventLogEntry } from '../types';

interface EventFeedProps {
  events: EventLogEntry[];
}

const toneClass: Record<EventLogEntry['tone'], string> = {
  info: 'event-info',
  success: 'event-success',
  danger: 'event-danger',
};

export const EventFeed = ({ events }: EventFeedProps) => (
  <section className="event-feed" aria-live="polite">
    <h3>Island Feed</h3>
    <ul>
      {events.map((event) => (
        <li key={event.id} className={toneClass[event.tone]}>
          <span>{event.message}</span>
        </li>
      ))}
    </ul>
  </section>
);
