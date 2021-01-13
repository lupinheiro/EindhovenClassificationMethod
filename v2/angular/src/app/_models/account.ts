import { Role } from './role';

export class Account {
    id: string;
    title: string;
    firstName: string;
    companyName: string;
    email: string;
    role: Role;
    jwtToken?: string;
}