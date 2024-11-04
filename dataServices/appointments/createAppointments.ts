import { AppointmentsModel } from "@models/index";
import { query } from "prisma/client";

export default async function createAppointments(appointments: AppointmentsModel[]) {
    return query(
        prisma => prisma.appointments.createMany({data: appointments})
    );
}