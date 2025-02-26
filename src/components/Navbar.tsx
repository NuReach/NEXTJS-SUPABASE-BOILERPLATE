import { getAdmin } from '@/app/login/action';
import { createClient } from '@/lib/supabase/server';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

export async function logout() {
    "use server"
    const supabase = createClient();
    await supabase.auth.signOut();
  }
  

export default async function Navbar() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser();

    const isAdmin = await getAdmin();
  return (
    <div className='p-3 flex justify-between items-center'>
        {
        data.user ?  <p className="font-bold text-xl">{data.user.email}</p>  :
        <p className="font-bold text-xl">User</p>
        }
        <div className="flex space-x-3">
        {
            data.user ?
            <form action={logout} >
            <Button>Logout</Button>   
            </form>:
            <Button>
                <Link href="/login">Login</Link>
            </Button>  
        }
        {
            isAdmin && <Button><Link href={'/dashboard'}>Dashboard</Link></Button>
        }
        </div>
    </div>
  )
}
