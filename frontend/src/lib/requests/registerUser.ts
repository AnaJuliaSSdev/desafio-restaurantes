import { http } from "./http";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> {
  return http.post("auth/register", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
}
