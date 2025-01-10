export const groundTemplateClone=""
export const utils={
        // const ef = fedf
    
    submitForm : async function(){

        const form = document.querySelector("#filter")
        
       form.addEventListener("submit",(event)=>{
        //utils.createArguments(utils.fetchGrounds(tableau))
        event.preventDefault()

        
        const cp = form.cp.value
        const sport = form.sport.value
        const tableau = [cp, sport]

        console.log("appel de createArguments ")
        utils.createArguments(tableau)
       
       

       })
        
    },
    createArguments:function(tableau) {
        let arg = "";
        for (let i = 0; i < tableau.length; i++) {
            if (i > 0) {
                arg += "%20and%20";
            }
            arg += `%22${tableau[i]}%22`;
            //console.log("📄 ~ arg:", arg);
        }
        console.log("appel de fetchGrounds ")
        utils.fetchGrounds(arg)
        
    },

    
    
    fetchGrounds:async function(cp){
        
        
        //const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%22${cp}%22&limit=3`)
        //const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%2263600%22%20and%20%22foot%22&limit=20`)
    
        const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=${cp}&limit=20`)
    
    const datas= await response.json()
    //console.log("📄 ~ fetchGrounds ~ datas:", datas)
    console.log("appel de loop ")
        utils.loop(datas)
    },

    loop:function(datas){
       //document.querySelector('.container').remove()
       const containerPlace=document.querySelector('.container')
        
    
    //    subElement.remove()

        for(const data of datas.results){
            console.log("📄 ~ data:", data)
            console.log("appel de addGroundToHtml")
            utils.addGroundToHtml(data,containerPlace)
        }
        
    },

    addGroundToHtml:function(data,containerPlace){
        //console.log("📄 ~ addGroundToHtml ~ data:", data)
        //console.log("📄 ~ addGroundToHtml ~ containerPlace:", containerPlace)
        //const containerPlace=document.querySelector('.container')
       
        const groundTemplate = document.getElementById("template-ground");
      
        const groundTemplateClone = groundTemplate.content.cloneNode(true);
        
        const title=groundTemplateClone.querySelector(".title.is-4")
        
        const ground=groundTemplateClone.querySelector("#description")
        //console.log("📄 ~ ground:", ground)
        ground.textContent=data.equip_type_name
    
        title.textContent=data.equip_nom
        //console.log("📄 ~ addGroundToHtml ~ title:", title)
        
        containerPlace.appendChild(groundTemplateClone);
    }
} 

// 

export const init = {

    submitForm: async function() {
        const form = document.querySelector("#filter");
        const cp = form.cp.value;
        const sport = form.sport.value;
    
        console.log("Valeurs du formulaire :", { cp, sport }); // Vérifiez les valeurs ici
    
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("appel de createArguments ");
            init.createArguments([cp, sport]);
        });
    },
    
    fetchGrounds: async function(cp) {
        const response = await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=${cp}&limit=20`);
        const datas = await response.json();
        
        console.log("Données brutes de l'API :", datas); // Vérifiez ce qui est reçu ici
        
        if (!datas.results || datas.results.length === 0) {
            console.warn("Aucune donnée reçue ou résultats vides.");
            return; // Arrêtez ici si aucune donnée n'est disponible
        }
        
        console.log("appel de loop ");
       init.loop(datas);
    },
    createArguments: function(tableau) {
        let arg = "";
    
        // Filtrer les arguments non vides
        const filteredArgs = tableau.filter(item => item.trim() !== "");
    
        // Construire la chaîne de requête
        for (let i = 0; i < filteredArgs.length; i++) {
            if (i > 0) {
                arg += "%20and%20"; // Ajouter "AND" entre les arguments
            }
            arg += `%22${filteredArgs[i]}%22`; // Entourer chaque argument de guillemets doubles
        }
    
        if (arg === "") {
            console.warn("Aucun argument valide fourni.");
            return; // Ne pas appeler fetchGrounds si aucun argument n'est valide
        }
    
        console.log("Chaîne d'arguments générée :", arg);
        init.fetchGrounds(arg); // Appeler fetchGrounds avec la chaîne générée
    },
    
    loop: function(datas) {
        const containerPlace = document.querySelector('.container');
        
        // Supprime toutes les cartes existantes
        containerPlace.innerHTML = ""; 
        
        if (!datas.results || datas.results.length === 0) {
            containerPlace.innerHTML = "<p>Aucun résultat trouvé.</p>"; // Message pour indiquer qu'il n'y a pas de données
            return;
        }
    
        for (const data of datas.results) {
            console.log("appel de addGroundToHtml");
            init.addGroundToHtml(data, containerPlace);
        }
    },

    
    addGroundToHtml: function(data, containerPlace) {
    const groundTemplate = document.getElementById("template-ground");
    
    if (!groundTemplate) {
        console.error("Template non trouvé : #template-ground");
        return;
    }

    const groundTemplateClone = groundTemplate.content.cloneNode(true);
    
    const title = groundTemplateClone.querySelector(".title.is-4");
    const description = groundTemplateClone.querySelector("#description");

    if (title && description) {
        title.textContent = data.equip_nom || "Nom indisponible";
        description.textContent = data.equip_type_name || "Description indisponible";
        
        containerPlace.appendChild(groundTemplateClone);
    } else {
        console.error("Éléments du template manquants.");
    }
}

    
}

