import React, { useRef, useState } from "react";
import { FormEvent } from "react";
import Form from "next/form";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { authenticate, authKey, AuthProps } from "@services/auth";
import queryClient from "@utils/queryClientUtils";
import { setAuthInformation } from "@utils/authUtils";
import { useRouter } from "next/router";
import styles from "./LoginForm.module.css";
import Input from "@components/Input";
import ResetPasswordModal from "@components/Modals/ResetPasswordModal/ResetPasswordModal";
import Label from "@components/Label/Label";


type LoginProps = {
  username: string;
  password: string;
}

export default function LoginForm() {
    const [inputColor, setInputColor] = useState<'success' | 'error' | 'warning' | 'neutral' | 'info'>('neutral');
    const [correctAuthenticationInformation, setCorrectAuthenticationInformation] = useState(true);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const formRef = useRef<HTMLFormElement>();

    const router = useRouter();
    
    const { mutateAsync } = useMutation({
      mutationFn: async ({username, password}: LoginProps): Promise<AuthProps> => {
          return authenticate(username, password);
      },
      onSuccess: (data: AuthProps) => {
          // todo: alert('succeed');
          queryClient.setQueryData([authKey], data);
          setAuthInformation(data);
          router.query?.r && router.push(router.query.r as string);
          setInputColor('success');
      },
      onError: () => {
        // todo: alert('failed');
        setInputColor('error');
        setCorrectAuthenticationInformation(false);
      }
  })
  
    function handleSubmit<T = FormEvent<HTMLFormElement> | HTMLFormElement>(eventOrForm: T) {
      let formData;
      try {
        (eventOrForm as FormEvent<HTMLFormElement>).preventDefault();
        formData = new FormData((eventOrForm as FormEvent<HTMLFormElement>).currentTarget);
      } catch(e) {
        formData = new FormData(eventOrForm as HTMLFormElement);
      }
      const { username, password } = Object.fromEntries(formData) as LoginProps;
      setUsername(username);
      mutateAsync({username, password});
    }

    const handleResetPasswordClick:React.MouseEventHandler<HTMLSpanElement> = ( event ) => {
      event.stopPropagation();
      event.preventDefault();
      setIsResetPasswordModalOpen(true);
    }

    const handleEnterPressed: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key==='Enter') {
        event.preventDefault();
        formRef.current.reportValidity() && handleSubmit<HTMLFormElement>(formRef.current);
      }
    }

    return (<>
      <Form
        action={""}
        className={styles.container}
        onFocus={(event) => formRef.current=event.currentTarget}
        onSubmit={ handleSubmit<FormEvent<HTMLFormElement>> }
      >
        <header>
            <h2>Connexion</h2>
        </header>
        <div className={styles.body}>
            <Input type="text" name="username" placeholder="nom d'utilisateur" color={inputColor} onKeyDown={handleEnterPressed} required />
            <Input type="password" name="password" placeholder="mot de passe" color={inputColor} onKeyDown={handleEnterPressed} required />
            <Label color="error" hidden={correctAuthenticationInformation}>
              Vos informations de connexion sont erronées.
            </Label>
            <Label color="error" hidden={correctAuthenticationInformation}>
              Pour réinitialiser votre mot de passe
              <Button color="error" onClick={handleResetPasswordClick}>clickez-ici</Button>
            </Label>
        </div>
        <footer>
            <Button type='submit' variant="plain" color="info" >Connexion</Button>
        </footer>
      </Form>
      <ResetPasswordModal
        open={isResetPasswordModalOpen}
        setOpen={setIsResetPasswordModalOpen}
        onCancel={() => setIsResetPasswordModalOpen(false)}
        username={username}
      />
    </>)
}