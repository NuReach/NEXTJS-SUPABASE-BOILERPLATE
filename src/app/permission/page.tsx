import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function PermissionPage() {
  return (
    <div className='w-screen p-9 h-screen flex flex-col gap-6 justify-center items-center'>
        <h1 className='font-bold text-3xl'>You do not have permission to visite this page😢💖</h1>
        <Button><Link href={'/'}>Go Back Home!</Link></Button>
    </div>
  )
}
