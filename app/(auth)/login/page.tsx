"use client"

import React, { FormEvent, useState } from 'react'
import AuthForm from '../AuthForm';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function Login() {
    const [error, setError] = useState<any>('');
    const router = useRouter();

   const handleSubmit = async(e: FormEvent, email: string, password: string) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const {error} = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if(error){
      setError(error.message)
     }
  
     if(!error){
      router.push('/');
     }
   }

   
  
    return (
      <main>
        <h2 className="text-center">Log In</h2>
        <AuthForm handleSubmit={handleSubmit} />
        {error && <div className="error">{error}</div>}
        <p className='text-center mt-4'><Link href='/signup'>Signup</Link></p>    
        </main>
    );
}
