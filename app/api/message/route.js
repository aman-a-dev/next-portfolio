import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
   try {
      const { name, email, message } = await request.json();
      if (!name || !email || !message) {
         NextResponse.json({ success: false,msg: "All inputs are required."  });
      }
      const client = twilio(
         process.env.TWILIO_ACCOUNT_SID,
         process.env.TWILIO_AUTH_TOKEN
      );

      await client.messages.create({
         messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
         to: process.env.YOUR_PHONE_NUMBER,
         body: `
📩 Portfolio Message
👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
         `
      });

      return NextResponse.json({ success: true }, { status: 200 });
   } catch (error) {
      console.error("❌ Twilio Error:", error);
      return NextResponse.json(
         { success: false, msg: "Server error occurred" },
         { status: 500 }
      );
   }
}

export async function GET() {
   return NextResponse.json({
      success: true,
      msg: "Aman Portfolio API is running 🚀"
   });
}
