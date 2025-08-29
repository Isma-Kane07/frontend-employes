import { Departement } from "./departement.model";
import { Mission } from "./mission.model"; // Assurez-vous d'importer Mission

/**
 * Modèle pour l'entité Employe.
 *
 * @interface Employe
 */
export interface Employe {
    id?: number;
    nom: string;
    prenom: string;
    noMatricule: string;
    tel: string;
    // Relations avec les entités connexes, utilisant les IDs pour l'envoi et les objets pour la réception.
    departementId?: number; // Pour l'envoi au backend (si l'objet complet n'est pas envoyé)
    departement?: Departement; // Pour la réception du backend si l'objet est imbriqué

    employeChefId?: number; // Pour l'envoi au backend
    employeChef?: Employe; // Pour la réception du backend si l'objet est imbriqué

    // Propriétés liées aux rôles et au statut de chef
    roles?: string[]; // La liste des noms de rôles que l'employé possède
    isChef?: boolean; // NOUVEAU: Indicateur si l'employé est un chef

    // Relations de liste (peuvent être nécessaires pour certains affichages ou logiques)
    missions?: Mission[];
    subordonnes?: Employe[]; // Liste des employés qui rapportent à cet employé
}