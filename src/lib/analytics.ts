export function trackEvent(eventName: string, props?: Record<string, any>) {
  // Stub for analytics event tracking
  // In a real application, you might use Mixpanel, Google Analytics, PostHog, etc.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics] Event tracked: ${eventName}`, props || {});
  }
}
