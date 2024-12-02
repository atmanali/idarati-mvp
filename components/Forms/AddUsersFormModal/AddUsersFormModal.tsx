import Input from "@components/Input";
import { ModalProps } from "@components/Modals/Modal";
import ModalForm from "@components/Modals/ModalForm";
import { UsersModel } from "@models/index";
import { createUsers } from "@services/users";
import { formData, getSubmitButton } from "@utils/formUtils";
import Image from "next/image";
import React, { FormEvent, useState } from "react";


type Props = ModalProps;


export default function ({...modalProps}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        console.log(formData(event.currentTarget));
        const userToCreate = formData(event.currentTarget) as UsersModel;
        createUsers({data: {...userToCreate}});
        console.log({userToCreate});
    }

    const handleEnterPressed: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key==='Enter') {
          event.preventDefault();
          const form = event.currentTarget.form;
          const submitButton = getSubmitButton(form);
          form.requestSubmit(submitButton);
        }
    }

    const handleShowPasswordClick: React.MouseEventHandler<HTMLImageElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        setShowPassword(!showPassword);
    }


    return (<>
        <ModalForm {...modalProps} onSubmit={onSubmit} >
            <Input
                required
                name="last_name"
                placeholder="Nom de famille"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input
                required
                name="first_name"
                placeholder="Prénom"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                onKeyDown={handleEnterPressed}
            />
            <Input
                required
                name="role"
                placeholder="Role"
                options={["admin", "teacher", "student"]}
                onKeyDown={handleEnterPressed}
            />
            <Input
                required
                name="username"
                placeholder="Nom d'utilisateur"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input 
                required
                name="password"
                placeholder="Mot de passe"
                type={ showPassword ? "text" : "password" }
                onKeyDown={handleEnterPressed}
                icon={
                    <Image
                        src={ !showPassword ? '/visibility.svg' : '/visibility-off.svg' }
                        alt={ (!showPassword ? 'Voir' : 'Cacher') + " le mot de passe" }
                        width={24} height={24}
                        onClick={handleShowPasswordClick}
                    />
                }
            />
        </ModalForm>
    </>)
}