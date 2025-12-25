"use client";
import Image from "next/image";
import Stack from "@/components/core/stack";
import { useIsMobile } from "@/hooks/use-mobile";
const images = [
   {
      id: 1,
      img: "/certificates/html.webp" // Remove @ and .. prefixes
   },
   {
      id: 2,
      img: "/certificates/css.webp"
   },
   {
      id: 3,
      img: "/certificates/js.webp"
   },
   {
      id: 5,
      img: "/certificates/react2.webp"
   },
   {
      id: 6,
      img: "/certificates/node.webp"
   },
   {
      id: 7,
      img: "/certificates/mysql.webp"
   }
];

export default function Certificate() {
   const isMobile = useIsMobile();
   return (
      <div>
         <h1 className='section_heading mb-10'>Certificates</h1>
         <div className='flex justify-center items-center my-10'>
            <Stack
               randomRotation={true}
               sensitivity={180}
               sendToBackOnClick={false}
               cardDimensions={{
                  width: isMobile ? 300 : 400,
                  height: isMobile ? 200 : 300
               }}
               cardsData={images}
            />
         </div>
      </div>
   );
}
