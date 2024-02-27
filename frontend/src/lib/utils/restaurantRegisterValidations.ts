export type ValidationResult = {
    key: string;
    message: string;
};

export function restaurantRegisterValidations(name: string, description: string): ValidationResult | '' {
    if(!name || !description){
        return { key: "EMPTY_FIELD", message: "Todos os campos devem ser preenchidos" };
    }
    return '';
}