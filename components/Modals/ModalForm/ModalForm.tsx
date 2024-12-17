import styles from "./ModalForm.module.css";
import Form from "next/form";
import Modal, { ModalProps } from "../Modal";
import Button from "@components/Button";
import React from "react";


type Props = ModalProps & {
    children?: React.ReactNode;
    formImage?: string;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function ({children, formImage, onSubmit, ...modalProps}: Props) {
    const onCancel: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        modalProps?.onCancel && modalProps.onCancel(event);
    }
    return (
        <Modal {...modalProps}>
            <Form action={""} className={styles.formContainer} onSubmit={onSubmit}>
                <div className={styles.formContent}>
                    <div className={styles.imageContainer}>
                        <img className={styles.formImage} src={formImage} alt={"image pour le formulaire " + modalProps?.title} />
                    </div>
                    <div className={styles.form}>{children}</div>
                </div>
                <footer>
                    <Button type="button" onClick={onCancel} >Annuler</Button>
                    <Button
                        type="submit"
                        variant="plain"
                        color="success"
                    >{modalProps?.title || "Envoyer le formulaire"}</Button>
                </footer>
            </Form>
        </Modal>
    )
}