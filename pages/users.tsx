import styles from "@styles/pages/users.module.css";
import Input from "@components/Input";
import Label from "@components/Label/Label";
import { classNames } from "@utils/namings";
import { useUsers } from "@services/users";
import UserCard from "@components/Cards/UserCard";
import React, { useState } from "react";
import AddUsersModal from "@components/Modals/AddUsersModal";


export default function () {
    const { users, isFetched } = useUsers();
    const [isAddUsersModalOpen, setIsAddUsersModalOpen] = useState(false);


    const handleAddUsers: React.MouseEventHandler<HTMLLabelElement> = ( event ) => {
        event.stopPropagation();
        event.preventDefault();
        setIsAddUsersModalOpen(true);
    }

    return (
    <div className={classNames(["vstack", styles.pageContent])}>
        <div className="vstack">
            <Label size="large">Filtres</Label>
            <div className={classNames(['hstack', styles.filters])}>
                <Input placeholder="Filtrer par nom et prenom" />
                <Input placeholder="Filtrer par rôle" />
            </div>

            <div id="divider"/>
            <div className={styles.addUsers}>
                <Label
                    color="success"
                    onClick={handleAddUsers}
                >
                    Ajouter un utilisateur
                </Label>
            </div>
            {isFetched && (<div className={styles.usersGridContainer}>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
                <div className={styles.usersGridItem} >
                    <UserCard user={users[0]} />
                </div>
            </div>)
            }
        </div>
        <AddUsersModal
            open={isAddUsersModalOpen}
            setOpen={setIsAddUsersModalOpen}
            onCancel={()=>setIsAddUsersModalOpen(false)}
        />
    </div>)
}