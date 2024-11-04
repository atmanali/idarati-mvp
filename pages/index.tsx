import Button from '@components/Button/Button';
import { createUsers, deleteUsers, getUsers, updateUsers } from '@services/users';
import React from 'react';


export default function () {
    const get = () => getUsers({
        where: {
            is_first_connection: true
        }
    });
    const create = () => createUsers({
        data: [
            {
                id: 'FAA495D9-309C-4ABD-A422-ECEF20874D97',
                last_name: 'ali',
                first_name: 'atman',
                email: 'atmanali@idarati.com',
                username: 'atmanali',
                password: 'atmanali',
                is_first_connection: true
            },
        ]
    });
    const update = () => updateUsers({
        data:{
            is_first_connection: true,
        },
    });
    const delet = () => deleteUsers({
        where: {
            id: 'FAA495D9-309C-4ABD-A422-ECEF20874D97',
        }
    });

    return (<>
        <h1>ici c'est un titre</h1>
        <h2>ici c'est un sous-titre</h2>
        <h1>ici c'est un <Button variant='text' onClick={()=>console.log('clicked')}>bouton</Button> dans un titre</h1>
        <div>
            <Button onClick={get}>get users</Button>
            <Button onClick={create}>create users</Button>
            <Button onClick={update}>update users</Button>
            <Button onClick={delet}>delete users</Button>
        </div>
    </>)
}