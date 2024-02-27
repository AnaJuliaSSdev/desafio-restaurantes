import './Authenticate.css'
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";

import { authenticateRequest } from "@/lib/requests";
import { Message, MessageProps } from "@/components/Message/Message";
import { useAuth } from "@/hooks";
import { useTranslation } from "react-i18next";

type InputRefs = {
  email: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
};

export function AuthenticateUserPage() {
  const { updateAccessToken } = useAuth();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRefs: InputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const resetForm = () => {
    if (inputRefs.email.current) {
      inputRefs.email.current.value = "";
    }
    if (inputRefs.password.current) {
      inputRefs.password.current.value = "";
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const email = inputRefs.email.current?.value ?? "";
    const password = inputRefs.password.current?.value ?? "";

    if (!email || !password) {
      setMessage({
        type: "info",
        description: "Por favor, preencha os campos de Email e Senha",
      });
      return;
    }
    const [error, response] = await authenticateRequest(email, password);
    if (error) {
      resetForm();
      switch (error.message) {
        case "INVALID_CREDENTIALS":
        case "UNEXCEPTED_ERROR":
          setMessage({
            type: "error",
            description: "A autenticação falhou devido à credenciais invalidas",
          });
          break;
        case "NETWORK_CONNECTION_ISSUE":
          setMessage({
            type: "warning",
            description: "Por favor, verifique sua conexão com a internet",
          });
          break;
      }
    }
    if (response) {
      setMessage({
        type: "success",
        description: "Você autenticou com sucesso",
      });
      setTimeout(function () {
        updateAccessToken(response.token);
        navigate("/", { replace: true });
      }, 1500);
    }
  };

  return (  
    <Container>
      <Text className='authenticate-login colorRed align-center'>
        {t('authenticate.login')}
      </Text>
      {message && <Message {...message} />}
      <FormControl>
        <Container className="mb-3">
          <FormLabel htmlFor="email">{t("authenticate.e-mail")}:</FormLabel>
          <Input
            placeholder={t("authenticate.email-placeholder")}
            type="text"
            name="email"
            id="email"
            ref={inputRefs.email}
            boxShadow="2px 3px 5px rgba(0, 0, 0, 0.2)"
            border="none"

          />
        </Container>
        <Container className="mb-3">
          <FormLabel htmlFor="password">
            {t("authenticate.password")}:
          </FormLabel>
          <Input
            placeholder={t("authenticate.password-placeholder")}
            type="password"
            name="password"
            id="password"
            ref={inputRefs.password}
            className='boxShadow marginBottom'
          />
        </Container>
        <Container className='align-center'>
          <Button onClick={handleFormSubmit} type="submit" className='button-submit'>
            {t("authenticate.login")}
          </Button>
        </Container>
        <Container>
          <Text> </Text>
        </Container>
      </FormControl>
    </Container>
  );
}
