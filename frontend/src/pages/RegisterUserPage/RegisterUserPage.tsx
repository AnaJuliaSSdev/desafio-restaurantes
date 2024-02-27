import "./RegisterUserPage.css";
import { FormEvent, useRef, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { createUser } from "../../lib/requests/registerUser";
import { useNavigate } from "react-router-dom";
import { Message, MessageProps } from "@/components/Message/Message";
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
        type: "warning",
        description: validationError.message,
      });
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      await createUser(fullName, email, password);
      navigate("/");
    } catch (error) {
      setMessage({
        type: "warning",
        description:
          "Erro ao criar usuário. Por favor, tente novamente mais tarde.",
      });
    }
  };

  return (
    <Container className="register-container">
      <Text className="register-name colorRed align-center">Registrar</Text>
      {message && <Message {...message} />}
      <FormControl>
        <FormLabel htmlFor="firstName">{t("register.name")}</FormLabel>
        <Input
          placeholder={t("register.name-placeholder")}
          type="text"
          name="firstName"
          id="firstName"
          className="mb-3 boxShadow"
          ref={inputRefs.firstName}
        ></Input>

        <FormLabel htmlFor="lastName">{t("register.last-name")}</FormLabel>
        <Input
          placeholder={t("register.last-name-placeholder")}
          type="text"
          name="lastName"
          id="lastName"
          className="mb-3 boxShadow"
          ref={inputRefs.lastName}
        ></Input>

        <FormLabel htmlFor="email">{t("register.e-mail")}</FormLabel>
        <Input
          placeholder={t("register.email-placeholder")}
          type="text"
          name="email"
          id="email"
          className="mb-3 boxShadow"
          ref={inputRefs.email}
        ></Input>

        <FormLabel htmlFor="password">{t("register.password")}</FormLabel>
        <Input
          placeholder={t("register.password-placeholder")}
          type="password"
          name="password"
          id="password"
          className="mb-3 boxShadow marginBottom"
          ref={inputRefs.password}
        ></Input>
        <Container className="align-center">
          <Button
            type="submit"
            onClick={handleFormSubmit}
            className="button-submit marginBottom"
          >
            {t("register.sign-up")}
          </Button> 
        </Container>

        <Container className="align-center">
          <Text as={'p'}>Já tem uma conta? <Link href="/login" className="linkBlue" fontWeight={"bold"}>Entre</Link> </Text>
        </Container>

      </FormControl>
    </Container>
  );
}
