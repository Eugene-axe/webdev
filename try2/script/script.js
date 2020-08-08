'use strict'

const LEFT = 37;
const RIGHT = 39;
const imageArray = [{color: 'red'} , {color: 'green'} , {color : 'blue'}, {color: 'pink'}, {color : 'yellow'}],
    wrapper = document.querySelector('.wrapper');

/**************** Зона ебучих костылей************/
function countTrash(elem){ // опредделяет номер последнего удаленного слайда
    let count = null;
    imageArray.forEach( (item , index) => {
        if (elem.color  == item.color) count = index;
    });
    elem.color = null;
    return count;
};

let count = 0;
let currentSlides = null;
let trashRight = {color : imageArray[imageArray.length-1].color}, // последний удаленный слайд справа
    trashLeft = {color: imageArray[0].color}; // слева, + параметры начальной установки


function counter(direction){  //определяет номер следующего слайда и с какой стороны
    let max = imageArray.length;
    if (direction == RIGHT) {
        if (trashLeft.color) {
            count = countTrash(trashLeft);
            return count++;
        }
        if (count >= max) count = 0;
        return count++;
    } else if (direction == LEFT) {
        if (trashRight.color) {
            count = countTrash(trashRight);
            return count;
        }
        count--;
        if (count < 0 ) count = max-1;
        return count;
    }
}
/********Конец зоны ************/





function addNewSlide(direction){  
    let slide = null;
    if (direction == 39 ) {
        slide = createSlide(counter(direction));
        slide.classList.add('left');
    } else if (direction == 37 ) {
        slide = createSlide(counter(direction));
        slide.classList.add('right');
    }
    return slide;
};

function createSlide(param) { //создаем див слайда с параметром( внутренность слайда может быть картинкой)
    console.log(param)
    const div = document.createElement('div');
    div.classList.add('slide');
    div.setAttribute('style' , `border-color:${imageArray[param].color}`);
    return div;
};

function renderSlide(slide){ 
    wrapper.append(slide);
};

/*  ------- Отсюда начинаем пляски ----------  */
document.addEventListener('keydown', () => {

    currentSlides = document.querySelectorAll('.slide');

    let direction = event.keyCode;

    let slide = addNewSlide(direction);

    moveVisibleSlide(direction , currentSlides);
    renderSlide(slide);
}); 


/* Перемещение слайдов */

function moveVisibleSlide(direction, slides){
    for (let slide of slides) {
            move(direction, slide);        
    }
}

function move(direction, slide){

    if (direction == 39) {
        moveRight(slide);        
    } else if (direction == 37) {
        moveLeft(slide);
    }
}

function moveRight(slide){
    if ( slide.classList.contains('right') ) {
        trashRight.color = slide.getAttribute('style').split(':')[1];
        console.log(trashRight);
        slide.remove();
    } else if ( slide.classList.contains('center') ) {
        slide.classList.remove('center');
        slide.classList.add('right');
    } else if ( slide.classList.contains('left') ) {
        slide.classList.remove('left');
        slide.classList.add('center');
    }
};

function moveLeft(slide){
    if ( slide.classList.contains('left') ) {
        trashLeft.color = slide.getAttribute('style').split(':')[1];
        slide.remove();
        console.log(trashLeft);
    } else if ( slide.classList.contains('center') ) {
        slide.classList.remove('center');
        slide.classList.add('left');
    } else if ( slide.classList.contains('right') ) {
        slide.classList.remove('right');
        slide.classList.add('center');
    }
}


