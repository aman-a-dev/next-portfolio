import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
   return (
      <div className='text-center flex flex-col items-center justify-center gap-5 h-[90vh]'>
         <h1 className='text-9xl font-black'>404</h1>
         <p>This route/page doesn&apos;t exist.</p>
         <Link href='/'>
            <Button>Go to home</Button>
         </Link>
      </div>
   );
}