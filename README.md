# Mini Réseau

Mini Réseau est une application web développée avec Next.js et Supabase, permettant aux utilisateurs de créer, modifier et supprimer des posts en temps réel. L'application utilise des fonctionnalités modernes de React et des services de backend sans serveur pour gérer l'authentification et la base de données.

## Table des matières

- [Mini Réseau](#mini-réseau)
  - [Table des matières](#table-des-matières)
  - [Fonctionnalités](#fonctionnalités)
  - [Technologies utilisées](#technologies-utilisées)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Contributions](#contributions)
  - [License](#license)

## Fonctionnalités

- Authentification des utilisateurs avec Supabase
- Création, modification et suppression de posts
- Mise à jour en temps réel des posts
- Interface utilisateur réactive avec Next.js et Tailwind CSS

## Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le développement d'applications web
- [Supabase](https://supabase.io/) - Backend as a Service (BaaS) pour la gestion de la base de données et l'authentification
- [React](https://reactjs.org/) - Bibliothèque JavaScript pour construire des interfaces utilisateur
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS pour un design moderne et réactif

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/mini-reseau.git
   cd mini-reseau
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Configurez votre fichier `.env.local` avec les variables d'environnement nécessaires pour Supabase :

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

   ou

   ```bash
   yarn dev
   ```

5. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Utilisation

- **Inscription / Connexion** : Les utilisateurs peuvent s'inscrire et se connecter via l'interface.
- **Gestion du profile** : Les utilisateurs peuvent modifier leur profile
- **Créer un post** : Une fois connecté, les utilisateurs peuvent créer de nouveaux posts.
- **Modifier un post** : Les utilisateurs peuvent modifier leurs propres posts.
- **Supprimer un post** : Les utilisateurs peuvent supprimer leurs posts.
- **Mise à jour en temps réel** : Les posts sont mis à jour en temps réel grâce à Supabase.

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/YourFeature`).
3. Apportez vos modifications et validez (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez vos modifications (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

## License

Ce projet est sous licence MIT. Pour plus de détails, veuillez consulter le fichier [LICENSE](LICENSE).