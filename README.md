# Documentation de l'API

Ce document fournit une documentation de l'API pour les quatre modules suivants : utilisateurs, catégories, articles et authentification.

## Installation

1. Clonez ce dépôt :
   ```

   ```

git clone <URL_DU_REPO>

```
2. Installez les dépendances :
```

npm install

```
3. Lancez le serveur :
```

npm start



## Modules

### Utilisateurs

Ce module gère la gestion des utilisateurs. Il fournit des endpoints pour créer, récupérer, mettre à jour et supprimer des utilisateurs.

Endpoints :

- `GET /api/users` : Récupérer tous les utilisateurs
- `POST /api/users` : Créer un nouvel utilisateur

### Catégories

Ce module gère la gestion des catégories. Il permet de créer, récupérer, mettre à jour et supprimer des catégories.

Endpoints :

- `GET /api/categories` : Récupérer toutes les catégories
- `POST /api/categories` : Créer une nouvelle catégorie

### Articles

Ce module gère la gestion des articles. Il offre des fonctionnalités pour créer, récupérer, mettre à jour et supprimer des articles.

Endpoints :

- `GET /api/articles` : Récupérer tous les articles
- `POST /api/articles` : Créer un nouvel article

### Authentification

Ce module gère l'authentification des utilisateurs. Il fournit un endpoint pour l'authentification des utilisateurs.

Endpoints :

- `POST /api/auth/login` : Authentifier un utilisateur

## Contribuer

Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

1. Forker le projet
2. Créer une nouvelle branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Valider les modifications (`git commit -am 'Ajouter une nouvelle fonctionnalité'`)
4. Pousser la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Soumettre une demande de tirage

## Auteur

[Ajouter votre nom] - [Ajouter votre email]

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

