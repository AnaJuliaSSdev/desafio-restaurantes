export type ValidationResult = {
    key: string;
    message: string;
};
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export function userRegisterValidation(email: string, password: string, username: string, lastName: string,): ValidationResult | '' {
    

    if(!username || !email || !password || !lastName) {
        return { key: "EMPTY_FIELD", message: "Todos os campos devem ser preenchidos" };
    }

    if(password.length < 8) {
        return { key: "SMALL_PASSWORD", message: "Senha muito pequena, deve conter no mínimo 8 caracteres" };
    }

    if(password.length > 12) {
        return { key: "LARGE_PASSWORD", message: "Senha muito grande, deve conter no máximo 12 caracteres" };
    }

    if(!emailPattern.test(email) || email.length < 1) {
        return { key: "INVALID_EMAIL", message: "Insira um e-mail válido" };
    }

    return '';
}