import { Prisma } from "@prisma/client";
import { query } from "prisma/client";


export default async function getAppointments(params: Prisma.appointmentsFindManyArgs) {
    return query(
        prisma => prisma.appointments.findMany(params)
    );
}