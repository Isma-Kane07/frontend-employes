import { Employe } from "./employe.model";

export interface Mission {
    id?: number;
    lieu: string;
    description: string;
    dateDebut: string;
    dateFin: string;
    employeId: number; // L'ID de l'employé assigné
    employe?: Employe; // L'objet employé complet (optionnel, selon le DTO backend)
}