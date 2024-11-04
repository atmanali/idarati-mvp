import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function updateCourses(params: Prisma.coursesUpdateManyArgs) {
    return query(
        prisma => prisma.courses.updateMany(params)
    );
}