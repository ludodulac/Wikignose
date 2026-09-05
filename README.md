# Wikignose

Wikignose est un moteur de recherche documentaire statique pour un corpus de PDF analysés et indexés.

## Fonctionnement

Le dépôt est autonome : **aucun Supabase, aucune base distante et aucun back-office**.

1. Déposer les nouveaux PDF dans `pdfs/`.
2. Analyser les PDF et enrichir `data/wikignose-index.js` avec les chapitres, pages, thèmes, aliases, maîtres/courants et, lorsque disponible, l’index lexical.
3. La page `index.html` consulte uniquement cet index local.

La recherche ordinaire ne lance aucune IA distante. L’IA intervient seulement lors du travail d’analyse/indexation des PDF ajoutés au dépôt.

## Structure

- `index.html` — interface de recherche ;
- `css/wikignose.css` — présentation ;
- `js/wikignose.js` — moteur de recherche local ;
- `data/wikignose-index.js` — index documentaire ;
- `pdfs/` — PDF sources à analyser.

## Règles d’indexation

Ne jamais remplacer ou réécrire silencieusement les entrées déjà indexées lors de l’ajout d’un PDF. Un nouveau document s’ajoute au corpus. Le mode **Occurrences exactes** ne doit utiliser que du texte ou des termes lexicaux réellement extraits, jamais les résumés ou thèmes comme faux substitut.

Quand un PDF du dossier `pdfs/` est indexé, renseigner son champ `file` avec un chemin relatif comme `pdfs/nom-du-fichier.pdf` afin que le résultat puisse ouvrir directement la bonne page du document.
