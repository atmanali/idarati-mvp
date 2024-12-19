import { useAppointments } from "@services/appointments";
import { useRouter } from "next/router"

export default function () {
    const router = useRouter();
    const { appointments } = useAppointments({
        where: {id: parseInt(router?.query?.appointmentId as string)}
    })

    return (<>
        { appointments?.length && (<>
            Rendez-vous n°{appointments[0].id}
            <br />
            {appointments[0].name}
        </>)}
    </>)
}