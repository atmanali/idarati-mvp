import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getUsersAppointments(params:Prisma.users_appointmentsFindManyArgs) {
    return query(
        prisma => prisma.users_appointments.findMany(params)
    );
}