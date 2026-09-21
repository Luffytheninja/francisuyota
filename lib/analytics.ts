/**
 * Analytics helpers for Google Analytics 4 and Plausible.
 * Import and call these from client components for event tracking.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Log a GA4 page view (called automatically via next/script) */
export function gaPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag && GA_ID) {
    window.gtag('config', GA_ID, { page_path: url });
  }
}

/** Log a custom GA4 event */
export function gaEvent({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

/** Log a custom Plausible event */
export function plausibleEvent(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props });
  }
}

/** Track project view (both GA4 + Plausible) */
export function trackProjectView(title: string, category: string) {
  gaEvent({ action: 'project_view', category: 'portfolio', label: title });
  plausibleEvent('Project View', { title, category });
}

/** Track showreel open */
export function trackShowreelOpen() {
  gaEvent({ action: 'showreel_open', category: 'engagement' });
  plausibleEvent('Showreel Open');
}

/** Track contact form submit */
export function trackContactSubmit(projectType?: string) {
  gaEvent({ action: 'contact_submit', category: 'leads', label: projectType });
  plausibleEvent('Contact Submit', { projectType: projectType ?? 'general' });
}
