import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AuthLayout({children} : any) {

    const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getSession();

    if (data.session) {
      redirect('/www')
    }


  return (
    <>
     <nav>
        <h1>Helpdesk</h1>
        <Link href="/signup">Signup</Link>
        <Link href="/login">Login</Link>
    </nav>
    {children}
    </>
  )
}