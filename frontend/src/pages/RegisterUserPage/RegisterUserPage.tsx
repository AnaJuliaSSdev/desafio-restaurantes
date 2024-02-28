import "./RegisterUserPage.css";
import { FormEvent, useState } from "react";
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

export function RegisterUserPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [message, setMessage] = useState<MessageProps | null>(null);
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
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

    try {
      await createUser(firstName, lastName,  email, password);
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
      <Text className="register-name colorRed align-center">{t('register.register')}</Text>
      {message && <Message {...message} />}
      <FormControl>
        <FormLabel htmlFor="firstName">{t("register.name")}</FormLabel>
        <Input
          placeholder={t("register.name-placeholder")}
          type="text"
          name="firstName"
          id="firstName"
          className="mb-3 boxShadow"
          value ={firstName}
          onChange = {(event) => setFirstName(event.target.value)}
        ></Input>

        <FormLabel htmlFor="lastName">{t("register.last-name")}</FormLabel>
        <Input
          placeholder={t("register.last-name-placeholder")}
          type="text"
          name="lastName"
          id="lastName"
          className="mb-3 boxShadow"
          value={lastName}
          onChange = {(event) => setLastName(event.target.value)}
        ></Input>

        <FormLabel htmlFor="email">{t("register.e-mail")}</FormLabel>
        <Input
          placeholder={t("register.email-placeholder")}
          type="text"
          name="email"
          id="email"
          className="mb-3 boxShadow"
          value={email}
          onChange = {(event) => setEmail(event.target.value)}
        ></Input>

        <FormLabel htmlFor="password">{t("register.password")}</FormLabel>
        <Input
          placeholder={t("register.password-placeholder")}
          type="password"
          name="password"
          id="password"
          className="mb-3 boxShadow marginBottom"
          value={password}
          onChange = {(event) => setPassword(event.target.value)}
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
          <Text as={'p'}>{t('register.already-have-account')} <Link href="/login" className="linkBlue" fontWeight={"bold"}>{t('register.log-in')}</Link> </Text>
        </Container>

      </FormControl>
    </Container>
  );
}