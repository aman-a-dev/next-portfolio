"use client";

import { Intro } from "@/components/common/intro";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // make sure this exists
import { toast } from "sonner";
import { useState } from "react";

interface FormData {
  name: string;
  contact: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // sends { name, contact, message }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Something went wrong");
      }

      toast.success(data.msg || "Message sent successfully!");
      setFormData({ name: "", contact: "", message: "" }); // reset form
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Intro
          icon={<MessageCircle />}
          badge="Contact"
          heading="Get In"
          highlight="Touch"
          paragraph="Let's talk about your next level project."
        />
        <Card>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jon Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="@jondoe or jondoe@gmail.com"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Telegram username, phone number, or email so I can
                  reach you later.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hi, I would like to hire you for a web project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
