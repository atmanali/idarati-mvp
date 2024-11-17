import styles from "./Chip.module.css";

type Props = {
    label: string;
    selected: boolean;
}

export default function Chip({ label, selected }: Props) {
    return (<>
        <div className={styles.container} >
            {label}
            <div className={`${styles.selectedDefault} ${selected && styles.selected}`} />
        </div>
    </>)
}