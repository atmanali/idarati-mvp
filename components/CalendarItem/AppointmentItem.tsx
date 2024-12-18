import PopoverButton from "@components/PopoverButton/PopoverButton";
import styles from "./AppointmentItem.module.css";
import { AppointmentsModel } from "@models/index"
import { classNames } from "@utils/namings";
import router from "next/router";

type Props = {
    appointment: Partial<AppointmentsModel>;
    anchor?: string;
}

export default function ({ appointment, anchor }: Props) {
    return (<>
        {appointment.id &&
            <div className={classNames([styles.calendarAppointmentItem])}>
                <div className={styles.divider} />
                <PopoverButton popoverTargetId={`popover-${anchor}-${appointment.id}`}
                    style={{
                        // @ts-ignore
                        "anchor-name": `--${anchor}-${appointment.id}`
                    }}
                >
                    {appointment?.name}
                </PopoverButton>

                <div popover="auto" id={`popover-${anchor}-${appointment.id}`}
                    style={{
                        // @ts-ignore
                        "position-anchor": `--${anchor}-${appointment.id}`
                    }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        router.push(router.pathname+`/${appointment?.id}`)
                    }}
                >
                    Rendez-vous {appointment?.name}
                </div>
            </div>
        }
    </>)
}