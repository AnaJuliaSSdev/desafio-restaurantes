import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { authenticateRequest } from "@/lib/requests";
import { Message, MessageProps } from "@/components/ui/Message";
import { useAuth } from "@/hooks";
import { useTranslation } from 'react-i18next'

type InputRefs = {
  email: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
};

export function AuthenticateUserPage() {
  const { updateAccessToken } = useAuth();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation()

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
    const email  = inputRefs.email.current?.value ?? "";
    const password = inputRefs.password.current?.value ?? "";
    
    if (!email || !password) {
      setMessage({
        type: "INFO",
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
            type: "ERROR",
            description: "A autenticação falhou devido à credenciais invalidas",
          });
          break;
        case "NETWORK_CONNECTION_ISSUE":
          setMessage({
            type: "WARNING",
            description: "Por favor, verifique sua conexão com a internet",
          });
          break;
      }
    }
    if (response) {
      setMessage({
        type: "SUCCESS",
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
      <h1>Entrar</h1>
      {message && <Message {...message} />}
      <FormControl>
        <Container className="mb-3">
          <FormLabel htmlFor="email">{t('authenticate.e-mail')}:</FormLabel>
          <Input type="text" name="email" id="email" ref={inputRefs.email} />
        </Container>
        <Container className="mb-3">
          <FormLabel htmlFor="password">{t('authenticate.password')}:</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            ref={inputRefs.password}
          />
        </Container>
        <Container>
          <Button onClick={handleFormSubmit} type="submit">
          {t('authenticate.login')}
          </Button>
        </Container>
      </FormControl>
    </Container>
  );
}
