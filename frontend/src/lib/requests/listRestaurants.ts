import { http } from "./http";

export async function listRestaurant() {
  http.get("restaurant/getAll", {
    headers: { "Content-Type": "application/json" },
  });

  return 200;
}
