import "./Authenticate.css";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { authenticateRequest } from "@/lib/requests";
import { Message, MessageProps } from "@/components/Message/Message";
import { useAuth } from "@/hooks";
import { useTranslation } from "react-i18next";

export function AuthenticateUserPage() {
  const { updateAccessToken } = useAuth();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage({
        type: "info",
        description: `${t("messages.empty-email-and-password")}`,
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
            description: `${t("messages.invalid-credentials")}`,
          });
          break;
        case "NETWORK_CONNECTION_ISSUE":
          setMessage({
            type: "warning",
            description: `${t("messages.internet-connection")}`,
          });
          break;
      }
    }
    if (response) {
      setMessage({
        type: "success",
        description: `${t("messages.successfull-authenticated")}`,
      });
      setTimeout(function () {
        updateAccessToken(response.token);
        navigate("/", { replace: true });
      }, 1500);
    }
  };

  return (
    <Container className="login-container">
      <Text className="authenticate-login colorRed align-center">
        {t("authenticate.login")}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="boxShadow marginBottom"
          />
        </Container>
        <Container className="align-center marginBottom">
          <Button
            onClick={handleFormSubmit}
            type="submit"
            className="button-submit"
          >
            {t("authenticate.login")}
          </Button>
        </Container>
        <Container className="align-center">
          <Text as={"p"}>
            {t("authenticate.dont-have-account")}
            <Link href="/register" className="linkBlue" fontWeight={"bold"}>
              {t("authenticate.sign-up")}
            </Link>{" "}
          </Text>
        </Container>
      </FormControl>
    </Container>
  );
}
