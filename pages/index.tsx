import Button from '@components/Button/Button';
import React from 'react';
export default function () {
    const handleCreateRolesButton = () => (fetch('/api/roles'))
    return (<>
        <h1>ici c'est un titre</h1>
        <h2>ici c'est un sous-titre</h2>
        <h1>ici c'est un <Button variant='text' onClick={()=>console.log('clicked')}>bouton</Button> dans un titre</h1>
        <div>
            <Button onClick={handleCreateRolesButton}>create roles</Button>
        </div>
    </>)
}