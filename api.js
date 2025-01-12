export const api={
    getCodePostal:async function(data) {
        //? https://geo.api.gouv.fr/communes?codePostal=63600&fields=codesPostaux,nom
        //? https://geo.api.gouv.fr/communes?nom=ambert&fields=code,nom
        //? <iframe src="https://cartes.app/?allez=Little+Beetles|n5352517991|-1.6826|48.1118" style=" width: 20rem; height: 36rem; margin: 0 auto; margin-bottom: 5vh; display: block; border-radius: 1rem; border: 3px solid var(--darkColor); box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px; " ></iframe>
        //? https://cartes.app/#18/46.857/2.025
        //? https://cartes.app/#20/45.5490931/3.7447847/0/70
        //? https://cartes.app/#20/${lat}/${lon}/0/70

    },
    getResults:async function(cp) {
        return await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=${cp}&limit=5`)
    },
    getMap:async function(lat,lon) {
        return `<iframe src="https://cartes.app/#20/${lat}/${lon}/0/70" style=" width: 100%; height: 100%; margin: 0 auto; margin-bottom: 0; display: block; border-radius: 1rem; border: 3px solid var(--darkColor); box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px; " ></iframe>`
    }


}