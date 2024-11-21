import styles from "./CaretIcon.module.css";
import Image from "next/image";

type Props = {
    orientation?: 'up'|'down'|'left'|'right';
}

export default function ({ orientation='right' }: Props) {
    return <Image className={styles[orientation]} src="/caret.svg" alt="chevron" width={32} height={32} />
}