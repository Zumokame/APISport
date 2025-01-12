import {modal} from "./modal.js"
import {api} from "./api.js"

export const utils={
    
    submitForm : async function(){

        const form = document.querySelector("#filter")


       form.addEventListener("submit",async(event)=>{
        
        event.preventDefault()
        console.log('click')
        const cp = form.cp.value;
        const sport = form.sport.value;
        
        

        if (cp && sport) {
            // Vérifie si 'cp' est un nombre
            console.log("❓", cp,sport)
            

            if (!isNaN(cp)) {
                const tableau = [cp, sport];
                console.log("✌️ ~ form.addEventListener ~ tableau:", tableau)
                try {
                    utils.createArguments(tableau);
                    console.log("Arguments créés avec succès");
                } catch (error) {
                    
                    console.error("Erreur lors de la création des arguments :", error);
                    modal.modalAlertOpen("Une erreur est survenue lors du traitement. Veuillez réessayer.");
                }
            } else {
            const message="Veuillez remplir tous les champs requis."
            console.log("👍 ~ form.addEventListener ~ message:", message)
            modal.modalAlertOpen(message);
            }
        
            }else{
                const message="Veuillez remplir tous les champs requis."
                console.log("📄 ~ form.addEventListener ~ message:", message)
                modal.modalAlertOpen(message);
            }
        })
            
    },
    
    createArguments:function(tableau) {
        let arg = "";
        for (let i = 0; i < tableau.length; i++) {
            if (i > 0) {
                arg += "%20and%20";
            }
            arg += `%22${tableau[i]}%22`;
        }
        utils.fetchGrounds(arg)
    },


    fetchGrounds:async function(cp){

        const response =await api.getResults(cp)

    const datas= await response.json()
    console.log("📄 ~ fetchGrounds ~ datas:", datas)
    console.log("📄 ~ fetchGrounds ~ datas:", datas.results[0].coordonnees.lon)
    console.log("📄 ~ fetchGrounds ~ datas:", datas.results[0].coordonnees.lat)

        utils.loop(datas)
    },

    loop:function(datas){
       const containerPlace=document.querySelector('.container')

       containerPlace.innerHTML="";

        for(const data of datas.results){
            utils.addGroundToHtml(data,containerPlace)
        }
    },

    addGroundToHtml: function(data, containerPlace) {
        // Cloner le template
        const groundTemplate = document.getElementById("template-ground");
        const groundTemplateClone = groundTemplate.content.cloneNode(true);
        
        // Sélectionner les éléments dans le clone
        const title = groundTemplateClone.querySelector(".title.is-4");
        const ground = groundTemplateClone.querySelector("#description");
        const detailModalButton = groundTemplateClone.querySelector(".button.is-primary.modal-button");
        
        // Remplir les données
        ground.textContent = data.equip_type_name;
        title.textContent = data.equip_nom;
    
        // Ajouter l'écouteur d'événements pour ouvrir la modal
        detailModalButton.addEventListener('click', (e) => {
            e.preventDefault(); // Empêcher le comportement par défaut du bouton
            const modalDetail = document.querySelector('#modal-detail');
            if (modalDetail) {
                modal.openDetailModal(modalDetail, data);
            } else {
                console.error("Modal de détail non trouvée");
            }
        });
    
        // Ajouter le clone au conteneur
        containerPlace.appendChild(groundTemplateClone);
    },

    
        
}


