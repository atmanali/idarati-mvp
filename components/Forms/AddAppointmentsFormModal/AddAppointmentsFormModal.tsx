import styles from "./AddAppointmentsFormModal.module.css";
import { ModalProps } from "@components/Modals/Modal";
import ModalForm from "@components/Modals/ModalForm";
import React, { useEffect, useState } from "react";
import Input from "@components/Input";
import { formData } from "@utils/formUtils";
import { createAppointments } from "@services/appointments";
import { AppointmentsModel, UsersModel } from "@models/index";
import { classNames, userName } from "@utils/namings";
import UserCard from "@components/Cards/UserCard";
import IconButton from "@components/IconButton/IconButton";
import Dropdown from "@components/Dropdown/Dropdown";

type Props = {
    user?: Partial<UsersModel>;
    filteredUsers?: Partial<UsersModel>[];
} & ModalProps

/*
    name: string;
    type: string;
    start_date: Date | string;
    end_date: Date | string;
    users?:
*/

export default function( {open, onCancel, user, filteredUsers}: Props ) {
    const [selectedUsers, setSelectedUsers] = useState<Partial<UsersModel>[]>();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = formData<AppointmentsModel>(event.currentTarget);
        console.log(data)
        const createdAppointment = await createAppointments(
            {...data, start_date: new Date(data.start_date), end_date: new Date(data.end_date)},
            selectedUsers?.map((user)=>user?.id)
        );
        console.log({createAppointments});
    }


    useEffect(() => {
        !selectedUsers && user && setSelectedUsers([user])
    }, [user])

    const remove = (userId: string) => setSelectedUsers(selectedUsers?.filter((user) => user?.id != userId))

    return (<>
        <ModalForm title="Ajouter un rendez-vous" open={open} onSubmit={onSubmit} onCancel={onCancel} >
            <Input name="name" placeholder="Nom du rendez-vous" required />
            <Input name="type" placeholder="Type du rendez-vous" required />
            <Input name="start_date" placeholder="Début du rendez-vous" type="datetime-local" required />
            <Input name="end_date" placeholder="Fin du rendez-vous" type="datetime-local" required />
            <div className={classNames([styles.listOfUsers])}>
                <Dropdown hideArrow items={
                    filteredUsers?.length ?
                        filteredUsers.map((user) => ({
                            label: {primary: userName(user), secondary: user?.username},
                            action: (event) => {setSelectedUsers([...selectedUsers, user])}
                        }))
                        : []
                } >
                    <IconButton iconUrl="/add.svg" color="success" size="extraSmall"
                        className={classNames([styles.addUsersButton])}
                    />
                </Dropdown>
                {selectedUsers?.length ? (<>
                    {selectedUsers.map(
                        (selectedUser, index) => (<div className={classNames([styles.userOfList])}>
                            <UserCard key={index + 1} user={selectedUser} hideAction />
                            {selectedUser?.id != user?.id &&
                                <div className={classNames([styles.actionsForUser])}>
                                    <IconButton iconUrl="/remove.svg" onClick={() => {remove(selectedUser.id)}} color="error" />
                                </div>
                            }
                        </div>)
                    )}
                    </>) : null}
                </div>
        </ModalForm>
    </>)
}