import Input from "@components/Input";
import Form from "next/form";
import React, { FormEvent } from "react";

export default function () {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(Object.entries(new FormData(event.currentTarget)));
    }
    return <Form
                id="add-users-form"
                action={""}
                onSubmit={onSubmit}
            >
        <Input name="username" placeholder="nom d'utilisateur" required />
    </Form>
}