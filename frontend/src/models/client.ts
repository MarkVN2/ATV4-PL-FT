import { Address } from "cluster";
import Telephone from "./telephone";

export default interface Client {
    id?: number;
    nome: string;
    nomeSocial: string;
    email: string | null;
    endereco: Address;
    telefones: Telephone[];
}