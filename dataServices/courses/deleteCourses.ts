import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function deleteCourses(params: Prisma.coursesDeleteManyArgs) {
    return query(
        prisma => prisma.courses.deleteMany(params)
    );
}