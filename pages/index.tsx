import Button from '@components/Button/Button';
import React from 'react';
export default function () {
    return (<>
        <h1>ici c'est un titre</h1>
        <h2>ici c'est un sous-titre</h2>
        <h1>ici c'est un <Button variant='text' onClick={()=>console.log('clicked')}>bouton</Button> dans un titre</h1>
        <div>
            <Button color='success'>success</Button>
            <Button color='success' size='medium'>success</Button>
            <Button color='success' size='large'>success</Button>

            <Button color='success' variant='plain'>success</Button>
            <Button color='success' variant='plain' size='medium'>success</Button>
            <Button color='success' variant='plain' size='large'>success</Button>

            <Button color='success' variant='outlined'>success</Button>
            <Button color='success' variant='outlined' size='medium'>success</Button>
            <Button color='success' variant='outlined' size='large'>success</Button>
        </div>
        <div>
            <Button color='error'>error</Button>
            <Button color='error' variant='plain'>error</Button>
            <Button color='error' variant='outlined'>error</Button>
        </div>
        <div>
            <Button color='warning'>warning</Button>
            <Button color='warning' variant='plain'>warning</Button>
            <Button color='warning' variant='outlined'>warning</Button>
        </div>
        <div>
            <Button color='neutral'>neutral</Button>
            <Button color='neutral' variant='plain'>neutral</Button>
            <Button color='neutral' variant='outlined'>neutral</Button>
        </div>
        <div>
            <Button color='info'>info</Button>
            <Button color='info' variant='plain'>info</Button>
            <Button color='info' variant='outlined'>info</Button>
        </div>
    </>)
}