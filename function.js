export const groundTemplateClone=""
export const utils={
        // const ef = fedf
    
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
            //console.log("📄 ~ arg:", arg);
        }
        utils.fetchGrounds(arg)
        
    },

    
    
    fetchGrounds:async function(cp){
        
        
        //const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%22${cp}%22&limit=3`)
        //const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=%2263600%22%20and%20%22foot%22&limit=20`)
    
        const response =  await fetch(`https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=${cp}&limit=20`)
    
    const datas= await response.json()
    //console.log("📄 ~ fetchGrounds ~ datas:", datas)
        utils.loop(datas)
    },

    loop:function(datas){
       //document.querySelector('.container').remove()
       const containerPlace=document.querySelector('.container')
       containerPlace.innerHTML="";
        
    
    //    subElement.remove()

        for(const data of datas.results){
            //console.log("📄 ~ data:", data)
            //console.log("appel de addGroundToHtml")
            utils.addGroundToHtml(data,containerPlace)
        }
        
    },

    addGroundToHtml:function(data,containerPlace){
        
        //console.log("📄 ~ addGroundToHtml ~ containerPlace:", containerPlace)
        //const containerPlace=document.querySelector('.container')
       
        const groundTemplate = document.getElementById("template-ground");
      
        const groundTemplateClone = groundTemplate.content.cloneNode(true);
        
        const title=groundTemplateClone.querySelector(".title.is-4")
        
        const ground=groundTemplateClone.querySelector("#description")
        //console.log("📄 ~ ground:", ground)
        ground.textContent=data.equip_type_name
    
        title.textContent=data.equip_nom

        containerPlace.appendChild(groundTemplateClone);
    }
        
} 
