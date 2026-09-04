# Wikignose

> **Projet intégré à La Forêt Enchantée depuis le 4 septembre 2026.**  
> Le dépôt actif pour les évolutions de l’application est désormais `ludodulac/La-for-t-enchant-e`. Ce dépôt Wikignose reste conservé comme archive historique, documentation de référence et point de restauration de l’ancienne version autonome. Ne pas développer une nouvelle version active ici sans décision explicite de séparation des projets.

Wikignose est un moteur de recherche local pour une bibliothèque de PDF appartenant à un même ensemble d'enseignements.

L'intelligence artificielle intervient au moment de **l'indexation** d'un nouveau PDF : elle identifie la structure du document, les chapitres, les thèmes explicites et implicites, les maîtres/courants concernés et les pages pertinentes. Ensuite, l'application de consultation peut fonctionner **sans connexion à une IA** en interrogeant uniquement l'index local.

## Objectif

- rechercher un thème dans tous les ouvrages indexés ;
- classer les résultats par pertinence et importance ;
- indiquer le PDF, le chapitre et les pages concernés ;
- filtrer par école, courant ou maître ;
- exclure des mots ou des noms de la recherche ;
- afficher un **Répertoire des thèmes** uniquement lorsque l'utilisateur clique sur l'onglet prévu à cet effet ;
- permettre à terme l'extraction d'un ou plusieurs chapitres en nouveaux PDF imprimables/téléchargeables.

## Prototype historique

Le prototype autonome reste dans `app/` et son ancien index dans `data/index.js`.

L’implémentation active migrée se trouve maintenant dans La Forêt Enchantée :

- `wikignose.html` ;
- `js/wikignose.js` ;
- `data/wikignose-index.js` ;
- `js/admin-wikignose.js` ;
- `docs/WIKIGNOSE.md`.

## Mémoire technique

Les documents historiques restent importants pour comprendre les décisions antérieures :

1. `AGENTS.md`
2. `AI_START_HERE.md`
3. `docs/INDEXATION.md`
4. `docs/ADMIN_INDEXATION.md`

Les règles durables utiles ont été consolidées dans `docs/WIKIGNOSE.md` du dépôt La Forêt Enchantée.

## PDF

Les PDF originaux n’étaient pas présents dans ce dépôt GitHub au moment de la fusion. Leurs noms historiques restent référencés dans l’index migré. Les futurs PDF doivent être stockés dans le stockage privé du projet Supabase commun de La Forêt Enchantée et rattachés à l’index sans modifier les originaux.

## Backend historique

Le schéma Supabase historique a été sauvegardé dans `supabase/archive/2026-09-04_legacy_backend.sql` avant la mise en pause du projet Supabase Wikignose. Au moment de la bascule, il contenait 0 document en attente et 0 fichier PDF stocké.
