import AddUsersForm from "@components/Forms/AddUsersForm/AddUsersForm";
import Modal, { ModalProps } from "./Modal";
import React, { useEffect, useState } from "react";

type Props = ModalProps;
export default function({...modalProps}: Props) {
    const handleCreationClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        event.currentTarget.form.requestSubmit(event.currentTarget);
    }
    return (
    <Modal
        title="Ajouter un utilisateur"
        showFooter
        confirmButtonProps={{
            color: "success",
            variant: "plain",
            label: "Créer",
            type: "submit",
            form: "add-users-form",
            onClick: handleCreationClick,
        }}
        {...modalProps}
    >
        <AddUsersForm />
    </Modal>)
}