const container = document.querySelector('.container');
let containerWidth = parseFloat(getComputedStyle(container).width);

let currentDim = 16;

let freshGrid = true

let divs = [];

const randomColorsBtn = document.querySelector('.btnrandomcolor');
randomColorsBtn.addEventListener('click', () => {changeHoverTo(hoverRandomColor)});

const defaultColorBtn = document.querySelector('.btndefaultcolor');
defaultColorBtn.addEventListener('click', () => {changeHoverTo(hoverDefault)});


const colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('input', () => changeHoverTo(hoverPickColor));


const changeDimBtn = document.querySelector('.btnChangeDim');
changeDimBtn.addEventListener('click', () => changeDim('enter the dimension (100 max):'));


const eraseBtn = document.querySelector('.btnErase');
eraseBtn.addEventListener('click', () => {
    if(freshGrid) return;

    eraseCurrentGrid();
    createGrid(currentDim);
})


function changeDim(message){
    let newDim = Math.floor(Number(prompt(message)));
    if(typeof newDim === 'number' && newDim > 0 && newDim <= 100){
        eraseCurrentGrid();
        createGrid(newDim);
    }
    else{changeDim(message='Invalide input! try again, the dimension should be a positive integer less than 100:')}
}


function eraseCurrentGrid(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}


function createGrid(dimension){
    if(typeof dimension !== 'number' || dimension <= 0 || dimension >100) return 'ERROR';
    
    containerWidth = parseFloat(getComputedStyle(container).width);
    let gap = 1;
    if(dimension < 50) gap = 2;
    if(dimension < 30) gap = 3;

    container.style.gap = `${gap}px`;

    let totalGap = (dimension - 1) * gap; //there are dimension - 1 gaps each is gap wide
    let unitSize = (containerWidth - totalGap) / dimension;

    divs = new Array(dimension * dimension);
    for (let i=0; i<dimension; i++) {  // create 16 rows
        let row = document.createElement('div');
        row.classList.add('row');
        row.style.gap = `${gap}px`;

        
        // fill every row with 16 divs
        for(let j=0; j<dimension; j++){
            let div = document.createElement('div');
            div.classList.add('unit');
            div.style.width = `${unitSize}px`;
            div.style.height = `${unitSize}px`;

            div.addEventListener('mouseenter', hoverDefault);

            row.appendChild(div);
            divs[j + i*dimension] = div;
        }

        container.appendChild(row);
    }
    currentDim = dimension;
    freshGrid = true;
}


function hoverDefault() {
        this.classList.add('hovering');
        freshGrid = false;
}

function hoverRandomColor() {
    let rgb = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    this.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    freshGrid = false;
}


function hoverPickColor(){
    this.classList.remove('hovering');
    this.style.backgroundColor = colorPicker.value;
}



function changeHoverTo(hoverMode) {
    divs.forEach(item => {
        // change the event listener to hoverMode
        item.removeEventListener('mouseenter', hoverDefault);
        item.removeEventListener('mouseenter', hoverRandomColor);
        item.removeEventListener('mouseenter', hoverPickColor);

        item.addEventListener('mouseenter', hoverMode);
    })
}

createGrid(16);