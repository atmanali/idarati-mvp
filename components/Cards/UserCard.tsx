import styles from "./UserCard.module.css";
import Image from "next/image";
import { UsersModel } from "@models/index";
import { userName } from "@utils/namings";
import Label from "@components/Label/Label";
import Button from "@components/Button";
import { useMutation } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { usersKey } from "@services/users";
import queryClient from "@utils/queryClientUtils";
import { deleteUsers } from "@services/users";
import React from "react";

type Props = {
    user: Partial<UsersModel>;
}

export default function ({ user }: Props) {

    const { mutateAsync } = useMutation({
        mutationFn: async (params: Prisma.usersDeleteManyArgs) => await deleteUsers(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [usersKey]});
        },
        onError: () => {console.log("L'utilisateur n'a pas été supprimé")}
    })

    const handleDeleteUserClick: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        mutateAsync({where: {id: user?.id}})
    }

    return (<div className={styles.card}>
        <Image src={'/default-avatar.svg'} alt={`avatar de ${userName(user)}`} height={64} width={64} />
        <div className={styles.information}>
            <Label color="neutral">{userName(user)}</Label>
            <Label color="neutral" size="small">{user.username}</Label>
            <div className={styles.actions}>
                <Button color="info" variant="plain" size="extraSmall" >
                    <Image src={"/calendar-add.svg"} alt={"Proposer un rendez-vous"} height={24} width={24} />
                </Button>
                <Button color="error" variant="plain" size="extraSmall" onClick={handleDeleteUserClick} >
                    <Image src={"/bin.svg"} alt={`Supprimer l'utilisateur ${userName(user)}`} height={24} width={24} />
                </Button>
            </div>
        </div>
    </div>)
}