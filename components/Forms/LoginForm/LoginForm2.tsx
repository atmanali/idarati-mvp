import Input from "@components/Input";
import styles from "./LoginForm2.module.css";
import Form from "next/form";
import Button from "@components/Button";

export default function () {
    return (<>
        <div id="loginPage">
                <header>
                    <img id="logo" src="/iDarati.svg" alt="logo idarati" />
                    <nav id="loginPageNav">ok</nav>
                </header>
            <Form action={""} className={styles.form} >
                <header>connexion</header>
                <div>
                    formulaire
                    <Input soft required type="text" />
                    <Input soft required type="password" />
                </div>
                <footer><Button >Connexion</Button></footer>
            </Form>
        </div>
    </>)
}