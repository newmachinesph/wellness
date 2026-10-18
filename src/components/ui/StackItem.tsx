import type { ReactNode } from "react";

/**
 * Wraps a section so it participates in the sticky "stacking panels" effect on
 * desktop: the section pins to the top of the viewport, and the next StackItem
 * scrolls up and covers it. Falls back to normal flow on mobile (< lg).
 */
export default function StackItem({ children }: { children: ReactNode }) {
  return <div className="lg:sticky lg:top-0">{children}</div>;
}
