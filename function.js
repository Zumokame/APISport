export const groundTemplateClone=""
export const utils={
    
    submitForm : async function(){

        const form = document.querySelector("#filter")

       form.addEventListener("submit",(event)=>{

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
        }
        utils.fetchGrounds(arg)

    },


    fetchGrounds:async function(cp){
    
        const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=${cp}&limit=20`)
    
    const datas= await response.json()
    //console.log("📄 ~ fetchGrounds ~ datas:", datas)
        utils.loop(datas)
    },

    loop:function(datas){
       const containerPlace=document.querySelector('.container')
       containerPlace.innerHTML="";
        


        for(const data of datas.results){
            utils.addGroundToHtml(data,containerPlace)
        }
        
    },

    addGroundToHtml:function(data,containerPlace){
        
        const groundTemplate = document.getElementById("template-ground");
      
        const groundTemplateClone = groundTemplate.content.cloneNode(true);
        
        const title=groundTemplateClone.querySelector(".title.is-4")
        
        const ground=groundTemplateClone.querySelector("#description")
        ground.textContent=data.equip_type_name
    
        title.textContent=data.equip_nom

        containerPlace.appendChild(groundTemplateClone);
    }
        
} 
