import React from 'react';
import Navbar from '../components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({children} : any) {

    const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getSession();

    if (!data.session) {
      redirect('/login')
    }

    

  return (
    <>
    <Navbar user={data.session?.user as { email: string } | null}/> 
    {children}
    </>
  )
}
 