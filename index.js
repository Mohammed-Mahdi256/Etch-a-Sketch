const container = document.querySelector('.grid-container');

// create 16 row flexbox containing 16 divs
// then put the rows in one column flexbox in the container

function createGrid(dimension){
    if(typeof dimension !== 'number' || dimension <= 0 || dimension >100) return 'ERROR';
    for (let i=0; i<dimension; i++) {  // create 16 rows
        let row = document.createElement('div');
        row.classList.add('row');

        // fill every row with 16 divs
        for(let j=0; j<dimension; j++){
            let div = document.createElement('div');
            div.classList.add('unit');

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

    div.addEventListener('mouseleave', () => {
        div.classList.remove('hovering');
    })
}