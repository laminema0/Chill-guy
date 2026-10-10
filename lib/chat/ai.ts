// Public backend address only. The Groq key must never be included in the app.
export const CHAT_ENDPOINT = 'https://rough-voice-a344.amin-ranjbar77.workers.dev/chat';
export type ChatMessage = { role: 'user' | 'assistant'; content: string };
export type ChatReply = { reply: string; help: boolean };

export function boundedHistory(messages: ChatMessage[]): ChatMessage[] {
  const recent = messages.slice(-11);
  while (recent.length > 1 && recent.reduce((total, message) => total + message.content.length, 0) > 9000) recent.shift();
  return recent;
}

export async function askChillGuy(messages: ChatMessage[], controller: AbortController): Promise<ChatReply> {
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: boundedHistory(messages) }),
      signal: controller.signal,
    });
    if (!response.ok) {
      if (response.status === 429) throw new Error('AI chat is busy or its free allowance is used up. Please try later, or take a breathing break.');
      if (response.status === 503) throw new Error('AI chat is not ready right now. Please try later, or use breathing.');
      throw new Error('Could not get an AI reply. Your message is ready to send again.');
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('reply' in result) || typeof result.reply !== 'string' || !result.reply.trim()) {
      throw new Error('The AI returned an empty reply. Please try again.');
    }
    return { reply: result.reply, help: 'help' in result && result.help === true };
  } catch (error) {
    if (controller.signal.aborted) throw new Error('The AI took too long to answer. Please try again.');
    if (error instanceof TypeError) throw new Error('Could not reach AI chat. Check your connection and try again.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
