import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type ContactData = {
  name: string;
  contact: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body instead of form data
    const body = await request.json();
    const { name, contact, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { ok: false, msg: "All fields are required" },
        { status: 400 },
      );
    }

    const data: ContactData = { name, contact, message };

    // Fire-and-forget with error logging
    sendToTelegram(data).catch((error) => {
      console.error("Failed to send to Telegram:", error);
    });

    return NextResponse.json({ ok: true, msg: "Message sent successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { ok: false, msg: "Internal server error" },
      { status: 500 },
    );
  }
}

async function sendToTelegram(data: ContactData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram credentials missing – message not sent");
    return;
  }

  const d = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert hours to 12‑hour format
  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 0 becomes 12

  const time = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hours}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
  // Example: "8 Jul 2026 - 12:49 PM"
  const message = `
👨‍💼 New Client
🏷 Name: ${data.name}
📞 Contact: ${data.contact}
📩 Message: ${data.message}
⏲️ Time: ${time}
`.trim();

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram API error (${response.status}): ${errorText}`);
  }
}
