import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function PrivateRoute() {
  const { accessToken, updateAccessToken } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { t } = useTranslation();

  function onCloseModal() {
    onClose();
    navigate("/register");
  }

  useEffect(() => {
    if (!accessToken) {
      onOpen();
    }
  }, [accessToken]);

  if (!accessToken) {
    return (
      <Modal isOpen={isOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('private-route.not-logged')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
            {t('private-route.authenticate')}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue">
              <Link to="/login">{t('private-route.ok')}</Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return <Outlet />;
}
