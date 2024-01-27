import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../components/logo.png'

export default async function AuthLayout({children} : any) {

    const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getSession();

    if (data.session) {
      redirect('/')
    }


  return (
    <>
      <nav>
        <div className='mr-auto'>
          <Image
            src={Logo}
            alt="logo"
            width={90}
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className='flex gap-12'>
          <Link href="/signup">Signup</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
      {children}
    </>
  );
}