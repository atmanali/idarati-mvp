import Button from '@components/Button/Button';
import React from 'react';
export default function () {
    return (<>
        <Button variant={'plain'} color='success'> plain </Button>
        <Button variant={'outlined'} color='error'> outlined </Button>
        <div>
            normalement ici j'ai du texte
            <Button variant={'text'}> text </Button>
            et le bouton est au centre
        </div>
    </>)
}