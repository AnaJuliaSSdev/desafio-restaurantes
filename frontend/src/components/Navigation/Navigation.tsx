"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const { accessToken, updateAccessToken } = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <Box>
      <Flex
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        className="flex-icon-mobile"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          ></Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {accessToken ? (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              className="button-submit navigation-exit"
              onClick={logout}
            >
              {t("navigation.exit")}
            </Button>
          ) : (
            <>
              <Button
                as={"a"}
                variant={"link"}
                href={"/register"}
                className="navigation-register"
              >
                {t("navigation.register")}
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                href={"/login"}
                className="button-submit navigation-exit"
              >
                {t("navigation.login")}
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { t } = useTranslation();

  return (
    <Stack direction={"row"} spacing={4}>
      <Box fontSize={20} key={t("home.home")}>
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Box
              as="a"
              p={2}
              href={"/"}
              className="link-home"
            >
              {t("home.home")}
            </Box>
          </PopoverTrigger>
        </Popover>
      </Box>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={"white"}
      p={4}
      display={{ md: "none" }}
    >
      <MobileNavItem />
    </Stack>
  );
};

const MobileNavItem = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Box as="a" href={"/"} className="link-start">
        <Text>{t("home.home")}</Text>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          align={"start"}
          className="movile-nav-item"
        >
          <Box as="a" py={2} href={"#"}></Box>
        </Stack>
      </Collapse>
    </Stack>
  );
};