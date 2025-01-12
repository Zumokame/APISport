//* https://www.data.gouv.fr/fr/dataservices/api-data-es/
console.log('Hello JS')
import { utils} from "./function.js"


async function init() {
    try {

    utils.submitForm()
  
    } catch (e) {
      console.error(e.message);
      console.error(e);
    }
  }
  
  document.addEventListener("DOMContentLoaded", init);




// //* Acceder a une données à l'interieur d'un objet
// //console.log("📄 ~ data:", data)
// console.log("📄 ~ data:", data.results[0].equip_nom)

//submitForm
//createArguments
//fetchGrounds
//loop
//addGroundToHtml






