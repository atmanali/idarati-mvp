import Button from '@components/Button/Button';
import { createRoles, deleteRoles, getRoles, updateRoles } from '@services/roles';
import React from 'react';

/*
 10fb859a-7b9b-422f-8241-f1d44b1186c4 | super admin
 c90fadfd-2b98-495d-8797-c2c572adec27 | admin
 dbebc559-4591-4a64-b701-f8aac16ea47b | teacher
 f9f10714-6822-4176-b9ae-945b21b9ba42 | student
*/
export default function () {
    const get = () => getRoles();
    const create = () => createRoles({data: [
        {id: '10fb859a-7b9b-422f-8241-f1d44b1186c4',name: 'super admin'},
        {id: 'c90fadfd-2b98-495d-8797-c2c572adec27', name: 'admin'},
        {id: 'dbebc559-4591-4a64-b701-f8aac16ea47b', name: 'teacher'},
        {id: 'f9f10714-6822-4176-b9ae-945b21b9ba42', name: 'student'},
    ]});
    const update = () => updateRoles({data: {}});
    const delet = () => deleteRoles({});

    return (<>
        <h1>ici c'est un titre</h1>
        <h2>ici c'est un sous-titre</h2>
        <h1>ici c'est un <Button variant='text' onClick={()=>console.log('clicked')}>bouton</Button> dans un titre</h1>
        <div>
            <Button onClick={get}>get roles</Button>
            <Button onClick={create}>create roles</Button>
            <Button onClick={update}>update roles</Button>
        </div>
    </>)
}