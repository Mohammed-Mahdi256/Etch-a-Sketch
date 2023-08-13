const container = document.querySelector('.container');
let containerWidth = parseFloat(getComputedStyle(container).width);

let currentDim = 16;

let freshGrid = true


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
    
    for (let i=0; i<dimension; i++) {  // create 16 rows
        let row = document.createElement('div');
        row.classList.add('row');
        
        // fill every row with 16 divs
        for(let j=0; j<dimension; j++){
            let div = document.createElement('div');
            div.classList.add('unit');
            
            containerWidth = parseFloat(getComputedStyle(container).width);
            //determine the size depending on the dimension and the total gaps between the boxes
            totalGap = (dimension - 1) * 2; //there are dimension - 1 gaps each is 2px
            unitSize = (containerWidth - totalGap) / dimension;
            div.style.width = `${unitSize}px`;
            div.style.height = `${unitSize}px`;

            addHover(div);

            row.appendChild(div);
        }

        container.appendChild(row);
    }
    currentDim = dimension;
    freshGrid = true;
}


function addHover(div){
    div.addEventListener('mouseenter', () => {
    div.classList.add('hovering')
    freshGrid = false;
    })
}


createGrid(16);
createGrid('pizza');



