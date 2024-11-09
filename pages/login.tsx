import React from 'react';
import { FormEvent } from 'react';
import useAuth, { authenticate } from '@services/auth';
import Form from 'next/form';
import Button from '@components/Button/Button';
 

export default function LoginPage() { 
  const authData = useAuth('atman', 'atmanali');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget);
    const {username, password} = Object.fromEntries(formData) as Record<any, string>;
    
    //await authenticate(username, password);
    console.log(authData);
  }
 
  return (
    <Form action={""} onSubmit={handleSubmit}>
      <input name="username" placeholder="username" required />
      <input type="password" name="password" placeholder="password" required />
      <Button buttonProps={{ type: 'submit' }}>Login</Button>
    </Form>
  )
}