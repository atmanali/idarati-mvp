import createRoles from "@services/roles/createRoles";
import { NextApiRequest, NextApiResponse } from "next";

export default function roleApiHandler(req: NextApiRequest, res: NextApiResponse){
    createRoles({
        data: [
            {id: "10FB859A-7B9B-422F-8241-F1D44B1186C4", name:"super admin"},
            {id: "C90FADFD-2B98-495D-8797-C2C572ADEC27", name:"admin"},
            {id: "DBEBC559-4591-4A64-B701-F8AAC16EA47B", name:"teacher"},
            {id: "F9F10714-6822-4176-B9AE-945B21B9BA42", name:"student"},
        ]
    })
    res.json({message: "done"})
}