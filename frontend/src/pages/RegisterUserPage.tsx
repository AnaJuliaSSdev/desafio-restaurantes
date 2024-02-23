import { FormEvent, useRef, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { createUser } from "../lib/requests/registerUser";
import { useNavigate } from "react-router-dom";
import { Message, MessageProps } from "@/components/ui/Message";
import { userRegisterValidation } from "@/lib/utils/userRegisterValidation";
import { useTranslation } from "react-i18next";

type InputRefs = {
  firstName: React.RefObject<HTMLInputElement>;
  lastName: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
};

export function RegisterUserPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [message, setMessage] = useState<MessageProps | null>(null);

  const inputRefs: InputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const firstName = inputRefs.firstName.current?.value ?? "";
    const lastName = inputRefs.lastName.current?.value ?? "";
    const email = inputRefs.email.current?.value ?? "";
    const password = inputRefs.password.current?.value ?? "";

    let validationError = userRegisterValidation(
      email,
      password,
      firstName,
      lastName
    );

    if (validationError) {
      setMessage({
        type: "WARNING",
        description: validationError.message,
      });
      return;
    }

    try {
      await createUser(firstName, lastName,  email, password);
      navigate("/");
    } catch (error) {
      setMessage({
        type: "WARNING",
        description:
          "Erro ao criar usuário. Por favor, tente novamente mais tarde.",
      });
    }
  };

  return (
    <Container>
      <h1>Registrar</h1>
      {message && <Message {...message} />}
      <FormControl>
        <FormLabel htmlFor="email">{t("register.name")}</FormLabel>
        <Input
          type="text"
          name="username"
          id="username"
          className="mb-3"
          ref={inputRefs.firstName}
        ></Input>

        <FormLabel htmlFor="lastName">{t("register.last-name")}</FormLabel>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          className="mb-3"
          ref={inputRefs.lastName}
        ></Input>

        <FormLabel htmlFor="email">{t("register.e-mail")}</FormLabel>
        <Input
          type="text"
          name="email"
          id="email"
          className="mb-3"
          ref={inputRefs.email}
        ></Input>

        <FormLabel htmlFor="password">{t("register.password")}</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          className="mb-3"
          ref={inputRefs.password}
        ></Input>
        <Button type="submit" onClick={handleFormSubmit} colorScheme="green">
          {t("register.sign-up")}
        </Button>
      </FormControl>
    </Container>
  );
}
