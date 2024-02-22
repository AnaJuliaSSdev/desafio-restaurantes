import { Alert } from "react-bootstrap";

export type MessageProps = {
  description: string;
  type: "SUCCESS" | "ERROR" | "INFO" | "WARNING";
};

export function Message({ type, description }: MessageProps) {
  const variants = {
    SUCCESS: "success",
    ERROR: "danger",
    WARNING: "warning",
    INFO: "info",
  };
  return <Alert variant={variants[type]}>{description}</Alert>;
}
