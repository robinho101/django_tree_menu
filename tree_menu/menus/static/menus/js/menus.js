class ToClose {

    constructor(plus_minus_selector, fields_block_selector) {
        this.plus_minus_selector = plus_minus_selector;         // получаем блок элементов - плюс и минус
        this.fields_block_selector = fields_block_selector;     // получаем блок вложенностей для их закрытия
    }

    plus_minus_block() {                                        // скрываем минус, показываем плюс текущего блока
        document.querySelectorAll(this.plus_minus_selector).forEach((elem)=>{
        elem.parentNode.querySelector('.plus').style.display = 'block';
        elem.parentNode.querySelector('.minus').style.display = 'none';
        this.fields_block(this.fields_block_selector);
        });

    }

    fields_block(fields_block_selector) {                        // скрываем вложенности
        document.querySelectorAll(fields_block_selector).forEach((elem)=>{
        elem.style.display = 'none';
        });
    }
}


function workWithMenu(){    // взаимодействие с меню

let plus_minus = document.querySelectorAll('.plus_minus');
plus_minus.forEach((elem)=>{
    elem.addEventListener('click', (e)=>{   // обработчик на все блоки - плюсминус
    e.preventDefault();
    let class_name = e.target.parentNode.parentNode.nextElementSibling.className;   /* получаем строку классов
    слудующего,от нажатого блока с плюсом, элемента. у каждого уровня вложенности есть единые названия классов
    (field_name_wrapper, branch+name_wrapper, nest_name_wrapper) */
    let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className.split(' ')[0]; /* полуаем название
     класса, которое является общим для всех вложенностей текущего пунтка меню */
        if(e.target.textContent == '+') {
            e.target.classList.add(`${to_display_none}to_close_all`); /* при открытии(клик по плюсу) добавляем ему класс
                                                                        на случай закрытия(клик по минусу) */
            e.target.parentNode.querySelector('.plus').style.display = 'none';
            e.target.parentNode.querySelector('.minus').style.display = 'block';
            Array.from(document.getElementsByClassName(class_name)).forEach((elem)=>{
            elem.style.display = 'block';
            elem.classList.add(`${to_display_none}display_none_all`);  /* добавляем класс на случай закрытия для
                                                                          открывшихся вложенностей  */
            });
            } else { /* обработка клика по минусу */
                if(e.target.parentNode.dataset.titletoclose == 'title_to_close') { /* кликнув по минусу рядом с
                названием меню, закрываем все вложенности этого меню, и меням все минусы на плюсы, передав
                соответсвующие классы, которые добавили при открытии */
                    let to_close_inst = new ToClose(`.${to_display_none}to_close_all`, `
                    .${to_display_none}display_none_all`);
                    to_close_inst.plus_minus_block();
                } else if (e.target.parentNode.dataset.fieldtoclose == 'field_name_to_close') { /* тоже самое только
                для поля меню field_name_wrapper. закрываем всё начиная с поля меню по минусу которого кликнули */
                      let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className.split(' ')[1];
                      let to_close_inst = new ToClose(`.field_name${to_display_none}`, `.${to_display_none}`);
                      to_close_inst.plus_minus_block();

                } else {    /* когда кликнули по минусу рядом с branch_name_wrapper */
                      let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className;
                      e.target.parentNode.querySelector('.plus').style.display = 'block';
                      e.target.parentNode.querySelector('.minus').style.display = 'none';
                      let to_close_inst = new ToClose();
                      to_close_inst.fields_block(`.${to_display_none.replace(/[\s]/g, '.')}`);
                }
        }
    });
});
}

workWithMenu();

async function serverPostRequests(url, key, value) { /* просто отправляем данные на бекэнд (чтобы либо удалить меню со
                                                        страницы либа добавить) */

    let csrf_token = document.querySelector('.for_csrf')[name="csrfmiddlewaretoken"].value;

    let data = {
        'csrf_token':csrf_token,
    }
    data[key]=value;

    let fetchData = {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        'X-CSRFToken': csrf_token,
      }),
    };

    await fetch(url, fetchData).then(function(data){
        if(!data.ok) {
            throw Error(data.status);
        }
        location.reload();
    })
}


function add_menu(){    /* добавление меню по запросу */
document.querySelector('.add_menu_title').addEventListener('click', (e)=>{
    let menu_name = document.querySelector('.enter_the_menuname').value.toLowerCase();
    if(menu_name == ''){    /* поле для ввода пустое? - выходим */
        return;
    }
    let url = location.href;

    serverPostRequests(url, 'menu_name', menu_name);    /* передаём в функцию обработки запроса на бекэнд - 1)адрес,
    2) сторку, по которой в menus_tags.py определим что хотим добавить меню, 3) название меню. [осуществляется без
    взаимодействия с бд, работаем с django FileBasedCache] */

})
}

add_menu()


function delete_menu_on_demand(){   /* тоже самое только для удаления меню со страницы */
    document.querySelectorAll('.delete_menu').forEach((elem)=>{
        elem.addEventListener('click', (e)=>{
        let menu_name_to_delete = e.target.previousElementSibling.outerText.toLowerCase();
        let url = location.href;

        serverPostRequests(url, 'menu_name_to_delete', menu_name_to_delete);
    });
    });
}

delete_menu_on_demand()

export {ToClose, workWithMenu, serverPostRequests, add_menu, delete_menu_on_demand};