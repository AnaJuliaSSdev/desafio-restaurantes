import { FormEvent, useRef, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { createUser } from "../lib/requests/registerUser";
import { useNavigate } from "react-router-dom";
import { Message, MessageProps } from "@/components/ui/Message";
import { userRegisterValidation } from "@/lib/utils/userRegisterValidation";

type InputRefs = {
    username: React.RefObject<HTMLInputElement>;
    lastName: React.RefObject<HTMLInputElement>;
    email: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;
}

export function RegisterUserPage() {
    const navigate = useNavigate();
    
    const [ message, setMessage ] = useState<MessageProps | null>(null);

    const inputRefs: InputRefs = {
        username: useRef<HTMLInputElement>(null),
        lastName: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null)
    }

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const username = inputRefs.username.current?.value || '';
        const lastName = inputRefs.lastName.current?.value || '';
        const email = inputRefs.email.current?.value || '';
        const password = inputRefs.password.current?.value || '';
        
        switch (userRegisterValidation(username, lastName, email, password)) {
            case 'CAMPO_VAZIO':
                setMessage({
                    type: "WARNING",
                    description: "Todos os campos devem ser preenchidos",
                });
                return;
            
            case 'SENHA_PEQUENA':
                setMessage({
                    type: "WARNING",
                    description: "Senha muito pequena, deve conter no mínimo 8 caracteres",
                });
                return;

            case 'SENHA_GRANDE':
                setMessage({
                    type: "WARNING",
                    description: "Senha muito grande, deve conter no máximo 12 caracteres",
                });
                return;

            case 'EMAIL_INVALIDO':
                setMessage({
                    type: "WARNING",
                    description: "Insira um e-mail válido",
                });
                return;
        }

        const fullName = [username, lastName].join(" ")

        createUser(fullName, email, password)
        navigate('/')
    }

    return (
        <>
        <Container>
            <h1>Registrar</h1>
            {message && <Message {...message} />}
            <Form method="POST" onSubmit={handleFormSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="email">Username</FormLabel>
                    <FormControl
                        type="text"
                        name="username"
                        id="username"
                        className="mb-3"
                        ref={inputRefs.username}
                    >
                    </FormControl>

                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <FormControl
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="mb-3"
                        ref={inputRefs.lastName}
                    >
                    </FormControl>

                    <FormLabel htmlFor="email">E-mail</FormLabel>
                    <FormControl
                        type="text"
                        name="email"
                        id="email"
                        className="mb-3"
                        ref={inputRefs.email}
                    >
                    </FormControl>

                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl
                        type="password"
                        name="password"
                        id="password"
                        className="mb-3"
                        ref={inputRefs.password}
                    >
                    </FormControl>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
        </>
    )
}