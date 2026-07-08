import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { waitUntil } from "@vercel/functions";
import { UAParser } from "ua-parser-js";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/html")) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  const path = request.nextUrl.pathname;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  const deviceInfo = formatDeviceInfo(result);
  const osInfo =
    `${result.os.name || "Unknown OS"} ${result.os.version || ""}`.trim();
  const browserInfo =
    `${result.browser.name || "Unknown Browser"} ${result.browser.version || ""}`.trim();

  waitUntil(
    sendToTelegram({
      path,
      ip,
      device: deviceInfo,
      os: osInfo,
      browser: browserInfo,
      timestamp: new Date().toISOString(),
    }).catch((err) => console.error("Telegram send failed:", err)),
  );

  return NextResponse.next();
}

function formatDeviceInfo(parsed: UAParser.IResult): string {
  const { device, os } = parsed;
  let type = device.type || "Desktop";
  if (type === "mobile") type = "📱 Mobile";
  else if (type === "tablet") type = "📟 Tablet";
  else if (type === "console") type = "🎮 Console";
  else if (type === "smarttv") type = "📺 Smart TV";
  else if (type === "wearable") type = "⌚ Wearable";
  else if (type === "embedded") type = "📟 Embedded";
  else type = "🖥️ Desktop";

  let model = device.model ? ` ${device.model}` : "";
  let vendor = device.vendor ? ` (${device.vendor})` : "";
  if (!model && !vendor) model = "";

  return `${type}${model}${vendor}`.trim();
}

async function sendToTelegram(data: {
  path: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  timestamp: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const message = `🔔 *Page Visit*
📂 *Path:* ${data.path}
🌐 *IP:* ${data.ip}
📱 *Device:* ${data.device}
💻 *OS:* ${data.os}
🌍 *Browser:* ${data.browser}
🕒 *Time:* ${data.timestamp}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  });
}

// Optional: limit which paths trigger this
export const config = {
  matcher: ["/:path*"],
};
