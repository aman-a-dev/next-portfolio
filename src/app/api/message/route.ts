// app/api/message/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type ContactData = {
  name: string;
  contact: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();
    const { name, contact, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { ok: false, msg: "All fields are required" },
        { status: 400 },
      );
    }

    // Check environment variables
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials missing");
      return NextResponse.json(
        { ok: false, msg: "Server configuration error" },
        { status: 500 },
      );
    }

    const data: ContactData = { name, contact, message };

    // Send to Telegram and wait for result to provide better feedback
    await sendToTelegram(data);

    return NextResponse.json({ ok: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        ok: false,
        msg: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}

async function sendToTelegram(data: ContactData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram credentials not configured");
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

  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const time = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} - ${hours}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;

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
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML", // Using HTML instead of Markdown for better compatibility
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Telegram API error: ${response.status} - ${errorText}`);
    throw new Error(`Telegram API error: ${response.status}`);
  }
}
