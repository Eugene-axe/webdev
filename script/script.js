const wrapper = document.querySelector('.wrapper');
const slideArray = ['red' , 'blue', 'green', 'orange'];
let count = 0;

let preventStyleSlide = `
    width: 100px;
    height: 80px;
    border: 2px solid red;
    margin-left: 20px;
    transition: all 1s ease;
    position: absolute;
`;

function createSlide() {
    const slide = document.createElement('div');
    slide.setAttribute('style' , preventStyleSlide);
    return slide;
};

function renderNewSlide(slide) {
    wrapper.prepend(slide);
};

function moveSlideRightStep1(slide) {
    let style = slide.getAttribute('style');
    style += `background-color  :yellow;
    transform: matrix(2,0,0,2,300,0);`;
    slide.setAttribute('style' , style);
}

function run() {
    let slide1 = createSlide();
    setTimeout( ()=> renderNewSlide(slide1) , 1500);
    setTimeout(() => moveSlideRightStep1(slide1) , 1500);
}
