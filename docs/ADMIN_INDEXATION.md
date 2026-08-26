# Administration et stratégie d’indexation Wikignose

Ce document doit être lu par toute conversation IA chargée d’ajouter un nouvel ouvrage ou de recalculer la pertinence thématique.

## Deux index séparés

Wikignose possède deux couches qui ne doivent jamais être confondues.

### 1. Index d’occurrences

L’index d’occurrences est **mécanique et documentaire**. Il répond à la question : « où ce mot ou cette expression apparaît-il réellement ? »

Pour chaque PDF, il doit idéalement conserver le texte par page ou un index lexical équivalent, afin de retrouver :

- un mot exact ;
- un groupe de mots / une expression ;
- les pages concernées ;
- le nombre d’occurrences ;
- le chapitre ou la section dans lequel elles apparaissent.

Une fois correctement généré pour un ouvrage, cet index n’a pas besoin d’être recalculé simplement parce que de nouveaux ouvrages sont ajoutés. Le nouveau PDF reçoit son propre index d’occurrences, puis les résultats sont réunis au moment de la recherche.

### 2. Index de pertinence thématique

L’index thématique est **interprétatif et comparatif**. Il répond à la question : « quels passages et quels ouvrages sont les plus importants pour ce thème, même si les mots exacts diffèrent ? »

Pour chaque section, conserver :

- thèmes principaux ;
- sous-thèmes ;
- synonymes et formulations proches ;
- résumé factuel ;
- score/niveau d’importance du thème dans la section ;
- pages ;
- maître, courant, école et collection.

Contrairement aux occurrences, la pertinence peut devoir être **réévaluée à l’échelle de toute la bibliothèque** lorsqu’un ou plusieurs nouveaux ouvrages sont ajoutés. Un nouveau livre très centré sur un thème peut passer devant un ancien résultat jusque-là classé premier.

## Workflow lorsqu’un nouveau PDF arrive

1. Vérifier qu’il n’a pas déjà été indexé (nom + empreinte SHA-256 si disponible).
2. Ajouter le PDF à la bibliothèque quand le mode d’hébergement le permet.
3. Construire son index d’occurrences sans recalculer inutilement les anciens ouvrages.
4. Détecter chapitres, sous-chapitres et pages.
5. Produire ses thèmes, synonymes et niveaux d’importance.
6. Ajouter ces données dans l’index du site.
7. Décider si l’arrivée de ce document justifie une **réindexation thématique globale**.
8. Si oui, comparer les résultats thématiques anciens et nouveaux et ajuster leur importance relative ; ne pas réécrire l’index lexical des ouvrages déjà terminés.
9. Vérifier le Répertoire des thèmes, les filtres maître/courant, les exclusions et les deux modes de recherche.

## Espace Admin du site

`app/admin.html` est une interface de préparation. Elle permet de sélectionner un PDF et de préparer une fiche avec titre, école, cours, courant, maîtres/auteurs et empreinte du fichier.

Important : GitHub Pages est un site statique. Le navigateur public ne doit pas contenir de jeton GitHub ni de secret permettant d’écrire directement dans le dépôt. La fiche Admin prépare donc le travail ; l’intégration réelle au dépôt et l’analyse IA se font ensuite dans une conversation autorisée reliée à Wikignose.

La file Admin est actuellement stockée localement dans le navigateur (`localStorage`). Elle n’est pas une preuve que le PDF a été envoyé au dépôt.

## Formulation recommandée dans une nouvelle conversation

Lorsqu’un PDF a été ajouté, demander :

> Indexe ce nouvel ouvrage dans Wikignose. Conserve les index d’occurrences déjà calculés pour les anciens ouvrages. Indexe les occurrences du nouveau PDF, enrichis ses thèmes, puis réévalue la pertinence thématique de toute la bibliothèque si l’arrivée de ce volume modifie le classement des thèmes.

## Règle de classement

La pertinence thématique doit distinguer au minimum :

- thème central du chapitre ;
- thème majeur ;
- thème secondaire ;
- simple mention.

Le classement final doit être comparatif entre tous les ouvrages disponibles, tandis que la recherche d’occurrences reste fondée sur la présence effective du mot ou de l’expression.
