import styles from "@styles/pages/users.module.css";
import Input from "@components/Input";
import Label from "@components/Label/Label";
import { classNames, userName } from "@utils/namings";
import { useUsers } from "@services/users";
import UserCard from "@components/Cards/UserCard";
import React, { useEffect, useState } from "react";
import AddUsersFormModal from "@components/Forms/AddUsersFormModal/AddUsersFormModal";
import { Prisma } from "@prisma/client";
import Select from "@components/Select/Select";
import { UsersModel } from "@models/index";
import AddAppointmentsFormModal from "@components/Forms/AddAppointmentsFormModal/AddAppointmentsFormModal";


export default function () {
    const { users, isFetched } = useUsers({
        include:{ roles:{ select: {role: true} } }
    });
    const [selectedUserForAppointment, setSelectedUserForAppointment] = useState<Partial<UsersModel>>();
    const [isAddUsersModalOpen, setIsAddUsersModalOpen] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState<Partial<Prisma.usersCreateInput>[]>(users);
    const [filters, setFilters] = useState({name: '', username: '', role: ''});
    const [selectedRole, setSelectedRole] = useState<{label: string; value: any}>();

    const onNameFilterChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        setFilters({...filters, name: event.target.value});
    }
    
    const onUsernameFilterChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        setFilters({...filters, username: event.target.value});
    }

    const handleAddUsers: React.MouseEventHandler<HTMLLabelElement> = ( event ) => {
        event.stopPropagation();
        event.preventDefault();
        setIsAddUsersModalOpen(true);
    }

    const mergeTwoArrays = (arrayOne: any[], arrayTwo: any[]) => {
        if (!arrayOne) return arrayTwo;
        if (!arrayTwo) return arrayOne;
        return [... new Set([...arrayOne, ...arrayTwo])];
    }

    const filter = () => {
        const filteredUsersByRole = users?.filter(
            (user) => !filters?.role || (user.roles as any)?.map((role)=>role.role.name).includes(filters?.role)
        )
        const filteredUsersByUsername = filteredUsersByRole?.filter(
            (user) => !filters?.username || user?.username?.toLowerCase()?.includes(filters?.username)
        )
        const filteredUsersByName = filteredUsersByRole?.filter(
            (user) => !filters?.name || userName(user)?.toLowerCase()?.includes(filters?.name)
        );
        return filteredUsersByName;
    }

    useEffect(() => {
        isFetched && setFilteredUsers(filter());
        isAddUsersModalOpen && setIsAddUsersModalOpen(false);
    }, [isFetched, users])

    useEffect(() => {
        setFilters({...filters, role: selectedRole?.label});
    }, [selectedRole])

    useEffect(() => {
        setFilteredUsers(filter())
    }, [filters])

    return (
    <div className={classNames(["vstack", styles.pageContent])}>
        <div className="vstack">
            <Label size="large">Filtres</Label>
            <div className={classNames(['hstack', styles.filters])}>
                <Input className={styles.filter} placeholder="Filtrer par nom et prénom" onChange={onNameFilterChange} />
                {false &&
                    <Input className={styles.filter} placeholder="Filtrer par nom d'utilisateur" onChange={onUsernameFilterChange} />
                }
                <Select
                    className={styles.filter}
                    defaultLabel="Roles"
                    options={[
                        {label:'admin', value: 'admin'},
                        {label:'teacher', value: 'teacher'},
                        {label:'student', value: 'student'},
                    ]}
                    setSelectedOption={setSelectedRole}
                />
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
            {filteredUsers?.length>0 && (<div className={styles.usersGridContainer}>
                {filteredUsers.map((user) => (
                    <div className={styles.usersGridItem} >
                        <UserCard user={user} setSelectedUserForAppointment={setSelectedUserForAppointment} />
                    </div>
                ))}
            </div>)
            }
        </div>
        <AddUsersFormModal
            open={isAddUsersModalOpen}
            onCancel={()=>setIsAddUsersModalOpen(false)}
            title="Ajouter un utilisateur"
        />
        {selectedUserForAppointment&&
            <AddAppointmentsFormModal
                open={Boolean(selectedUserForAppointment)}
                onCancel={()=>setSelectedUserForAppointment(null)}
                user={selectedUserForAppointment}
                filteredUsers={filteredUsers?.filter((user => user?.id != selectedUserForAppointment?.id))}
            />
        }
    </div>)
}