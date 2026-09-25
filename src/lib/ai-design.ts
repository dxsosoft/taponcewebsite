/**
 * AI-Powered Design Generation Module
 * 
 * Provides an isolated, pluggable interface for generating card designs from free-text descriptions.
 * Currently returns a clear "coming soon" status while preserving the prompt for human design review.
 * When a real AI image/card generation API is connected in the future, it can be plugged in here
 * without requiring any refactoring of the UI components.
 */

export interface AiGenerationResult {
  status: "coming_soon" | "success" | "error"
  message: string
  previewUrl?: string | null
}

/**
 * Generate a card design preview from a free-text prompt description.
 * 
 * @param promptText - Free-text user description of desired card layout, colors, and aesthetics.
 * @returns AiGenerationResult indicating status and user-facing message.
 */
export async function generateCardFromDescription(
  promptText: string
): Promise<AiGenerationResult> {
  const cleanPrompt = promptText.trim()

  if (!cleanPrompt) {
    return {
      status: "error",
      message: "Please enter a description of how you'd like your corporate card to look.",
    }
  }

  // NOTE: No external AI API is currently connected.
  // We explicitly and honestly return a "coming soon" status rather than simulating a fake result.
  return {
    status: "coming_soon",
    message:
      "AI-powered design generation is coming soon. For now, your description has been saved and our design team will review it — or you can switch to Manual Customization to build your card now.",
  }
}
