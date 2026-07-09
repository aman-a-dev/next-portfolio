import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import {
  sendTelegramMessage,
  formatVisitorMessage,
  VisitorData,
} from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { path, userAgent, referrer, language, screenSize } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Get IP address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    // Parse user agent
    const parser = new UAParser(userAgent || "");
    const result = parser.getResult();

    // Format device info
    const deviceInfo = formatDeviceInfo(result);
    const osInfo =
      `${result.os.name || "Unknown OS"} ${result.os.version || ""}`.trim();
    const browserInfo =
      `${result.browser.name || "Unknown Browser"} ${result.browser.version || ""}`.trim();

    // Prepare visitor data
    const visitorData: VisitorData = {
      path,
      ip,
      device: deviceInfo,
      os: osInfo,
      browser: browserInfo,
      timestamp: new Date().toISOString(),
      referrer: referrer || undefined,
      language: language || undefined,
      screenSize: screenSize || undefined,
    };

    // Send to Telegram (fire and forget)
    const message = formatVisitorMessage(visitorData);
    sendTelegramMessage(message).catch((err) =>
      console.error("Failed to send Telegram message:", err),
    );

    // Return success
    return NextResponse.json({
      success: true,
      message: "Visit tracked successfully",
    });
  } catch (error) {
    console.error("❌ Error tracking visit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function formatDeviceInfo(parsed: UAParser.IResult): string {
  const { device, os } = parsed;

  // Determine device type
  let type = device.type || "Desktop";
  const typeMap: Record<string, string> = {
    mobile: "📱 Mobile",
    tablet: "📟 Tablet",
    console: "🎮 Console",
    smarttv: "📺 Smart TV",
    wearable: "⌚ Wearable",
    embedded: "📟 Embedded",
  };
  type = typeMap[type] || "🖥️ Desktop";

  // Add model and vendor
  let model = device.model ? ` ${device.model}` : "";
  let vendor = device.vendor ? ` (${device.vendor})` : "";

  // If no model or vendor, don't show empty parentheses
  if (!model && !vendor) {
    model = "";
    vendor = "";
  }

  return `${type}${model}${vendor}`.trim();
}
