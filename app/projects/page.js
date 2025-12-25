import Card from "@/components/core/card";
import { workList } from "@/components/works-list";
export const metadata = {
   title: "Projects",
   description:
      "Selected real-world projects I’ve built — from web apps to complex full-stack systems."
};
export default function Projects() {
   return (
      <div className='my-4 mb-10'>
         <section className='pt-10 text-center max-w-4xl mx-auto'>
            <h1 className='text-5xl font-black bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent mb-6'>
               Projects
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground mb-20'>
               Explore my previous works.
            </p>
         </section>{" "}
         <div className='flex flex-col gap-1 lg:gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 lg:w-[90%] lg:mx-auto items-start'>
            {workList.map((work, index) => (
               <Card
                  key={index}
                  alt={work.alt}
                  src={work.src}
                  title={work.title}
                  desc={work.desc}
                  demo={work.demo}
                  git={work.git}
                  teck={work.teck}
               />
            ))}
         </div>
      </div>
   );
}
