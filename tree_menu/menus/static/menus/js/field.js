import {ToClose, workWithMenu, serverPostRequests, add_menu, delete_menu_on_demand} from './menus.js';

/* нужно развернуть всё над активным пунктом меню и первый уровень вложенности под. активный пункт опередяется по url
   текущей страницы */

function autoFieldsOpener(){
      window.addEventListener('DOMContentLoaded', (event) => {
      let fieldFromPath = decodeURI(location.pathname).split('/')[2]; /* получаем название активного пункта из адреса
                                                                         открытой страницы */

      for(let i=0; i<document.querySelectorAll('.plus').length; i++) {
        document.querySelectorAll('.plus')[i].click();                   /* открываем само меню и все вложенности до
                                                                            активного пункта  */


        if(document.querySelectorAll('.plus')[i].dataset.field == fieldFromPath) { /* когда true - мы дошли до активного
                                                                                      пункта */
            document.querySelectorAll(`[data-field="${fieldFromPath}"]`).forEach((elem)=>{
                elem.click();         /* открываем все вложеннистои активного пункта */
                i++;
            });
            document.querySelectorAll('.plus')[i].click(); /* открываем первую вложенность под активным пунктом и
                                                              завершаем цикл */
            break;
        }

      }

});

}

autoFieldsOpener();