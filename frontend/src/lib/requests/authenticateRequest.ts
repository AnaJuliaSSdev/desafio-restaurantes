import { AxiosError } from "axios";
import { http } from "./http";

type AuthenticationSuccessResponse = {
  token: string;
};

export async function authenticateRequest(
  email: string,
  password: string
): Promise<[Error | undefined, AuthenticationSuccessResponse | undefined]> {
  try {
    const response = await http.post<AuthenticationSuccessResponse>(
      "/auth/login",
      {
        email,
        password,
      }
    );
    return [undefined, response.data];
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.code === "ERR_NETWORK") {
        return [new Error("NETWORK_CONNECTION_ISSUE"), undefined];
      }
      return [new Error("INVALID_CREDENTIALS"), undefined];
    }
    return [new Error("UNEXCEPTED_ERROR"), undefined];
  }
}
