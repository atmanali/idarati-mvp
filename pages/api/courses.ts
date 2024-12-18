import createCourses from "@dataServices/courses/createCourses";
import deleteCourses from "@dataServices/courses/deleteCourses";
import getCourses from "@dataServices/courses/getCourses";
import updateCourses from "@dataServices/courses/updateCourses";

import { NextApiRequest, NextApiResponse } from "next";
import { isSuccessfulDataFetching } from "prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse){
    switch (req.method) {
        case 'GET':
            let { params } = req.query;
            params = (params as string);
            const gotCourses = await getCourses(params ? JSON.parse(params) : undefined);
            res.status(isSuccessfulDataFetching(gotCourses) ? 200 : 500).send({ data: gotCourses });
            break;
        case 'POST':
            const createdCourses = await createCourses(req.body);
            res.status(isSuccessfulDataFetching(createdCourses) ? 200 : 500).json({ data: createdCourses });
            break;
        case 'PATCH':
            const updatedCourses = await updateCourses(req.body);
            res.status(isSuccessfulDataFetching(updatedCourses) ? 200 : 500).json({ data: updatedCourses });
            break;
        case 'DELETE':
            const deletedCourses = await deleteCourses(req.body);
            res.status(isSuccessfulDataFetching(deletedCourses) ? 200 : 500).json({ data: deletedCourses });
            break;
    }
}