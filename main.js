'use strict';
let board = document.getElementById('board')

function show_map(board){
    let table = document.createElement('table')

    for(let y = 8; y >= 0; y--){
        let tr = document.createElement('tr')

        for(let x = 0; x <= 8; x++){
            
            let td = document.createElement('td')
            let color = (x + y) % 2 ? td.classList.add('white') : td.classList.add('black')

            if(x == 0){
                td.removeAttribute("class")
                td.innerHTML = 'y' + y
                td.classList.add('coordinate')
            }

            if(y == 0){
                td.removeAttribute("class")
                td.innerHTML = 'x' + x
                td.classList.add('coordinate')
            }

            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    board.appendChild(table)
}
show_map(board)

