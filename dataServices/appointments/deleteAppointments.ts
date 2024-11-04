import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function deleteAppointments(params: Prisma.appointmentsDeleteManyArgs) {
    return query(
        prisma=>prisma.appointments.deleteMany(params)
    );
}