### Application de Gestion de Personnages de Jeux Vidéo

Ce projet est une application de gestion de personnages de jeux vidéo et de jeux de rôle, développée dans le cadre du TP Noté du cours COMPLÉMENTS WEB.

## Présentation

L'objectif de cette application est de fournir une interface permettant aux utilisateurs de gérer et de découvrir des personnages de jeux vidéo ou de jeux de rôle. Les fonctionnalités principales incluent la visualisation d'une liste de personnages, la consultation des détails d'un personnage avec possibilité de notation et de mise en favoris, ainsi que la gestion des favoris.
Fonctionnalités

# Plusieurs vues

- Listing : Affichage de la liste des personnages.
- Détail d'un personnage : Consultation des détails d'un personnage avec possibilité de notation et de mise en favoris.
- Gestion des favoris : Possibilité de gérer les personnages favoris de l'utilisateur.

# Pagination

La liste des personnages est paginée pour améliorer la performance et la navigation.
Le stockage des données est sous forme de JSON.

# Évolutions possibles

- Outil de recherche : Ajout d'un outil de recherche pour faciliter la découverte de personnages.
- Système de notation : Intégration d'un système de notation permettant aux utilisateurs de donner leur avis sur les personnages.
- Système de favoris client : Stockage des personnages favoris de l'utilisateur en local pour une meilleure expérience utilisateur.
- Gestion des images : Mise en place du lazy loading pour optimiser le chargement des images.

# Contraintes

- Single Page Application : L'application sera développée comme une application à page unique pour une meilleure fluidité.
- Organisation du code sous forme de module : Le code sera organisé en modules pour une meilleure maintenabilité.
- Utilisation de classes et d'objets : Le code sera écrit en utilisant des classes et des objets pour une approche orientée objet.
- Arborescence cohérente et propre : L'arborescence du projet sera organisée de manière logique et compréhensible.

# Lancement du projet

Aller dans le fichier TPNot-JSPERSO et lancer la commande suivante:
- php -S localhost:8000

Si npm n'est pas installé:
- npm install server

Pour faire fonctionner les ajouts de notes faire:
- npx json-server static/json/notes.json