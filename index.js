const container = document.querySelector('.grid-container');

// create 16 row flexbox containing 16 divs
// then put the rows in one column flexbox in the container

function createGrid(dimention){
    if(!typeof dimention === 'number' && !dimention<=100) return 'ERROR';
    for (let i=0; i<dimention; i++) {  // create 16 rows
        let row = document.createElement('div');
        row.classList.add('row');

        // fill every row with 16 divs
        for(let j=0; j<dimention; j++){
            let div = document.createElement('div');
            div.classList.add('unit');
            row.appendChild(div);
        }



        container.appendChild(row);
    }
}


createGrid(16);
createGrid('pizza');