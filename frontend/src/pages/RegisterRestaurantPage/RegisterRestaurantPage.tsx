import { Message, MessageProps } from "@/components/Message/Message";
import "./RegisterRestaurantPage.css";
import { useRef, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  FormControl,
  FormLabel,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { restaurantRegisterValidations } from "@/lib/utils/restaurantRegisterValidations";

type InputRefs = {
  name: React.RefObject<HTMLInputElement>;
  description: React.RefObject<HTMLTextAreaElement>;
  website: React.RefObject<HTMLInputElement>;
  cep: React.RefObject<HTMLInputElement>;
};

export function RegisterRestaurantPage() {
  const VIA_CEP_URL = "https://viacep.com.br/ws/";
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageProps | null>(null);
  const [cep, setCep] = useState("");
  const [isCepValid, setIsCepValid] = useState(false); 
  const cepPattern = /\d{5}[-\s]?\d{3}/; 
  const { t } = useTranslation();

  const inputRefs: InputRefs = {
    name: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
    website: useRef<HTMLInputElement>(null),
    cep: useRef<HTMLInputElement>(null)
  };

  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let cep = event.target.value;
    setCep(cep);
    if(cepPattern.test(cep)){
        try{
            const response = await fetch(`${VIA_CEP_URL}${cep}/json/`);
            const data = await response.json()
            setIsCepValid(true)
            console.log("cep válido")
            return data; 
        } catch{
            setMessage({
                type: "warning",
                description:
                  "Insira um CEP válido.",
              });
        }
    } else {
        setMessage({
            type: "warning",
            description:
              "Insira um CEP válido.",
          });
    }
    console.log("cep inválido")
    setIsCepValid(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = inputRefs.name.current?.value.trim() ?? "";
    const description = inputRefs.description.current?.value.trim() ?? "";
    const website = inputRefs.website.current?.value.trim() ?? "";
    const cep = inputRefs.cep.current?.value.trim() ?? "";

    console.log(isCepValid)

    let validationError = restaurantRegisterValidations(name, description);

    if (validationError) {
      setMessage({
        type: "warning",
        description: validationError.message,
      });
      return;
    }
    try {
      //cria restaurante
      navigate("/");
    } catch (error) {
      setMessage({
        type: "warning",
        description:
          "Erro ao criar restaurante. Por favor, tente novamente mais tarde.",
      });
    }
  };

  return (
    <Container className="register-container">
      <Text className="register-name colorRed align-center">
        {t("register-restaurant.register")}
      </Text>
      {message && <Message {...message} />}
      <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel htmlFor="name">{t("register-restaurant.name")}</FormLabel>
        <Input
          placeholder={t("register-restaurant.name-placeholder")}
          type="text"
          name="name"
          id="name"
          className="mb-3 boxShadow"
          ref={inputRefs.name}
        ></Input>

        <FormLabel htmlFor="description">
          {t("register-restaurant.description")}
        </FormLabel>
        <Textarea
          placeholder={t("register-restaurant.description-placeholder")}
          name="description"
          id="description"
          className="mb-3 boxShadow"
          ref={inputRefs.description}
        ></Textarea>

        <FormLabel htmlFor="website">
          {t("register-restaurant.website")}
        </FormLabel>
        <Input
          placeholder={t("register-restaurant.website-placeholder")}
          type="text"
          name="website"
          id="website"
          className="mb-3 boxShadow"
          ref={inputRefs.website}
        ></Input>

        <FormLabel htmlFor="cep">{t("register-restaurant.cep")}</FormLabel>
        <Input
          value={cep}
          onChange={handleCepChange}
          placeholder={t("register-restaurant.cep-placeholder")}
          type="text"
          name="cep"
          id="cep"
          className="mb-3 boxShadow"
          ref={inputRefs.website}
        ></Input>

        <FormLabel htmlFor="street">
          {t("register-restaurant.street")}
        </FormLabel>
        <Input
          placeholder={t("register-restaurant.street-placeholder")}
          type="text"
          name="street"
          id="street"
          className="mb-3 boxShadow"
          //ref={inputRefs.street}
        ></Input>

        <FormLabel htmlFor="neighborhood">
          {t("register-restaurant.neighborhood")}
        </FormLabel>
        <Input
          placeholder={t("register-restaurant.neighborhood-placeholder")}
          type="text"
          name="neighborhood"
          id="neighborhood"
          className="mb-3 boxShadow"
          //ref={inputRefs.neighborhood}
        ></Input>

        <FormLabel htmlFor="locale">
          {t("register-restaurant.locale")}
        </FormLabel>
        <Input
          placeholder={t("register-restaurant.locale-placeholder")}
          type="text"
          name="locale"
          id="locale"
          className="mb-3 boxShadow"
          //ref={inputRefs.locale}
        ></Input>

        <FormLabel htmlFor="uf">
          {t("register-restaurant.uf")}
        </FormLabel>
        <Input
          placeholder={t("register-restaurant.uf-placeholder")}
          type="text"
          name="uf"
          id="uf"
          className="mb-3 boxShadow"
          //ref={inputRefs.uf}
        ></Input>

        <Container className="align-center">
          <Button
            isDisabled = {!isCepValid}
            type="submit"
            className="button-submit marginBottom"
          >
            {t("register-restaurant.create")}
          </Button>
        </Container>
      </FormControl>
      </form>
    </Container>
  );
}
