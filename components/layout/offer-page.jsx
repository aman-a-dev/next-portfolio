"use client";

import ScrollRevealContentA from "@/components/core/scroll-reveal";

const ContentA = {
   title: "Zero Risk Guarantee",
   description:
      "Pay nothing until launch. 100% satisfaction or full refund + keep the code."
};

const ContentB = {
   title: "Flexible Payments",
   description:
      "50% at start, 50% on completion. No upfront risk, clear milestones."
};

const ContentC = {
   title: "Bonus Design Services",
   description:
      "Free graphic design for logo & branding when you choose our partnership."
};

export default function Offer() {
   return (
      <div className='min-h-screen bg-gradient-to-b from-background to-muted/30'>
         <section className='pt-32 text-center max-w-4xl mx-auto'>
            <h1 className='section_heading text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent mb-6'>
               Risk-Free Development
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground mb-20'>
               Scroll to discover our ironclad guarantees
            </p>
         </section>

         <ScrollRevealContentA
            contentA={ContentA}
            contentB={ContentB}
            contentC={ContentC}
            className='mb-32'
         />

         <section className='max-w-4xl mx-auto px-6 pb-32'>
            <ul className='grid gap-6 text-xl mb-20 max-w-2xl mx-auto'>
               <li className='flex items-start gap-4 p-6 bg-card/50 rounded-2xl border-l-4 border-primary'>
                  <span className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary flex-shrink-0 mt-1'>
                     ✓
                  </span>
                  <span>
                     Pay nothing until the project is launched and you are 100%
                     satisfied.
                  </span>
               </li>
               <li className='flex items-start gap-4 p-6 bg-card/50 rounded-2xl border-l-4 border-primary'>
                  <span className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary flex-shrink-0 mt-1'>
                     ✓
                  </span>
                  <span>
                     If not satisfied within 15 days of launch, full refund AND
                     you keep the code.
                  </span>
               </li>
               <li className='flex items-start gap-4 p-6 bg-card/50 rounded-2xl border-l-4 border-primary'>
                  <span className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary flex-shrink-0 mt-1'>
                     ✓
                  </span>
                  <span>
                     Bonus: Free graphic design services for your website logo
                     and brand.
                  </span>
               </li>
            </ul>

            <div className='space-y-12'>
               <div>
                  <h2 className='font-black text-4xl md:text-5xl my-8 text-center'>
                     How the payment works
                  </h2>
                  <p className='text-xl md:text-2xl text-center max-w-3xl mx-auto leading-relaxed'>
                     You pay 50% when I start building (milestone 1) and 50% on
                     completion (when finished and delivered).
                  </p>
               </div>

               <div className='bg-gradient-to-r from-primary/5 to-secondary/5 p-12 rounded-3xl border border-primary/20'>
                  <h2 className='font-black text-4xl md:text-5xl my-8 text-center'>
                     Our Risk Guarantee
                  </h2>
                  <p className='max-w-3xl w-[90%] mx-auto leading-[1.6] text-muted-foreground leading-7 [&:not(:first-child)]:mt-6'>
                     I believe partnerships should be built on trust and shared
                     success. You won't pay the final balance until you've
                     approved and launched. Protected by our 15-Day Satisfaction
                     Guarantee—if it doesn't meet specs after launch, we fix it
                     or you get a full refund. My goal: become your long-term
                     tech partner.
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}
