'use strict';
let board = document.getElementById('board')

function show_map(board){
    let table = document.createElement('table')

    for(let y = 7; y >= 0; y--){
        let tr = document.createElement('tr')

        for(let x = 0; x <= 7; x++){
            let td = document.createElement('td')
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    board.appendChild(table)
}
show_map(board)