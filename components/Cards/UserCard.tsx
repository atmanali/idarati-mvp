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
import React, { useState } from "react";
import IconButton from "@components/IconButton/IconButton";
import { getCurrentUser } from "@utils/authUtils";
import AddAppointmentsFormModal from "@components/Forms/AddAppointmentsFormModal/AddAppointmentsFormModal";

type Props = {
    user: Partial<UsersModel>;
    setSelectedUserForAppointment?: React.Dispatch<React.SetStateAction<Partial<Prisma.usersCreateInput>>>;
    hideAction?: boolean;
} & React.HTMLAttributes<HTMLDivElement>

export default function ({ user, setSelectedUserForAppointment, hideAction=false, ...props }: Props) {
    const currentUser = getCurrentUser();

    const { mutateAsync } = useMutation({
        mutationFn: async (params: Prisma.usersDeleteManyArgs) => await deleteUsers(params),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [usersKey]});
        },
        onError: () => {console.log("L'utilisateur n'a pas été supprimé")}
    })

    const handleAddAppointmentClick: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedUserForAppointment(user);
    }
    const handleDeleteUserClick: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        mutateAsync({where: {id: user?.id}})
    }

    return (<>
        <div className={styles.card} {...props}>
            <Image src={'/account_circle.svg'} alt={`avatar de ${userName(user)}`} height={64} width={64} />
            <div className={styles.information}>
                <Label color="">{userName(user)}</Label>
                <Label color="" size="small">{user.username}</Label>
                {!hideAction && 
                    <div className={styles.actions}>
                        <IconButton iconUrl="/calendar_add_on.svg" size="small" color="info"
                            onClick={handleAddAppointmentClick}
                        />
                        <IconButton iconUrl="/delete_forever.svg" size="small" color="error"
                            onClick={handleDeleteUserClick}
                            disabled={currentUser?.username === user?.username}
                        />
                    </div>
                }
            </div>
        </div>
    </>)
}