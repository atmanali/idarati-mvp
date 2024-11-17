import React from 'react';
import { FormEvent } from 'react';
import Form from 'next/form';
import Button from '@components/Button/Button';
import { LoginProps } from '@components/AuthenticationProvider';
import { useMutation } from '@tanstack/react-query';
import { authenticate, authKey, AuthProps } from '@services/auth';
import queryClient from '@utils/queryClientUtils';
import { setAuthInformation } from '@utils/authUtils';
import { useRouter } from 'next/router';
 

export default function LoginPage() {
  const router = useRouter();
  
  const { mutateAsync } = useMutation({
    mutationFn: async ({username, password}: LoginProps): Promise<AuthProps> => {
        return authenticate(username, password);
    },
    onMutate: async ({username, password}: LoginProps) => {
        console.log('from onMutate', {username, password})
    },
    onSuccess: (data: AuthProps) => {
        // todo: alert('succeed');
        queryClient.setQueryData([authKey], data);
        setAuthInformation(data);
        router.query?.r && router.push(router.query.r as string);
    },
    onError: () => {
      // todo: alert('failed');
    }
})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { username, password } = Object.fromEntries(formData) as LoginProps;
    mutateAsync({username, password});
  }
 
  return (<>
  {/* todo: style this page */}
    <Form action={""} onSubmit={ handleSubmit }>
      <input name="username" placeholder="username" required />
      <input type="password" name="password" placeholder="password" required />
      <Button buttonProps={{ type: 'submit' }}>Login</Button>
    </Form>
  </>)
}