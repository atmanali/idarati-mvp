import Input from "@components/Input";
import { ModalProps } from "@components/Modals/Modal";
import ModalForm from "@components/Modals/ModalForm/ModalForm";
import { UsersModel } from "@models/index";
import { Prisma } from "@prisma/client";
import { createUsers, usersKey } from "@services/users";
import { useMutation } from "@tanstack/react-query";
import { formData, getSubmitButton } from "@utils/formUtils";
import queryClient from "@utils/queryClientUtils";
import Image from "next/image";
import React, { FormEvent, useState } from "react";


type Props = ModalProps & {
    formImage?: string;
};


export default function ({formImage, ...modalProps}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    // creation mutation
    const { mutateAsync } = useMutation({
        mutationFn: async (params: Prisma.usersCreateManyArgs) => await createUsers(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [usersKey]});
        },
        onError: () => {console.log("L'utilisateur n'a pas été ajouté")}
    })

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const userToCreate = formData(event.currentTarget) as UsersModel;
        mutateAsync({data: {...userToCreate}});
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

    //https://www.flaticon.com/fr/icone-gratuite/ajouter-un-utilisateur_609195
    return (<>
        <ModalForm {...modalProps} formImage={"/add-user-form-image.png"} onSubmit={onSubmit} >
            <Input
                soft
                required
                name="last_name"
                placeholder="Nom de famille"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input
                soft
                required
                name="first_name"
                placeholder="Prénom"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input
                soft
                required
                name="email"
                placeholder="Email"
                type="email"
                onKeyDown={handleEnterPressed}
            />
            <Input
                soft
                required
                name="role"
                placeholder="Role"
                options={["admin", "teacher", "student"]}
                onKeyDown={handleEnterPressed}
            />
            <Input
                soft
                required
                name="username"
                placeholder="Nom d'utilisateur"
                type="text"
                onKeyDown={handleEnterPressed}
            />
            <Input
                soft
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