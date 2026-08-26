# Wikignose

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

## Prototype actuel

Le prototype minimaliste se trouve dans `app/` et son index dans `data/index.js`.

Pour l'ouvrir localement, ouvrir `app/index.html` dans un navigateur. Aucune IA ni serveur n'est nécessaire pour la recherche du prototype.

## Important pour les prochaines conversations IA

Avant toute indexation ou modification du corpus, lire impérativement :

1. `AGENTS.md`
2. `docs/INDEXATION.md`

Ces fichiers définissent le protocole d'indexation et la règle essentielle suivante : **le Répertoire des thèmes est dérivé de l'index et doit se renouveler à chaque nouvelle indexation**.

## PDF

Les PDF originaux seront conservés sans modification dans `pdfs/` (ou dans un stockage associé si leur taille rend GitHub inadapté). L'index doit toujours pointer vers le document original et vers les pages exactes.
