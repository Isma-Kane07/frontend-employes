import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule pour [(ngModel)]
import { AuthService } from '../../services/auth.service'; // Pour récupérer l'utilisateur connecté

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajoutez FormsModule
  template: `
    <section class="container px-4 mx-auto">
      <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white">
          Paramètres du Compte
        </h2>
      </div>

      <div *ngIf="message" class="mt-4 px-4 py-2 text-sm text-center text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
          {{ message }}
      </div>
      <div *ngIf="errorMessage" class="mt-4 px-4 py-2 text-sm text-center bg-red-500 text-white rounded-lg" role="alert">
          {{ errorMessage }}
      </div>

      <div class="mt-6">
        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <div class="p-6 bg-white dark:bg-gray-800">
            <form (ngSubmit)="saveSettings()">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="username">Nom d'utilisateur</label>
                  <input id="username" type="text" [(ngModel)]="username" name="username" required
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Adresse Email</label>
                  <input id="emailAddress" type="email" [(ngModel)]="email" name="email" required
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>
                
                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="phone">Numéro de téléphone</label>
                  <input id="phone" type="tel" [(ngModel)]="phone" name="phone"
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="currentPassword">Mot de passe actuel</label>
                  <input id="currentPassword" type="password" [(ngModel)]="currentPassword" name="currentPassword"
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>

                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="newPassword">Nouveau mot de passe</label>
                  <input id="newPassword" type="password" [(ngModel)]="newPassword" name="newPassword"
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>
                
                <div>
                  <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Confirmer le nouveau mot de passe</label>
                  <input id="passwordConfirmation" type="password" [(ngModel)]="passwordConfirmation" name="passwordConfirmation"
                         class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                </div>
              </div>

              <div class="flex justify-end mt-6">
                <button type="submit"
                        class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './parametres.component.css'
})
export class ParametresComponent implements OnInit {
  username: string = '';
  email: string = '';
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;

  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const loggedInEmploye = this.authService.getLoggedInEmploye();
    if (loggedInEmploye) {
      this.username = loggedInEmploye.nom;
      this.email = `${loggedInEmploye.noMatricule}@example.com`; // Placeholder pour l'email
      this.phone = loggedInEmploye.tel;
    } else {
      this.errorMessage = "Impossible de charger les informations de l'utilisateur.";
    }
  }

  saveSettings(): void {
    this.message = '';
    this.errorMessage = '';

    // Logique de validation et d'enregistrement (simulée)
    if (this.newPassword) {
      if (!this.currentPassword) {
        this.errorMessage = "Veuillez entrer votre mot de passe actuel pour changer le mot de passe.";
        return;
      }
      if (this.newPassword !== this.passwordConfirmation) {
        this.errorMessage = "Les nouveaux mots de passe ne correspondent pas.";
        return;
      }
      if (this.newPassword.length < 6) {
        this.errorMessage = "Le nouveau mot de passe doit contenir au moins 6 caractères.";
        return;
      }
    }

    console.log('Paramètres sauvegardés (fictif):', {
      username: this.username,
      email: this.email,
      phone: this.phone,
      newPassword: this.newPassword ? '***' : undefined
    });

    this.message = 'Paramètres sauvegardés avec succès !';
    this.currentPassword = '';
    this.newPassword = '';
    this.passwordConfirmation = '';
  }

  // deleteAccount() a été retiré car il n'est plus pertinent avec la réduction des éléments
}
