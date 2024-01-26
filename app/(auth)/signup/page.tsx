"use client"

import React, { FormEvent, useState } from 'react'
import AuthForm from '../AuthForm';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import error from 'next/error';
import router, { useRouter } from 'next/navigation';

export default function Signup() {
    const [error, setError] = useState<any>(null);

    const router = useRouter();
    const handleSubmit = async (e: FormEvent, email: string, password: string) => {

        
        
            e.preventDefault();
    
            const supabase = createClientComponentClient();
            const { error } = await supabase.auth.signUp({
                email, password,
                options: {
                    emailRedirectTo:`${location.origin}/api/auth/callback`
                }
            })
        
        
        if (error) {
            setError(error);
          }
      
          if (!error) { 
            router.push('/verify');
          }
    };
  
    return (
      <main>
        <h2 className="text-center">Sign Up</h2>
        <AuthForm handleSubmit={handleSubmit} />
        {error && <div className="error">{error}</div>}
      </main>
    );
  
}


