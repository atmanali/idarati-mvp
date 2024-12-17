import styles from "./AddAppointmentsFormModal.module.css";
import { ModalProps } from "@components/Modals/Modal";
import ModalForm from "@components/Modals/ModalForm/ModalForm";
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
} & ModalProps

export default function( {open, onCancel, user, filteredUsers}: Props ) {
    const [selectedUsers, setSelectedUsers] = useState<Partial<UsersModel>[]>();

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


    useEffect(() => {
        !selectedUsers && user && setSelectedUsers([user])
    }, [user])

    const remove = (userId: string) => setSelectedUsers(selectedUsers?.filter((user) => user?.id != userId))

    //https://stock.adobe.com/fr/search?filters%5Bcontent_type%3Aphoto%5D=1&filters%5Bcontent_type%3Aillustration%5D=1&filters%5Bcontent_type%3Azip_vector%5D=1&filters%5Bcontent_type%3Avideo%5D=1&filters%5Bcontent_type%3Atemplate%5D=1&filters%5Bcontent_type%3A3d%5D=1&filters%5Bcontent_type%3Aimage%5D=1&k=rendez-vous+agenda&order=relevance&limit=100&search_page=1&search_type=usertyped&acp=&aco=rendez-vous+agenda&get_facets=0&asset_id=28963293
    return (<>
        <ModalForm title="Ajouter un rendez-vous" formImage="add-appointment-form-image.jpg" open={open} onSubmit={onSubmit} onCancel={onCancel} >
            <Input soft name="name" placeholder="Nom du rendez-vous" required />
            <Input soft name="type" placeholder="Type du rendez-vous" required />
            <Input soft name="start_date" placeholder="Début du rendez-vous" type="datetime-local" required />
            <Input soft name="end_date" placeholder="Fin du rendez-vous" type="datetime-local" required />
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