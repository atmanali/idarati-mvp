import Button from '@components/Button/Button';
import React from 'react';
export default function () {
    return (<>
        <h1>ici c'est un titre</h1>
        <h2>ici c'est un sous-titre</h2>
        <div>
            <Button variant={'plain'} color='success' size='small'> plain </Button>
            <Button variant={'outlined'} color='error' size='small'> outlined </Button>
            <div>
                normalement ici j'ai du texte
                <Button variant={'text'} size='small'>bouton</Button>
                et le bouton est au centre
            </div>
        </div>
        <div>
            <Button variant={'plain'} color='success' size='medium'> plain </Button>
            <Button variant={'outlined'} color='error' size='medium'> outlined </Button>
            <div>
                normalement ici j'ai du texte
                <Button variant={'text'} size='medium'>bouton</Button>
                et le bouton est au centre
            </div>
        </div>
        <div>
            <Button variant={'plain'} color='success' size='large'> plain </Button>
            <Button variant={'outlined'} color='error' size='large'> outlined </Button>
            <div>
                normalement ici j'ai du texte
                <Button variant={'text'} size='large'>bouton</Button>
                et le bouton est au centre
            </div>
        </div>
        <Button color='neutral'>et là c'est un bouton avec beaucoup de texte</Button>
        <Button color='warning'>warning</Button>
        <Button color='warning' variant='plain'>warning</Button>
        <Button color='warning' variant='outlined'>warning</Button>
        <span style={{color: "var(--foreground-color-primary)"}}>primary{' '}</span>
        <span style={{color: "var(--foreground-color-secondary)"}}>secondary</span>
    </>)
}