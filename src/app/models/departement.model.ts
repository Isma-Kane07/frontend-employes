import { Employe } from "./employe.model";

export interface Departement {
    id?: number;
    nomDepartment: string;
    taille: number;
    employes?: Employe[]; // Liste des employés du département
}