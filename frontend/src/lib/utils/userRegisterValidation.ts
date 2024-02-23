export function userRegisterValidation(username: string, lastName: string, email: string, password: string): string {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!username || !email || !password || !lastName) {
        return 'CAMPO_VAZIO';
    }

    if(password.length < 8) {
        return 'SENHA_PEQUENA';
    }

    if(password.length > 12) {
        return 'SENHA_GRANDE';
    }

    if(!emailPattern.test(email) || email.length < 1) {
        return 'EMAIL_INVALIDO';
    }

    return 'ERROR';
}