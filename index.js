const container = document.querySelector('.container');
const containerWidth = parseFloat(getComputedStyle(container).width);


const changeDimBtn = document.querySelector('.btnChangeDim');


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


changeDimBtn.addEventListener('click', () => changeDim('enter the dimension (100 max):'));


function createGrid(dimension){
    if(typeof dimension !== 'number' || dimension <= 0 || dimension >100) return 'ERROR';
    
    for (let i=0; i<dimension; i++) {  // create 16 rows
        let row = document.createElement('div');
        row.classList.add('row');
        
        // fill every row with 16 divs
        for(let j=0; j<dimension; j++){
            let div = document.createElement('div');
            div.classList.add('unit');
            
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
}


createGrid(16);
createGrid('pizza');


function addHover(div){
    // pass a div and make it change color as the mouse hovers over it
    div.addEventListener('mouseenter', () => {
    div.classList.add('hovering')
    })
}

