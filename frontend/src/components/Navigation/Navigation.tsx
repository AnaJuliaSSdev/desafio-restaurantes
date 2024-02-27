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
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation();
  const {accessToken, updateAccessToken} = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
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
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
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
          { accessToken ?
            <>
              <Button as={"a"} display={{ base: "none", md: "inline-flex" }} fontSize={"lg"} fontWeight={600} className="button-submit" onClick={logout}>{t("navigation.exit")}</Button>
            </>
            :
            <>
              <Button as={"a"} fontSize={"lg"} fontWeight={400} variant={"link"} href={"/register"}>{t("navigation.register")}</Button>
              <Button as={"a"} display={{ base: "none", md: "inline-flex" }} fontSize={"lg"} fontWeight={600} href={"/login"} className="button-submit">{t("navigation.login")}</Button>
            </>
          }

          
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { t } = useTranslation();

  return (
    <Stack direction={"row"} spacing={4}>
      <Box key="tiririca">
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Box
              as="a"
              p={2}
              href={"/"}
              fontSize={"lg"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
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
      bg={useColorModeValue("white", "gray.800")}
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
      <Box
        py={2}
        as="a"
        href={"/"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {t("home.home")}
        </Text>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          <Box as="a" py={2} href={"#"}></Box>
        </Stack>
      </Collapse>
    </Stack>
  );
};
