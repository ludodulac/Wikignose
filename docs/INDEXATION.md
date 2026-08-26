# Protocole d'indexation Wikignose

## But

Transformer chaque nouveau PDF en données de recherche locales, suffisamment riches pour qu'une application sans IA puisse retrouver des thèmes, leurs emplacements et les chapitres correspondants.

## Étapes obligatoires pour un nouveau PDF

### 1. Identifier le document

Relever le titre, la collection/école, le numéro de cours ou volume, la date si elle existe, les auteurs/rédacteurs, le maître principal et le courant concerné.

### 2. Lire la structure complète

Relever la table des matières et déterminer les limites de chaque chapitre et sous-section. Les numéros de pages doivent correspondre aux pages du PDF utilisées pour l'extraction future.

### 3. Indexer le contenu

Pour chaque chapitre ou section significative, produire :

- `title` : titre exact ou fidèle de la section ;
- `pages` : début et fin ;
- `summary` : résumé factuel très bref ;
- `themes` : thèmes centraux et secondaires ;
- `aliases` : synonymes, formulations naturelles et concepts voisins utiles à une recherche ;
- `importance` : valeur de 1 à 5, où 5 signifie que la section traite directement et largement du thème ;
- `masters` et `currents` quand nécessaire.

Un thème peut être implicite si le sens du passage le justifie clairement. Il faut cependant éviter les interprétations spéculatives.

### 4. Mettre à jour `data/index.js`

Ajouter le nouveau document sans supprimer ni réécrire inutilement les documents déjà indexés.

Le **Répertoire des thèmes** n'est pas stocké séparément : l'application le reconstruit automatiquement en collectant tous les champs `themes` de toutes les sections. Cela garantit que le répertoire se renouvelle à chaque indexation.

### 5. Vérifier les filtres

Les champs `school`, `current` et `masters` doivent permettre des recherches ciblées par école, courant et maître.

La zone **Exclure** fonctionne sur le texte de recherche indexé (titre, résumé, thèmes, aliases, maîtres, courant). Une exclusion comme `Steiner` doit donc éliminer les résultats associés à Rudolf Steiner.

### 6. Vérifier le répertoire caché

L'écran principal ne doit pas déployer automatiquement la liste des thèmes. L'utilisateur doit cliquer sur **Répertoire des thèmes** pour l'ouvrir. À l'ouverture, les thèmes sont présentés dans l'ordre alphabétique.

### 7. Préparer l'extraction

Conserver les pages de début/fin avec suffisamment de précision pour permettre ultérieurement :

- l'extraction d'un chapitre ;
- l'extraction de plusieurs chapitres ;
- la création d'un nouveau PDF imprimable.

## Schéma logique

`École → Courant → Maître → Collection → Document → Chapitre/section → Thèmes`

Un même document ou une même section peut appartenir à plusieurs thèmes et mentionner plusieurs maîtres.

## Score de recherche du prototype

Le prototype calcule un score local en fonction des correspondances dans :

- le titre de section ;
- les thèmes ;
- les synonymes/aliases ;
- le résumé ;
- le titre du document ;
- les maîtres et le courant ;
- l'importance de la section.

Ce score pourra évoluer plus tard vers un index lexical plus robuste (SQLite FTS5, BM25 et éventuellement vecteurs locaux), sans rendre l'application dépendante d'une IA distante.

## Corpus initial

Les deux premiers documents utilisés comme exemples sont :

1. `EC_Cours_01_LEcole_Essenienne_Origine_mission_but-META.pdf`
2. `EC_Cours_02_le_premier_pas_appel_de_la_lumiere-META.pdf`

Leur index initial sert de référence de structure, mais il pourra être enrichi lors d'une indexation exhaustive ultérieure.
