export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  locale: string;
  uf: string;
  locationNumber: string;
  complement?: string;
}
