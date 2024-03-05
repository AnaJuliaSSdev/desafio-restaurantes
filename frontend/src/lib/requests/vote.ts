import { http } from "./http";

export async function userVote(id_restaurant: number): Promise<any> {
  return http.put(`voting/userVote/${id_restaurant}`);
}
