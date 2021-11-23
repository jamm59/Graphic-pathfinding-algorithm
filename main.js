const node = document.querySelectorAll('.node');
const board = document.querySelector('.board');
let node_num = 0
let nodes_on_board = [];

// let new_node = document.createElement('div');
// new_node.className = 'node';
// board.appendChild(new_node);

for (let i=0; i < node.length; i++){
    node[i].addEventListener('click' ,() => {
        if (node_num < 2){
            node[i].style.backgroundColor = 'red';
            node_num ++;
        }
    })
    
}
let BOARD = [
            [],
            [],
            [],
            [],
            [],
            []
        ]

let count = 0
let start = 0
let stop_ = 10
while (count < BOARD.length){
    for (let row=start; row < stop_; row++)
    {
        BOARD[count].push(node[row]);
    }
    temp = start
    start = stop_
    stop_ += 10
    count += 1
}
console.log(BOARD);