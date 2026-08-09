/**
 * Send a notification to the company Telegram bot.
 * All form submissions (contact, calculator, reviews) fire this so the company
 * gets instant alerts on every lead.
 */

const BOT_TOKEN = '8803646518:AAG6Pxl1oFs7OXkjwDo31r274hVXtefme98';
const CHAT_ID = '7871693909';

export async function sendTelegram(message: string): Promise<void> {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch {
    // Silent fail — don't block form submission
  }
}

export function formatLeadMessage(type: string, data: Record<string, any>): string {
  const lines = [`🔔 <b>New ${type}</b>`, ''];
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`<b>${label}:</b> ${value}`);
    }
  }
  lines.push('', `🕐 ${new Date().toLocaleString()}`);
  return lines.join('\n');
}
