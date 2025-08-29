import { Employe } from "./employe.model";

export interface AuthResponse {
    jwtToken: string;
    username?: string;
    roles?: string[]; // Tableau de chaînes pour mieux représenter les rôles
    employe?: Employe; // Employé associé à l'utilisateur
}