import { CoursesModel } from "@models/index";
import { query } from "prisma/client";

export default async function createCourses(courses: CoursesModel[]) {
    return query(
        prisma => prisma.courses.createMany({data: courses})
    );
}