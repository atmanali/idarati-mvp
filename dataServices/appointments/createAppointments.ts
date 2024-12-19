import { AppointmentsModel } from "@models/index";
import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function createAppointment(appointments: Prisma.appointmentsCreateInput) {
    return await query(
        prisma => prisma.appointments.create({select:{id: true}, data: appointments})
    );
}