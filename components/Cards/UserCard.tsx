import styles from "./UserCard.module.css";
import Image from "next/image";
import { UsersModel } from "@models/index";
import { userName } from "@utils/namings";
import Label from "@components/Label/Label";
import Button from "@components/Button";

type Props = {
    user: Partial<UsersModel>;
}

export default function ({ user }: Props) {
    return (<div className={styles.card}>
        <Image src={'/default-avatar.svg'} alt={`avatar de ${userName(user)}`} height={64} width={64} />
        <div className={styles.information}>
            <Label color="neutral">{userName(user)}</Label>
            <Label color="neutral" size="small">{user.username}</Label>
            <div className={styles.actions}>
                <Button color="info" variant="plain" size="extraSmall" >
                    <Image src={"/calendar-add.svg"} alt={"Proposer un rendez-vous"} height={24} width={24} />
                </Button>
                <Button color="error" variant="plain" size="extraSmall">
                    <Image src={"/bin.svg"} alt={`Supprimer ${userName(user)}`} height={24} width={24} />
                </Button>
            </div>
        </div>
    </div>)
}