import { UsersAppointmentsModel } from "@models/index";
import { query } from "prisma/client";

export default async function createUsersAppointments(users_appointments: UsersAppointmentsModel[]) {
    return query(
        prisma => prisma.users_appointments.createMany({data: users_appointments})
    );
}