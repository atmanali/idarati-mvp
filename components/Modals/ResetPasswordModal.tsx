import Input from "@components/Input";
import Modal, { ModalProps } from "./Modal";
import { useEffect, useState } from "react";
import { usernameCheck } from "@services/auth";
import Label from "@components/Label/Label";

type Props = ModalProps & {username?: string};

export default function ({title="Réinitialiser votre mot de passe", username, ...modalProps}: Props) {
    const [alreadyFetched, setAlreadyFetched] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        !alreadyFetched && usernameCheck(username)
            .then((usernameExists) => setDisabled(!usernameExists))
            .then(() => setAlreadyFetched(true))
    }, [modalProps.open]);
    useEffect(() => {
        setAlreadyFetched(false);
    }, [username])

    return (<>
        <Modal {...modalProps} title={title} >
            <Input name="username" placeholder="nom d'utilisateur" value={username} disabled required />
            <Label hidden={!disabled} color="error" >Votre nom d'utilisateur n'est pas reconnu</Label>
            <Label hidden={disabled} >
                Cliquez sur le bouton de confirmation pour recevoir un nouveau mot de passe
            </Label>
        </Modal>
    </>)
}