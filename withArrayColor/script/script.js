'use strict'
const wrapper = document.querySelector('.wrapper');
const slideArray = [{color : 'red'} , {color : 'blue'}, {color : 'green'}, {color : 'orange'}, {color : 'pink'}];
let count = 0;
//const visibleSlide= [];
const visible = { left: null, center : null , right: null};

/*let preventStyleSlide = `
    width: 100px;
    height: 80px;
    margin-left: 20px;
    transition: all 1s ease;
    position: absolute;
`;*/

function createSlide(count) {
    console.log(count);
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.setAttribute('style' , `border: 2px solid ${slideArray[count].color};`);
    return slide;
};

function renderNewSlide(direction , slide) {
    if (direction == 39) renderNewSlideLeft(slide);
    else if (direction == 37) renderNewSlideRight(slide);
}

function renderNewSlideLeft (slide) {
    slide.classList.add('left');
    //visibleSlide.push(slide);
    visible.left = slide;
    wrapper.prepend(slide);
};

function renderNewSlideRight(slide) {
    slide.classList.add('right');
    // visibleSlide.push(slide);
    visible.right = slide;
    wrapper.append(slide);
};

function moveSlide(direction , slide) {    
    if (direction == 39) moveSlideRight(slide);
    else if (direction == 37) moveSlideLeft(slide);
}

function moveSlideRight(slide) {
    if ( slide.classList.contains('left')) {
        slide.classList.remove('left');
        visible.center = slide;
        slide.classList.add('center');
    }
    else if ( slide.classList.contains('center')) {
        slide.classList.remove('center');
        visible.rigth = slide;
        slide.classList.add('right');
    }
    else if ( slide.classList.contains('right')) {
        slide.remove();
    }
}
function moveSlideLeft(slide) {
    if ( slide.classList.contains('right')) {
        slide.classList.remove('right');
        visible.centr = slide;
        slide.classList.add('center');
    }
    else if ( slide.classList.contains('center')) {
        slide.classList.remove('center');
        visible.left = slide;
        slide.classList.add('left');
    }
    else if ( slide.classList.contains('left')) {
        slide.remove();
    }
};


//wrapper.onclick = run;

document.addEventListener('keydown' , ()=>{

    let direction = event.keyCode;
    let a = createSlide(counter(direction));
    setTimeout(()=> renderNewSlide(direction , a), 1500);
    /*visibleSlide.forEach(item => {
        setTimeout(() => moveSlide(direction , item), 2500);});
    */
   for (let slide in visible) {
       if (visible[slide]) {
            setTimeout(() => moveSlide(direction , visible[slide]), 2500)
        }
   }
});
let value = null;
function counter(direction) {
    let max = slideArray.length-1;
    if (direction == 39) {
        if (value >= max) count = 0 ;
        value = count++;
        return value;
    } else if (direction == 37) {
        if (max - value < 0) value = 0;
        return max-value++;
    }
}