import styles from "./UserCard.module.css";
import Image from "next/image";
import { UsersModel } from "@models/index";
import { userName } from "@utils/namings";
import Label from "@components/Label/Label";
import { useMutation } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { usersKey } from "@services/users";
import queryClient from "@utils/queryClientUtils";
import { deleteUsers } from "@services/users";
import React from "react";
import IconButton from "@components/IconButton/IconButton";

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
        <Image src={'/account_circle.svg'} alt={`avatar de ${userName(user)}`} height={64} width={64} />
        <div className={styles.information}>
            <Label color="">{userName(user)}</Label>
            <Label color="" size="small">{user.username}</Label>
            <div className={styles.actions}>
                <IconButton iconUrl="/calendar_add_on.svg" size="small" color="info" />
                <IconButton iconUrl="/delete_forever.svg" size="small" color="error"
                    onClick={handleDeleteUserClick}
                />
            </div>
        </div>
    </div>)
}