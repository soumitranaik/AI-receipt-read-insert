
import React, { FormEvent, useState } from 'react';

interface FormProps {
  handleSubmit: (e: FormEvent, email: string, password: string) => void
}

export default function AuthForm({handleSubmit} : FormProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  return (
    <form className='bg-cyan-200' onSubmit={(e) => handleSubmit(e, email, password)}>
    <label>
        <span>Email</span>
        <input 
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
         />
    </label>
    <label>
        <span>Password</span>
        <input 
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
         />
    </label>
    <button className="btn-primary">Submit</button>
</form>
  )
}
