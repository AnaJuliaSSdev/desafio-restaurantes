import { Alert, AlertIcon } from "@chakra-ui/react";

export type MessageProps = {
  description: string;
  type: "success" | "error" | "info" | "warning";
};

export function Message({ type, description }: Readonly<MessageProps>) {
  return (
    <Alert status={type}>
      <AlertIcon />
      {description}
    </Alert>
  );
}
