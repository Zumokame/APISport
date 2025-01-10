# Créer un site qui recupere des informations sur les terrains de sport dans une commune donnée.

## user story
En tant que: Utilisateur du site Je veux: rechercher des informations sur les terrains de sport disponibles dans une commune donnée Afin de: planifier mes activités sportives et choisir le terrain approprié.
Recherche par commune:

L'utilisateur doit pouvoir entrer le nom d'une commune dans un champ de recherche.

Une fois la commune saisie, une liste des terrains de sport disponibles dans cette commune doit s'afficher.

Informations sur les terrains de sport:

Chaque terrain de sport listé doit afficher des informations telles que:

Nom du terrain

Adresse

Types de sports possibles (ex: football, tennis, basketball)

Horaires d'ouverture

Disponibilité (réservé, libre, etc.)

Filtrage et tri des résultats:

L'utilisateur doit pouvoir filtrer les résultats par type de sport.

L'utilisateur doit pouvoir trier les résultats par distance, popularité, ou disponibilité.

Interface utilisateur:

L'interface doit être simple et intuitive.

Le site doit être accessible sur différents appareils (ordinateur, tablette, smartphone).

Carte interactive:

Afficher une carte interactive avec les terrains de sport localisés.

L'utilisateur doit pouvoir cliquer sur un terrain sur la carte pour voir plus de détails.

Évaluations et commentaires:

L'utilisateur doit pouvoir lire les évaluations et les commentaires laissés par d'autres utilisateurs.

L'utilisateur doit pouvoir laisser sa propre évaluation et ses commentaires après avoir utilisé un terrain de sport.

| Fonctionnalités                              | Description                                                                                                                                 | Priorité   |
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------|
| Recherche par commune                        | Permettre à l'utilisateur de rechercher des terrains de sport disponibles en saisissant le nom de la commune.                                | Haute      |
| Informations sur les terrains de sport       | Afficher des détails tels que le nom, l'adresse, les types de sports possibles, les horaires d'ouverture et la disponibilité de chaque terrain. | Haute      |
| Filtrage par type de sport                   | Permettre à l'utilisateur de filtrer les terrains de sport affichés en fonction du type de sport qui l'intéresse (ex: football, tennis).      | Moyenne    |
| Tri par distance, popularité ou disponibilité| Permettre à l'utilisateur de trier les terrains de sport selon la distance, la popularité ou la disponibilité.                                | Moyenne    |
| Interface utilisateur simple et intuitive    | Offrir une interface claire, facile à naviguer et accessible depuis différents appareils (ordinateur, tablette, smartphone).                  | Haute      |
| Carte interactive des terrains               | Afficher les terrains de sport localisés sur une carte interactive et permettre à l'utilisateur de cliquer pour obtenir plus d'informations.  | Moyenne    |
| Évaluations et commentaires                  | Permettre à l'utilisateur de consulter les avis et commentaires laissés par d'autres utilisateurs et de laisser ses propres avis.             | Basse      |




## Créer une fonction pour appeler "fetch" qui va recuperer un tableau de données en filtrant le sport désiré pour une commune.
```javascript
async function fetchGrounds(cp,sport){
    const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%22${cp}%22&limit=2`)
    // const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%22${cp}%22&limit=2`)
// console.log("📄 ~ response:", response)
const datas= await response.json()
console.log("📄 ~ affichage:", datas)
}
```

## créer une fonction qui va recuperer le template d'un terrain et inserer les données

## boucler sur le tableau de données pour créer une tuile par terrain
