import Link from "next/link";
import { cn } from "@/lib/utils";
import { BorderTrail } from "@/components/core/border-trail";

export default function Offer() {
   return (
      <div className='flex flex-col justify-center items-center my-5'>
         <h1 className='section_heading'>Offer</h1>
         <BorderTrailCard2>
            <h2>
               Pay nothing until the project is launched and you are 100%
               satisfied.{" "}
               <Link
                  href='/offer'
                  className='underline text-black dark:text-white'
               >
                  Learn more
               </Link>
            </h2>
         </BorderTrailCard2>
      </div>
   );
}

export function BorderTrailCard2({ children }) {
   return (
      <div className='relative w-[90%] md:w-[500px] rounded-md border border-zinc-300/40 bg-zinc-100 px-4 py-3 dark:border-zinc-700/40 dark:bg-zinc-900'>
         <BorderTrail
            className={cn(
               "bg-linear-to-l from-black to-gray-300 transition-opacity duration-300 dark:from-white dark:to-zinc-800 opacity-100"
            )}
            size={150}
            transition={{
               ease: [0, 0.5, 0.8, 0.5],
               duration: 4,
               repeat: 100
            }}
         />
         <>{children}</>
      </div>
   );
}
