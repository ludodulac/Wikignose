# Instructions pour toute conversation IA travaillant sur Wikignose

Ce fichier doit être lu avant d'indexer un nouveau document ou de modifier la structure du projet.

## Mission

Wikignose sépare strictement deux étapes :

1. **Indexation assistée par IA** : lecture approfondie des nouveaux PDF, construction de la couche thématique et mise à jour de l’index structuré.
2. **Consultation hors IA** : recherche locale dans les index par l'application Wikignose.

L'application ne doit pas dépendre d'un service d'IA pour répondre aux recherches ordinaires.

## Deux couches de recherche obligatoires

### Occurrences

La recherche par occurrences est documentaire et mécanique : mot exact ou groupe de mots réellement présent dans le texte, pages, fréquence et chapitre.

Une fois l’index d’occurrences d’un ouvrage calculé correctement, **ne pas le recalculer simplement parce que de nouveaux PDF ont été ajoutés**. Il suffit d’indexer lexicalement les nouveaux ouvrages.

### Pertinence thématique

La recherche par pertinence est sémantique : thèmes explicites et implicites, synonymes, importance d’un thème dans un passage et classement relatif entre ouvrages.

Lorsqu’un nouveau volume arrive, sa présence peut modifier le classement global. Une conversation IA peut donc devoir **réévaluer la pertinence thématique de toute la bibliothèque**, y compris les anciens résultats, sans refaire leur index lexical.

Lire impérativement `docs/ADMIN_INDEXATION.md` pour cette distinction et le workflow complet.

## Règle fondamentale du Répertoire des thèmes

Le bouton/onglet **Répertoire des thèmes** doit rester discret et ne doit pas afficher spontanément toute la liste des thèmes sur l'écran principal. La liste complète n'apparaît qu'après un clic volontaire.

Le répertoire n'est **jamais une liste figée écrite à la main**. Il est calculé à partir de tous les thèmes présents dans `data/index.js`.

Donc, à chaque fois qu'un nouveau PDF est indexé :

- ajouter le document et ses sections à `data/index.js` ;
- ajouter aux sections tous les thèmes pertinents, y compris les thèmes implicites utiles à la recherche ;
- ajouter des synonymes/expressions proches lorsque cela améliore la recherche ;
- ne pas dupliquer artificiellement un thème avec de simples variantes typographiques ;
- vérifier que le Répertoire des thèmes affiche automatiquement les nouveaux thèmes après l'indexation.

## Espace Admin

Le lien **Admin** du site mène à `app/admin.html`.

Cet écran sert à préparer un nouvel ouvrage pour indexation (PDF, titre, école, cours, courant, maîtres/auteurs, empreinte SHA-256 et fiche JSON).

Comme GitHub Pages est statique, **ne jamais mettre un token GitHub, une clé API ou un secret dans le frontend public**. La file Admin locale n’écrit pas directement dans le dépôt : l’intégration réelle est faite ensuite par une conversation autorisée reliée à GitHub.

## Fidélité documentaire

Toujours distinguer :

- les informations réellement présentes dans le PDF ;
- les mots-clés/thèmes déduits par l'IA pour faciliter la recherche.

Ne jamais transformer une interprétation de l'IA en citation ou en affirmation attribuée au document.

Chaque résultat indexé doit conserver au minimum :

- identifiant du document ;
- titre ;
- collection/école ;
- courant ;
- maître(s) ou auteur(s) concernés quand ils sont identifiables ;
- chapitre ou section ;
- page de début et page de fin ;
- résumé factuel bref ;
- thèmes ;
- synonymes ou expressions associées ;
- niveau d'importance du passage pour chacun des thèmes principaux lorsque pertinent.

Pour la couche d’occurrences, conserver aussi, dès que possible, le texte par page ou une structure lexicale équivalente permettant les recherches exactes.

## Recherche

Le classement thématique doit favoriser :

1. un chapitre entièrement consacré au thème ;
2. un passage où le thème est central ;
3. un passage où le thème est secondaire ;
4. une simple mention.

Les exclusions saisies par l'utilisateur doivent supprimer les résultats contenant les mots/noms exclus dans leurs métadonnées de recherche.

Le mode **Occurrences de mots / termes** ne doit pas être confondu avec la pertinence : il doit retrouver une présence textuelle réelle et son nombre d’occurrences quand l’index lexical complet est disponible.

## Extraction de chapitres

Les PDF originaux doivent rester intacts. Une future fonction d'extraction créera une nouvelle copie contenant uniquement les pages correspondant aux chapitres sélectionnés.

## Avant de terminer une indexation

Vérifier systématiquement :

- que le nouveau document est présent dans l'index ;
- que ses pages et chapitres sont correctement délimités ;
- que son index d’occurrences est ajouté sans recalcul inutile des anciens ouvrages ;
- que la pertinence thématique globale a été réévaluée si le nouveau volume peut modifier le classement ;
- que les nouveaux thèmes apparaissent dans le Répertoire des thèmes ;
- que les filtres de maître/courant sont renseignés ;
- que les termes d'exclusion fonctionnent ;
- que les anciens documents et thèmes n'ont pas disparu.

Lire également `docs/INDEXATION.md` et `docs/ADMIN_INDEXATION.md` avant toute indexation importante.
