import { Prisma } from "@prisma/client";
import { query } from "prisma/client";

export default async function getCourses(params: Prisma.coursesFindManyArgs) {
    return query(
        prisma => prisma.courses.findMany(params)
    );
}