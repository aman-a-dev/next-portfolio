'use client'

import Card from '@/components/core/card'
import { workList } from '@/components/works-list'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Handbag } from 'lucide-react'

export default function Works() {
   return (
      <div className='w-full'>
         <h1 className='section_heading py-5'>Previous works</h1>
         <div className='flex flex-col gap-6 lg:gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:w-[90%] lg:mx-auto items-start'>
            {workList.slice(0, 3).map((work, index) => (
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
         <div className='flex justify-center items-center mt-8 mb-4'>
            <Link
               href='/projects'
               className='text-center'
            >
               <Button>
                  <span>More</span>
                  <Handbag />
               </Button>
            </Link>
         </div>
      </div>
   )
}


