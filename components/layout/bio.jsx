import { Tilt } from "@/components/core/tilt";
import { BorderTrail } from "@/components/core/border-trail";

export default function Bio() {
   return (
      <Tilt rotationFactor={10} isRevese>
         <div
            className='flex items-center justify-center flex-col text-sm lg:text-2xl'
            id='#bio'
         >
            <BorderTrailCard>
               <div>
                  <h1 className='section_heading'>Bio</h1>
                  Hi, I'm Aman, a professional Full Stack Developer skilled{" "}
                  <a
                     href='#skills'
                     className='dark:text-black text-white bg-zinc-800 dark:bg-gray-200 p-1 rounded'
                  >
                     in the following
                  </a>{" "}
                  gained through dedicated coursework and hands-on
                  projects.Recently, I completed a full-stack development
                  projects where I built several applications .I am passionate
                  about creating user-friendly interfaces and eager to
                  contribute to exciting projects that challenge my skills and
                  involve collaboration with talented teams.
               </div>
            </BorderTrailCard>
         </div>
      </Tilt>
   );
}

export function BorderTrailCard({ children }) {
   return (
      <div className='text-center relative flex w-[95%] md:w-[65%] xl:w-[45%] flex-col items-center justify-center rounded-md py-5 bg-zinc-200 px-5 py-2 dark:bg-zinc-800 '>
         <BorderTrail
            style={{
               boxShadow:
                  "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)"
            }}
            size={100}
         />
         {children}
      </div>
   );
}

                      