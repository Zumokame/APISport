export const modal={
    modalAlertOpen : function(contentMessage){
        //griser le fond
        const backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop');
        document.body.appendChild(backdrop);

        const modalAlert=document.querySelector('#modal-alert')
        modalAlert.querySelector('.modal-card-body p').textContent=contentMessage
        modalAlert.showModal()
        const closeButton = modalAlert.querySelector(".button.close");
        closeButton.addEventListener("click", () => {
            modal.modalClose(modalAlert)
         });
    },
    modalClose :function(modalElement){
        const backdrop = document.querySelector('.modal-backdrop');
        modalElement.close();
        document.body.removeChild(backdrop);
        
    },
    openDetailModal: function(modalElement, data) {
        // Remplir la modal avec les données
        const backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop');
        backdrop.addEventListener('click',()=>modal.modalClose(modalElement))
        document.body.appendChild(backdrop);
        
        const modalTitle = modalElement.querySelector('.modal-card-title');
        const modalBody = modalElement.querySelector('.modal-card-body');
        const closeButton = modalElement.querySelector("#modal-detail .button.close");
        console.log("📄 ~ closeButton:", closeButton)
        console.log("📄 ~ data.coordonnees.lon:", data.coordonnees.lon)
        console.log("📄 ~ data.coordonnees.lat:", data.coordonnees.lat)
        
            modalTitle.textContent = data.equip_nom;
            modalBody.innerHTML = `
                <p><strong>Type:</strong> ${data.equip_type_name}</p>
                <p><strong>Description:</strong> ${data.inst_nom || 'Non disponible'}</p>
                <iframe id="iframeMap" src="https://cartes.app/#20/${data.coordonnees.lat}/${data.coordonnees.lon}/0/70" style=" width: 100%; height: 100%; margin: 2rem 1rem; margin-bottom: 0; display: block; border-radius: 1rem; border: 3px solid var(--darkColor); box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px; " ></iframe>
                <p><strong>Adresse:</strong> ${data.inst_adresse || 'Non disponible'}</p>
                <p><strong>cp ville:</strong> ${data.inst_cp || 'Non disponible'}  ${data.inst_com_nom || 'Non disponible'}</p>
            `;

        closeButton.addEventListener("click", () => {
            this.modalClose(modalElement)
         });
    
        // Ouvrir la modal
        modalElement.showModal();
    },
}