import { http } from "./http";


export async function createUser(fullName: string, email: string, password: string): Promise<number> {


    http.post('auth/register', { username: fullName, email: email, password: password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return 200;
}