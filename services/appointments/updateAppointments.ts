import { Prisma } from "@prisma/client";
import { query } from "prisma/client";


export default async function updateAppointments(params: Prisma.appointmentsUpdateManyArgs) {
    return query(
        prisma => prisma.appointments.updateMany(params)
    );
}