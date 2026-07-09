export interface VisitorData {
  path: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  timestamp: string;
  referrer?: string;
  language?: string;
  screenSize?: string;
}

export interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: string;
}

export async function sendTelegramMessage(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("❌ Telegram credentials missing");
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Telegram API error (${response.status}):`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Failed to send Telegram message:", error);
    return false;
  }
}

export function formatVisitorMessage(data: VisitorData): string {
  const emoji = getDeviceEmoji(data.device);

  // Format timestamp
  const date = new Date(data.timestamp);
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `
🔔 <b>New Page Visit</b>
━━━━━━━━━━━━━━━━━━
📂 <b>Path:</b> <code>${data.path}</code>
🌐 <b>IP:</b> ${data.ip}
${data.referrer ? `🔗 <b>Referrer:</b> ${data.referrer}\n` : ""}${emoji} <b>Device:</b> ${data.device}
💻 <b>OS:</b> ${data.os}
🌍 <b>Browser:</b> ${data.browser}
${data.language ? `🌐 <b>Language:</b> ${data.language}\n` : ""}${data.screenSize ? `📐 <b>Screen:</b> ${data.screenSize}\n` : ""}🕐 <b>Time:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━
  `.trim();
}

function getDeviceEmoji(device: string): string {
  if (device.includes("Mobile")) return "📱";
  if (device.includes("Tablet")) return "📟";
  if (device.includes("Desktop")) return "🖥️";
  if (device.includes("Smart TV")) return "📺";
  if (device.includes("Console")) return "🎮";
  if (device.includes("Wearable")) return "⌚";
  return "💻";
}
