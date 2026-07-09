import Link from "next/link";
import { Button } from "@/components/ui/button";
import { momoSignatureFont } from "@/fonts/font";

export default function NotFound() {
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center gap-5 h-[90vh]">
      <h1 className={`${momoSignatureFont.className} text-9xl font-black`}>
        404
      </h1>
      <p>This page doesn&apos;t exist.</p>
      <Link href="/">
        <Button>Go to home</Button>
      </Link>
    </div>
  );
}
