'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BorderTrail } from '@/components/core/border-trail'
import { useState } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'motion/react'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

export default function ContactComp() {
   const [form, setForm] = useState({
      name: '',
      email: '',
      message: ''
   })
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [success, setSuccess] = useState(null)

   const handleChange = e => {
      const { name, value } = e.target
      setForm({ ...form, [name]: value })
      setError(null)
      setSuccess(null)
   }

   const validateForm = () => {
      const errors = []
      if (!form.name.trim()) errors.push('Name is required.')
      if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
         errors.push('A valid email is required.')
      if (!form.message.trim()) errors.push('Message cannot be empty.')
      if (form.message.trim().length < 8)
         errors.push('Message must be greater than 8 character.')
      return errors
   }

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)
      setError(null)
      setSuccess(null)

      const errors = validateForm()
      if (errors.length > 0) {
         setError(errors.join(' '))
         setLoading(false)
         return
      }

      try {
         const res = await axios.post('/api/message', form)
         if (res.data.success) {
            setSuccess('Message sent successfully ✅️')
            setForm({ name: '', email: '', message: '' })
         } else {
            setError(res.data.msg || 'Failed to send message ❌️')
         }
      } catch (err) {
         console.error(err)
         setError('Server error occurred ❌️')
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className='my-10'>
         {error &&
            toast.error('An error occurred.', {
               description: error,
               action: {
                  label: 'Dismise'
               }
            })}
         {success &&
            toast.success('You have send the message successfully 😄.', {
               description: success + ' I will reply with your email.',
               action: {
                  label: 'Dismise'
               }
            })}
         <div className='flex items-center justify-center flex-col'>
            <section className='pt-10 text-center max-w-4xl mx-auto'>
               <h1 className='section_heading text-5xl font-black bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent mb-6'>
                  Contact Me
               </h1>
               <p className='text-xl md:text-2xl text-muted-foreground mb-20'>
                  Get in touch with me.
               </p>
            </section>
            <form
               className='m-3 flex flex-col gap-3 w-[90%] md:w-[60%] lg:w-[45%]'
               onSubmit={handleSubmit}
            >
               <Input
                  type='text'
                  name='name'
                  placeholder='Your Name'
                  value={form.name}
                  onChange={handleChange}
               />
               <Input
                  type='email'
                  name='email'
                  placeholder='Your Email'
                  value={form.email}
                  onChange={handleChange}
               />
               <BorderTrailTextarea
                  name='message'
                  placeholder='Your Message'
                  value={form.message}
                  onChange={handleChange}
               />
               <Button
                  type='submit'
                  disabled={loading}
               >
                  {loading ? (
                     <div className='flex items-center justify-center gap-1'>
                        <Spinner />
                        <span>Sending...</span>
                     </div>
                  ) : (
                     'Submit'
                  )}
               </Button>
            </form>
         </div>
      </div>
   )
}

export function BorderTrailTextarea({ ...props }) {
   return (
      <div className='relative w-full h-[160px] overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-hidden dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300'>
         <textarea
            {...props}
            className='h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-hidden'
         />
         <BorderTrail
            className='bg-linear-to-l from-red-200 via-red-500 to-red-200 dark:from-red-400 dark:via-red-500 dark:to-red-700'
            size={120}
         />
      </div>
   )
}
