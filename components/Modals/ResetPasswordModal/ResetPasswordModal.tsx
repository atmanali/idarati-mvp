import styles from "./ResetPasswordModal.module.css";
import Input from "@components/Input";
import Modal, { ModalProps } from "../Modal";
import React, { useEffect, useState } from "react";
import { usernameCheck } from "@services/auth";
import Label from "@components/Label/Label";
import Button from "@components/Button";
import { changePassword } from "@services/users";

type Props = ModalProps & {username?: string};

export default function ({open, setOpen, title="Réinitialiser votre mot de passe", username, onCancel}: Props) {
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);

    useEffect(() => {
        open && usernameCheck(username).then(setIsValidUsername);
    }, [username, open])

    useEffect(() => {
        isResetPassword && setOpen(false);
    }, [isResetPassword])

    const handleResetPasswordClick: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        changePassword(username).then(setIsResetPassword);
    }

    const handleCancelButtonClick: React.MouseEventHandler<HTMLButtonElement> = ( event ) => {
        event.preventDefault();
        event.stopPropagation();
        onCancel && onCancel(event);
    }

    return (<>
        <Modal open={open} title={title} onCancel={onCancel} >
            <div className={styles.resetPasswordInformation}>
                <Input name="username" placeholder="nom d'utilisateur" value={username} disabled required />
                <Label color={!isValidUsername && "error"} >
                    {
                        isValidUsername ? (
                            "Cliquez sur le bouton de confirmation pour recevoir un nouveau mot de passe"
                        ) : (
                            "Votre nom d'utilisateur n'est pas reconnu"
                        )
                    }
                </Label>
                {isValidUsername && 
                    <footer>
                        <Button onClick={handleCancelButtonClick}>Annuler</Button>
                        <Button
                            variant="plain"
                            color="info"
                            onClick={handleResetPasswordClick}
                        >{title}</Button>
                    </footer>
                }
            </div>
        </Modal>
    </>)
}