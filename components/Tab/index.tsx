import Chip from "@components/Chip";
import styles from "./Tab.module.css";
import { useRouter } from "next/router";

type Props = {
    tabs: {label: string; href: string}[];
}

export default function Tab({ tabs }: Props) {
    const router = useRouter();

    return (<div className={styles.container}>
        {tabs?.map((tab) =>
            <div
                onClick={(event)=>{
                    event.preventDefault();
                    router.push(`/${tab.href}`);
                }}>
                    <Chip 
                        key={tab.label}
                        label={tab.label}
                        selected={'/'+tab.href===router.pathname}
                    />
            </div>
        )}
    </div>)
}