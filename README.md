TalentHub

Description

TalentHub est une application web permettant de gérer des annonces d'emploi. Les utilisateurs peuvent consulter, créer, modifier et supprimer des annonces. Chaque annonce inclut un titre, une description, des compétences recherchées, le type de mission, la date d'intégration, le salaire, et une unité de salaire. Les modifications et suppressions nécessitent un mot de passe défini lors de la création.

Fonctionnalités

Accueil : Affiche les trois dernières annonces avec un lien vers la liste complète.

Liste des annonces : Présente toutes les annonces disponibles avec un aperçu de leur description et de leurs tags.

Détail d'une annonce : Montre les informations complètes d'une annonce avec des options pour modifier ou supprimer.
Création d'annonce : Formulaire pour ajouter une nouvelle annonce avec validation des champs.

Modification d'annonce : Formulaire pour éditer une annonce existante, protégé par mot de passe.

Suppression d'annonce : Formulaire pour supprimer une annonce, également protégé par mot de passe.

Validations :
Titre : maximum 50 caractères.
Description : maximum 500 caractères.
Mot de passe : maximum 50 caractères.



Technologies utilisées

Backend : Node.js, Express.js, TypeScript
Frontend : EJS (Embedded JavaScript) pour les templates, CSS personnalisé
Middleware : method-override pour gérer les requêtes PUT
Fonts : Google Fonts (Poiret One, Quicksand)

Structure du projet
Projetexpressnode/
├── public/
│   ├── logo.png
│   └── style.css
├── views/
│   ├── pages/
│   │   ├── annonce.ejs
│   │   ├── annonceList.ejs
│   │   ├── creation.ejs
│   │   ├── delete.ejs
│   │   ├── edition.ejs
│   │   └── home.ejs
│   ├── partials/
│   │   └── header.ejs
│   └── layout.ejs
├── controllers/
│   └── annonceController.ts
├── routes/
│   └── annonce.ts
├── libs/
│   └── Controller.ts
├── middlewares.ts
├── server.ts
├── package.json
└── README.md


public/ : Contient les fichiers statiques (CSS et logo).
views/ : Contient les templates EJS.
pages/ : Templates pour chaque page (accueil, liste, détail, création, modification, suppression).
partials/ : Composants réutilisables (en-tête).
layout.ejs : Modèle principal appliqué à toutes les pages.


controllers/ : Logique métier pour gérer les annonces.
routes/ : Définition des routes API.
libs/ : Classe de base pour les contrôleurs.
middlewares.ts : Middleware de journalisation.
server.ts : Point d'entrée du serveur Express.

Prérequis

Node.js (version 16 ou supérieure)
npm (inclus avec Node.js)

Installation

Cloner le dépôt :
git clone <url-du-dépôt>
cd Projetexpressnode


Installer les dépendances :
npm install
npm install express method-override ejs


Vérifier les fichiers statiques :

Assurez-vous que public/logo.png et public/style.css existent.
Si logo.png est manquant, fournissez une image ou supprimez la référence dans views/partials/header.ejs.


Configurer les permissions :

Assurez-vous que le dossier public est accessible en lecture par le serveur.



Exécution

Démarrer le serveur :
npx ts-node server.ts


Accéder à l'application :

Ouvrez un navigateur à l'adresse http://localhost:3008.



Routes disponibles

GET / : Page d'accueil avec les trois dernières annonces.
GET /annonces/list : Liste de toutes les annonces.
GET /annonces/:id : Détails d'une annonce spécifique.
GET /annonces/create/new : Formulaire de création d'annonce.
POST /annonces/create : Créer une nouvelle annonce.
GET /annonces/:id/edit : Formulaire de modification d'annonce.
PUT /annonces/:id/edit : Mettre à jour une annonce.
GET /annonces/:id/delete : Formulaire de suppression d'annonce.
POST /annonces/:id/delete : Supprimer une annonce.

Validations des formulaires

Titre : Maximum 50 caractères.
Description : Maximum 500 caractères.
Mot de passe : Maximum 50 caractères.
Les erreurs de validation affichent un message sur les pages de création ou de modification.

Exemple d'utilisation

Créer une annonce :

Accédez à http://localhost:3008/annonces/create/new.
Remplissez le formulaire (titre, description, compétences, etc.).
Si les validations échouent (par exemple, titre trop long), un message d'erreur s'affichera.
Après succès, vous serez redirigé vers la liste des annonces avec un message de confirmation.


Modifier une annonce :

Accédez à http://localhost:3008/annonces/:id/edit.
Entrez le mot de passe défini lors de la création.
Modifiez les champs et soumettez. Les erreurs de validation ou un mot de passe incorrect affichent un message.


Supprimer une annonce :

Accédez à http://localhost:3008/annonces/:id/delete.
Entrez le mot de passe correct pour supprimer l'annonce.



