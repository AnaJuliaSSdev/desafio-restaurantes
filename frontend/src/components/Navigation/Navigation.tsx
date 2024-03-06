import { useAuth } from "@/hooks";
import { Box, Button, ButtonGroup, Link, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const { t } = useTranslation();
  const { accessToken, updateAccessToken } = useAuth();
  return (
    <Flex
      minWidth="max-content"
      as="nav"
      align="center"
      justify="space-between"
      paddingY="0.5rem"
      paddingX="1.5rem"
      bg="white"
      color="black"
    >
      <Box p="4">
        <Flex flexDirection={"row"} gap={5}>
          <Link href="/">{t("navigation.home")}</Link>
          <Link href="restaurant/register">{t("navigation.restaurants")}</Link>
          <Link href="votings/list">{t("navigation.votings")}</Link>
        </Flex>
      </Box>
      <ButtonGroup p={1} gap="4">
        {accessToken ? (
          <Button
            onClick={() => updateAccessToken(null)}
            className="button-submit"
          >
            Sair
          </Button>
        ) : (
          <>
            <Button
              variant={"link"}
              as={"a"}
              href={"register"}
              textDecoration={"underline"}
            >
              {t("navigation.register")}
            </Button>
            <Button as={"a"} href={"/login"} className="button-submit">
              {t("navigation.login")}
            </Button>
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
}
