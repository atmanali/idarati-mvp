import { Prisma } from "@prisma/client"

export type UsersModel = Prisma.usersCreateInput;
export type RolesModel = Prisma.rolesCreateInput;
export type AppointmentsModel = Prisma.appointmentsCreateInput;
export type CoursesModel = Prisma.coursesCreateInput;
export type ResultsModel = Prisma.resultsCreateManyInput;
export type LogsModel = Prisma.logsCreateManyInput;
export type UsersAppointmentsModel = Prisma.users_appointmentsCreateManyInput;