import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent
} from "@/components/core/accordion";
import { ChevronRight, Github, ExternalLink } from "lucide-react";

export default function Card({
   src,
   alt,
   title,
   desc,
   demo,
   git,
   teck,
}) {
   return (
      <div className='flex flex-col p-5 shadow-md dark:shadow-black rounded border dark:border-neutral-800 hover:scale-[1.02] transition-transform duration-300 w-full bg-white dark:bg-neutral-900'>
         <div className='overflow-hidden rounded'>
            <Image
               src={src}
               width={600}
               height={350}
               alt={alt}
               className='w-full h-48 lg:object-cover  transition-transform duration-300 hover:scale-105'
               placeholder='empty'
               priority
            />
         </div>

         <h1 className='text-xl font-semibold mt-3 mb-2 dark:text-white'>
            {title}
         </h1>

         <AccordionVariant>{desc}</AccordionVariant>

         <ul className='my-3 flex flex-wrap gap-2'>
            {teck.map((t, i) => (
               <Badge key={i} variant='secondary' className='px-2 py-1 text-sm'>
                  {t}
               </Badge>
            ))}
         </ul>

         <div className='flex items-center justify-between mt-2'>
            <a href={git} target='_blank' rel='noopener noreferrer'>
               <Button variant='outline'>
                  <span>GitHub</span>
                  <Github />
               </Button>
            </a>
            <a href={demo} target='_blank' rel='noopener noreferrer'>
               <Button>
                  <span>Live Demo</span>
                  <ExternalLink />
               </Button>
            </a>
         </div>
      </div>
   );
}

export function AccordionVariant({ children }) {
   return (
      <Accordion
         className='flex w-full flex-col'
         transition={{ type: "spring", stiffness: 120, damping: 20 }}
         variants={{
            expanded: {
               opacity: 1,
               scale: 1
            },
            collapsed: {
               opacity: 0,
               scale: 0.7
            }
         }}
      >
         <AccordionItem value='getting-started' className='py-2'>
            <AccordionTrigger className='w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50'>
               <div className='flex items-center'>
                  <ChevronRight className='h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50' />
                  <div className='ml-2 text-zinc-950 dark:text-zinc-50'>
                     Description
                  </div>
               </div>
            </AccordionTrigger>
            <AccordionContent className='origin-left'>
               <p className='pl-6 pr-2 text-zinc-500 dark:text-zinc-400'>
                  {children}
               </p>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   );
}
