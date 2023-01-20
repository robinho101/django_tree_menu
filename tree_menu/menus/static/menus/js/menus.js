class ToClose {

    constructor(plus_minus_selector, fields_block_selector) {
        this.plus_minus_selector = plus_minus_selector;
        this.fields_block_selector = fields_block_selector;
    }

    plus_minus_block() {
        document.querySelectorAll(this.plus_minus_selector).forEach((elem)=>{
        elem.parentNode.querySelector('.plus').style.display = 'block';
        elem.parentNode.querySelector('.minus').style.display = 'none';
        this.fields_block(this.fields_block_selector);
        });

    }

    fields_block(fields_block_selector) {
        document.querySelectorAll(fields_block_selector).forEach((elem)=>{
        elem.style.display = 'none';
        });
    }
}


let plus_minus = document.querySelectorAll('.plus_minus');
plus_minus.forEach((elem)=>{
    elem.addEventListener('click', (e)=>{
    e.preventDefault();
    let class_name = e.target.parentNode.parentNode.nextElementSibling.className;
    let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className.split(' ')[0];
        if(e.target.textContent == '+') {
            e.target.classList.add(`${to_display_none}to_close_all`);
            e.target.parentNode.querySelector('.plus').style.display = 'none';
            e.target.parentNode.querySelector('.minus').style.display = 'block';
            Array.from(document.getElementsByClassName(class_name)).forEach((elem)=>{
            elem.style.display = 'block';
            elem.classList.add(`${to_display_none}display_none_all`);
            });
            } else {
                if(e.target.parentNode.id == 'title_to_close') {
                    let to_close_inst = new ToClose(`.${to_display_none}to_close_all`, `
                    .${to_display_none}display_none_all`);
                    to_close_inst.plus_minus_block();
                } else if (e.target.parentNode.id == 'field_name_to_close') {
                      let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className.split(' ')[1];
                      let to_close_inst = new ToClose(`.field_name${to_display_none}`, `.${to_display_none}`);
                      to_close_inst.plus_minus_block();

                } else {
                      let to_display_none = e.target.parentNode.parentNode.nextElementSibling.className;
                      e.target.parentNode.querySelector('.plus').style.display = 'block';
                      e.target.parentNode.querySelector('.minus').style.display = 'none';
                      let to_close_inst = new ToClose();
                      to_close_inst.fields_block(`.${to_display_none.replace(/[\s]/g, '.')}`);
                }
        }
    });
});

