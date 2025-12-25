import Link from "next/link";
import { Mail, Twitter, Github, Send, Linkedin } from "lucide-react";
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Bg } from "@/components/bg";
import { Sparkles } from "lucide-react";

const footerLinks = [
   {
      name: "Telegram",
      icon: <Send />,
      href: "https://t.me/aman_a_dev",
      badge: true
   },
   {
      name: "Email",
      icon: <Mail />,
      href: "mailto:amanuelantenha@gmail.com",
   },
   { name: "Github", icon: <Github />, href: "https://github.com/aman-a-dev" },
   { name: "Twitter", icon: <Twitter />, href: "https://x.com/Aman_A_Dev" },
   {
      name: "Linkedin",
      icon: <Linkedin />,
      href: "https://www.linkedin.com/in/amanuel-antenh-20657436a"
   }
];
export default function Footer() {
   return (
      <Bg>
         <footer className=''>
            <div className='ml-5'>
               <h3>
                  About me{" "}
                  <small className='text-muted-foreground'>(in short)</small>
               </h3>
               <p className='text-muted-foreground w-[75%]'>
                  I am a FSD developers who creat high-quality digital Full
                  Stack websites.
               </p>
            </div>
            <div className='flex p-5 mt-4 gap-7 md:gap-10 justify-evenly md:justify-start'>
               {footerLinks.map((item, i) => (
                  <a
                     href={item.href}
                     key={i}
                     className='text-foreground hover:bg-muted rounded-lg p-2 transition-colors duration-200  flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-zinc-400 dark:from-zinc-900 dark:to-zinc-600  shadow-lg relative'
                  >
                     {item.badge && (
                        <Badge className='absolute -top-3 left-3 rotate-45 text-[10px] leading-none font-medium'>
                           <Sparkles />
                           <span>Fast</span>
                        </Badge>
                     )}
                     <Tooltip>
                        <TooltipContent>{item.name}</TooltipContent>
                        <TooltipTrigger>{item.icon}</TooltipTrigger>
                     </Tooltip>
                  </a>
               ))}
            </div>
         </footer>
      </Bg>
   );
}
