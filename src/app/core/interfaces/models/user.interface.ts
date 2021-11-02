import { Token } from "./token.interface";

export interface User {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    //password: string
    token: Token
} 