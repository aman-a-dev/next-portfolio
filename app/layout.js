import './globals.css'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { ThemeProvider } from 'next-themes'
import { mainFont } from '@/components/font'
import { Toaster } from '@/components/ui/sonner'
import { GravityStarsBackground } from '@/components/bg'

export default function RootLayout({ children }) {
   return (
      <html
         lang='en'
         suppressHydrationWarning
      >
         <body className={`${mainFont.className} flex flex-col`}>
            {' '}
            <GravityStarsBackground/>
            <ThemeProvider
               attribute='class'
               defaultTheme='light'
               enableSystem
            >
               <Toaster />
               <Nav />
               <main className='mt-16 flex-1'>{children}</main>
               <Footer />
            </ThemeProvider>
         </body>
      </html>
   )
}

export const metadata = {
   metadataBase: new URL('https://amanadev.vercel.app'),
   title: {
      default: 'Amanuel Antenh | Full-Stack Web Developer',
      template: '%s | Amanuel Antenh'
   },
   description:
      'Amanuel Antenh is a full-stack web developer specializing in modern web apps using Next.js, React, Node.js, and Tailwind CSS. Explore my portfolio and services.',
   authors: [
      {
         name: 'Amanuel Antenh',
         url: 'https://www.github.com/aman-a-dev'
      }
   ],
   keywords: [
      'Amanuel Antenh',
      'Full stack developer',
      'Web developer',
      'React.js developer',
      'Next.js developer',
      'Node.js developer',
      'Frontend developer',
      'Backend developer',
      'Portfolio website',
      'Freelance developer',
      'UI/UX design',
      'Responsive web design',
      'Web application development',
      'Tailwind CSS',
      'Modern web apps',
      'Software engineer',
      'API development',
      'Mobile-friendly websites',
      'Personal portfolio',
      'Projects showcase'
   ],
   openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      title: 'Amanuel Antenh | Full-Stack Web Developer',
      description:
         'Explore the portfolio and projects of Amanuel Antenh, a skilled full-stack developer using Next.js, React, Node.js, and Tailwind CSS.',
      siteName: 'Amanuel Antenh Portfolio',
      images: [
         {
            url: '/og-main.png',
            width: 1200,
            height: 630,
            alt: 'Amanuel Antenh Portfolio'
         }
      ]
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Amanuel Antenh Portfolio',
      description:
         'Full-stack developer portfolio. Explore projects, services, and get in touch.',
      images: ['/og-main.png'],
      creator: '@AmanuelAntenh'
   }
}
