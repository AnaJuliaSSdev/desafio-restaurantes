import { Message, MessageProps } from "@/components/Message/Message";
import "./RegisterRestaurantPage.css";
import { FormEvent, useState } from "react";
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
import { restaurantRegisterValidations } from "@/lib/utils/restaurantRegisterValidations";
import { createRestaurant } from "@/lib/requests/registerRestaurant";
import { useNavigate } from "react-router-dom";

export function RegisterRestaurantPage() {
  const VIA_CEP_URL = "https://viacep.com.br/ws/";
  const [message, setMessage] = useState<MessageProps | null>(null);
  const cepPattern = /\d{5}[-\s]?\d{3}/;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [cep, setCep] = useState("");
  const [isCepValid, setIsCepValid] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [uf, setUf] = useState("");
  const [locale, setLocale] = useState("");
  const [locationNumber, setLocationNumber] = useState("");

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let cep = event.target.value;
    setCep(cep);
    if (cepPattern.test(cep)) {
      try {
        const response = await fetch(`${VIA_CEP_URL}${cep}/json/`);
        const data = await response.json();
        setIsCepValid(true);
        setMessage(null);
        setNeighborhood(data.bairro);
        setStreet(data.logradouro);
        setUf(data.uf);
        setLocale(data.localidade);
        return data;
      } catch {
        setMessage({
          type: "warning",
          description: `${t("messages.invalid-cep")}`,
        });
      }
    } else {
      setMessage({
        type: "warning",
        description: `${t("messages.invalid-cep")}`,
      });
    }
    setIsCepValid(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let validationError = restaurantRegisterValidations(name, description);

    if (validationError) {
      setMessage({
        type: "warning",
        description: validationError.message,
      });
      return;
    }
    try {
      await createRestaurant(name, description, website, {
        cep,
        street,
        neighborhood,
        locale,
        uf,
        locationNumber,
      });
      setMessage({
        type: "success",
        description: "Restaurante cadastrado com sucesso!",
      });
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
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Input>

          <FormLabel htmlFor="description">
            {t("register-restaurant.description")}
          </FormLabel>
          <Textarea
            placeholder={t("register-restaurant.description-placeholder")}
            name="description"
            id="description"
            className="mb-3 boxShadow"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
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
            value={street}
            onChange={(event) => setStreet(event.target.value)}
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
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
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
            value={locale}
            onChange={(event) => setLocale(event.target.value)}
          ></Input>

          <FormLabel htmlFor="locationNumber">
            {t("register-restaurant.locationNumber")}
          </FormLabel>
          <Input
            placeholder={t("register-restaurant.locationNumber-placeholder")}
            type="text"
            name="locationNumber"
            id="locationNumber"
            className="mb-3 boxShadow"
            value={locationNumber}
            onChange={(event) => setLocationNumber(event.target.value)}
          ></Input>

          <FormLabel htmlFor="uf">{t("register-restaurant.uf")}</FormLabel>
          <Input
            placeholder={t("register-restaurant.uf-placeholder")}
            type="text"
            name="uf"
            id="uf"
            className="mb-3 boxShadow"
            value={uf}
            onChange={(event) => setUf(event.target.value)}
          ></Input>

          <Container className="align-center">
            <Button
              isDisabled={!isCepValid}
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
