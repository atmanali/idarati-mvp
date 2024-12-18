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
import { useMutation } from "@tanstack/react-query";

type Props = {
    user?: Partial<UsersModel>;
    filteredUsers?: Partial<UsersModel>[];
    start_date?: Date;
} & ModalProps

export default function( {open, onCancel, user, start_date, filteredUsers}: Props ) {
    const [selectedUsers, setSelectedUsers] = useState<Partial<UsersModel>[]>();
    const [startDate, setStartDate] = useState<string>();

    const { mutateAsync } = useMutation({
        mutationFn:
            async ({appointment, usersIds}: {appointment: AppointmentsModel, usersIds: string[]}) =>
                await createAppointments(appointment, usersIds),
        onSuccess: async (data) => {
            console.log('appointment created')
        },
        onError: async (data) => {
            console.log('appointment not created')
        },
    })

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const data = formData<AppointmentsModel>(event.currentTarget);
        await mutateAsync({
            appointment: {...data, start_date: new Date(data.start_date), end_date: new Date(data.end_date)},
            usersIds: selectedUsers?.map((selectedUser) => selectedUser?.id),
        });
        onCancel && onCancel(event);
    }

    const formatDate = (date: Date) => {
        let [dateString, timeString] = [date?.toLocaleDateString(), date?.toLocaleTimeString()];
        dateString = dateString?.split('/')?.reverse()?.join('-');
        timeString = timeString?.slice(0, timeString?.length-3);
        return dateString+'T'+timeString;
    }

    useEffect(() => {
        !selectedUsers && user && setSelectedUsers([user])
    }, [user])
    useEffect(() => {
        start_date && setStartDate(formatDate(start_date));
    }, [start_date])

    const remove = (userId: string) => setSelectedUsers(selectedUsers?.filter((user) => user?.id != userId))

    return (<>
        <ModalForm title="Ajouter un rendez-vous" open={open} onSubmit={onSubmit} onCancel={onCancel} >
            <Input name="name" placeholder="Nom du rendez-vous" required />
            <Input name="type" placeholder="Type du rendez-vous" required />
            <Input name="start_date" placeholder="Début du rendez-vous" type="datetime-local" value={startDate} required />
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