import Link from 'next/link'
import { Mail, Twitter, Github, Send, Linkedin } from 'lucide-react'
import {
   Tooltip,
   TooltipTrigger,
   TooltipContent
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Bg } from '@/components/bg'
import { Sparkles } from 'lucide-react'

const footerLinks = [
   {
      name: 'Telegram',
      icon: <Send />,
      href: 'https://t.me/aman_a_dev',
      badge: true
   },
   {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: '',
      badge: true
   },
   {
      name: 'Email',
      icon: <Mail />,
      href: 'mailto:amanuelantenha@gmail.com'
   },
   { name: 'Github', icon: <Github />, href: 'https://github.com/aman-a-dev' },
   { name: 'Twitter', icon: <Twitter />, href: 'https://x.com/Aman_A_Dev' }
   /*{
      name: 'Linkedin',
      icon: <Linkedin />,
      href: 'https://www.linkedin.com/in/amanuel-antenh-20657436a'
   }*/
]
export default function Footer() {
   return (
      <Bg>
         <footer className=''>
            <div className='ml-5'>
               <h3>
                  About me{' '}
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
   )
}

function WhatsAppIcon() {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         x='0px'
         y='0px'
         width='25'
         height='25'
         className='text-black dark:text-white'
         fill='currentColor'
         viewBox='0 0 50 50'
      >
         <path d='M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z'></path>
      </svg>
   )
}
