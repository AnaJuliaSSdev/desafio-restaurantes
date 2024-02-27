import { http } from "./http";


export async function createUser(firstName: string, lastName: string, email: string, password: string): Promise<number> {

    http.post('auth/register', { firstName: firstName, lastName: lastName, email: email, password: password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return 200;
}