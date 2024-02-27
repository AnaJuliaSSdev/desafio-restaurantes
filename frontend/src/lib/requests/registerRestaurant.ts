import { http } from "./http";

export async function createRestaurant(name: string, description: string, website: string, cep: string): Promise<number> {

    http.post('restaurant/create', { name: name, description: description, website: website, cep: cep }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return 200;
}