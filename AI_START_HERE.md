# Wikignose — AI_START_HERE

Ce fichier est le point d'entrée obligatoire de toute conversation IA qui travaille sur Wikignose.

Il ne remplace pas la documentation existante. Son rôle est d'indiquer quoi lire, dans quel ordre, quelle source fait autorité et comment préparer une passation propre sans perdre l'état du projet.

## 1. Principe de vérité

Toujours vérifier l'état réel de `main` avant d'agir. Le code, les données effectivement présentes et les contrats documentés priment sur un souvenir de conversation.

Ne pas réécrire une règle durable dans ce fichier si elle possède déjà une source canonique : pointer vers cette source et la maintenir à jour.

## 2. Lecture obligatoire au démarrage

Lire dans cet ordre :

1. `README.md` — mission produit et architecture générale.
2. `AGENTS.md` — règles obligatoires pour toute conversation IA.
3. `docs/INDEXATION.md` — protocole canonique d'indexation d'un document.
4. `docs/ADMIN_INDEXATION.md` — séparation occurrences / pertinence thématique et workflow Admin.
5. Inspecter `data/index.js`, `app/`, `admin/`, puis les fichiers réellement concernés par la tâche.
6. Vérifier les issues, PR, commits récents et l'état réel de `main` lorsqu'ils sont pertinents.

Pour toute indexation importante, les trois documents `AGENTS.md`, `docs/INDEXATION.md` et `docs/ADMIN_INDEXATION.md` sont obligatoires.

## 3. Architecture conceptuelle à préserver

Wikignose sépare strictement :

- **indexation assistée par IA** : compréhension du PDF, structure, thèmes, métadonnées et enrichissement de l'index ;
- **consultation locale hors IA** : recherche dans les données déjà indexées.

Ne jamais introduire une dépendance à une IA distante pour les recherches ordinaires sans décision produit explicite.

Deux couches de recherche doivent rester distinctes :

- **occurrences** : présence textuelle réelle, pages et fréquence ;
- **pertinence thématique** : sens, thèmes explicites/implicites, synonymes et importance relative.

L'ajout d'un nouveau PDF ne justifie pas de recalculer les occurrences des anciens PDF. En revanche, il peut justifier une réévaluation comparative de la pertinence thématique globale.

## 4. Règles de fidélité documentaire

Toujours distinguer :

- ce qui est réellement présent dans le document ;
- ce qui est déduit par l'IA pour améliorer la recherche.

Ne jamais transformer une interprétation en citation ou en affirmation attribuée au PDF.

Ne jamais inventer une métadonnée manquante. Signaler l'incertitude lorsque le document ne permet pas de conclure.

Les PDF originaux restent intacts. Toute extraction future doit produire une nouvelle copie.

## 5. Répertoire des thèmes

Le Répertoire des thèmes est dérivé de l'index ; il n'est pas une liste manuelle parallèle.

Après toute indexation :

- vérifier que les nouveaux thèmes apparaissent automatiquement ;
- vérifier les filtres école / courant / maître ;
- vérifier les exclusions ;
- vérifier que les anciens thèmes et documents n'ont pas disparu ;
- ne pas afficher spontanément tout le répertoire sur l'écran principal.

## 6. Discipline de modification

Avant de modifier le projet :

- rechercher si le mécanisme existe déjà ;
- réutiliser et étendre plutôt que dupliquer ;
- ajouter plutôt que remplacer quand c'est raisonnable ;
- ne supprimer aucune donnée, fonctionnalité, champ ou contrat simplement parce qu'une nouvelle solution paraît plus élégante ;
- éviter les refactorings sans rapport avec la demande ;
- ne jamais exposer de token, clé API ou secret dans le frontend statique.

Une évolution importante doit être vérifiée au niveau de la vraie frontière qu'elle affecte : index, recherche, Admin, filtres, affichage ou extraction.

## 7. Indexation continue de la mémoire du projet

Une information importante ne doit pas rester uniquement dans une conversation.

Avant la fin d'un lot :

- règle durable → document canonique approprié ;
- changement de contrat → documentation + code/tests concernés ;
- travail restant → issue/roadmap si pertinent ;
- état temporaire ou reprise → document de continuité si nécessaire ;
- nouvelle structure documentaire → mettre à jour les références entre documents.

Éviter deux sources concurrentes présentées comme autoritaires.

## 8. Protocole obligatoire avant passation

Avant toute passation à une autre conversation ou un autre agent :

1. vérifier l'état réel de `main` et des changements non intégrés ;
2. vérifier que chaque nouveau PDF traité est bien présent dans l'index ;
3. vérifier que métadonnées, chapitres, pages, thèmes et aliases sont cohérents ;
4. vérifier que l'index d'occurrences des nouveaux ouvrages est présent sans recalcul inutile des anciens ;
5. vérifier si une réévaluation thématique globale était nécessaire et qu'elle a été faite ;
6. vérifier le Répertoire des thèmes, les filtres et les exclusions ;
7. documenter les décisions durables dans leur source canonique ;
8. enregistrer clairement ce qui est terminé, vérifié, ouvert, incertain et la prochaine action recommandée ;
9. signaler explicitement ce qu'il ne faut pas refaire ou casser.

Une passation n'est complète que si une nouvelle conversation peut reprendre le projet sans dépendre du souvenir de la conversation précédente.

## 9. Instruction courte pour une nouvelle conversation

Formulation recommandée :

> Consulte `AI_START_HERE.md`, puis suis toutes les sources qu'il désigne avant d'agir. Vérifie l'état réel de `main` et préserve les contrats d'indexation existants.
