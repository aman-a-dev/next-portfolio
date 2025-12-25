"use client";
import Image from "next/image";
import MyImgLight from "@/public/avatar/me-light.png";
import MyImgDark from "@/public/avatar/me-dark.png";
import ClientOnly from "@/components/client-only";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import { TextEffect } from "@/components/text/text-effect";
import { DynamicText } from "@/components/text/dynamic-text";
import { MagneticNested } from "@/components/core/magnetic";
import { SpinningTextBasic } from "@/components/text/spinning-text";
import { Download } from "lucide-react";
import { Tilt } from "@/components/core/tilt";
import { Suspense } from "react";
import { motion } from "motion/react";

export default function Hero() {
   const isMobile = useIsMobile();
   const { theme } = useTheme();
   return (
      <Suspense>
         <div className='h-[560px] lg:h-[300px] bg-gray-200 flex flex-col my-5 mx-0 md:flex-row md:justify-around dark:bg-zinc-800/50 relative overflow-hidden'>
            <div className='flex flex-col gap-3 items-start pl-4 pt-5'>
               <h1 className='text-center text-3xl  md:text-5xl font-black md:text-start'>
                  <TextLoopBasic />
               </h1>
               <TextEffect
                  per='word'
                  as='h3'
                  preset='slide'
                  className='text-1xl text-muted-foreground'
               >
                  Full Stack Web Developer
               </TextEffect>
               <a
                  href='/document/aman_cv_v5.pdf'
                  download='amans_cv.pdf'
                  onClick={() =>
                     toast.success("Downloading the CV.", {
                        action: {
                           label: "Ok"
                        }
                     })
                  }
               >
                  <motion.div
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.5 }}
                  >
                     <MagneticNested>
                        <span>Download CV</span>
                        <Download />
                     </MagneticNested>
                  </motion.div>
               </a>
            </div>
            <div className='flex items-center justify-center md:items-end'>
               <ClientOnly>
                  <Tilt
                     rotationFactor={10}
                     isRevese
                  >
                     <motion.div
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                     >
                        <Image
                           src={theme == "light" ? MyImgLight : MyImgDark}
                           width={300}
                           height={300}
                           alt='Amanuel Anteneh image'
                           className='w-[500] md:w-[300]'
                           placeholder='empty'
                           priority
                        />
                     </motion.div>
                  </Tilt>
               </ClientOnly>
            </div>
            <SpinningTextBasic className='left-10 bottom-10 mix-blend-difference text-white'>
               Fast • Responsive • Cool •
            </SpinningTextBasic>
            <SpinningTextBasic className='right-10 top-12'>
               Design • build • deploy •
            </SpinningTextBasic>
         </div>
      </Suspense>
   );
}

import { TextLoop } from "@/components/text/text-loop";

export function TextLoopBasic() {
   return (
      <TextLoop>
         <span>Amanuel Anteneh</span>
         <span>Aman dev</span>
         <span>Hi,I'm Aman</span>
      </TextLoop>
   );
}
