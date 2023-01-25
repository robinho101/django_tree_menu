import {ToClose, workWithMenu, serverPostRequests, add_menu, delete_menu_on_demand} from './menus.js';

function autoFieldsOpener(){
      window.addEventListener('DOMContentLoaded', (event) => {
      let fieldFromPath = decodeURI(location.pathname).split('/')[2];

      for(let i=0; i<document.querySelectorAll('.plus').length; i++) {
        document.querySelectorAll('.plus')[i].click();
        if(document.querySelectorAll('.plus')[i].dataset.field == fieldFromPath) {
            document.querySelectorAll(`[data-field="${fieldFromPath}"]`).forEach((elem)=>{
                elem.click();
                i++;
            });
            document.querySelectorAll('.plus')[i].click();
            break;
        }

      }

});

}

autoFieldsOpener();