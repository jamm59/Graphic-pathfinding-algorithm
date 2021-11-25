// constants 
const node = document.querySelectorAll('.node');
const board = document.querySelector('.board');
const start = document.querySelector('.start');
const btn = document.querySelector('.btn');
const end = document.querySelector('.stop');
const start_color = 'rgb(255,0,0)';
const stop_color = 'rgb(0,0,0)';
const node_color = '#F7F6F2';
const border_color = '';
// non constants
let node_num = 0
let nodes_on_board = [];
let BOARD = [[],[],[],[],[],[]];
let started = false;
let clicked_n = false;

start.addEventListener('click', ()=> {
    started = !started;
});

for (let i=0; i < node.length; i++){
    node[i].addEventListener('click' ,() => {
        if (node_num < 2 && !started){
            clicked_n = !clicked_n;
            if(clicked_n){
                node[i].style.backgroundColor = start_color;
                node_num ++;
                start_color = stop_color;
            }else {
                node[i].style.backgroundColor = node_color;
                node_num --;
            }
        }
    })
    
}

//done
function update_board(){
    let count = 0
    let start = 0
    let stop_ = 10
    while (count < BOARD.length){
        for (let row=start; row < stop_; row++)
        {
            BOARD[count].push(node[row]);
        }
        temp = start;
        start = stop_;
        stop_ += 10;
        count += 1;
    }
}


function getstart(){
    for(let i=0; i<BOARD.length; i++){
        for(let j=0; j< BOARD[0].length; j++){
            let n_color = getComputedStyle(BOARD[x1][y1],'backgroundColor').backgroundColor;
            if (n_color == start_color) {
                //if it finds the start node return the index 
                return (i,j);
            }
        }
    }
}
function isValid(pos){

}
function border(pos) {

}
function update_pos(ini_pos){
    // look up down left and right 
    let x1=ini_pos[0],y1=init_pos[1];
    let n_color = getComputedStyle(BOARD[x1][y1],'backgroundColor').backgroundColor;
    if (n_color == stop_color) {
        return true;
    }
    direction = [
        (-1,0),     //top
        (0,-1),    //left
		(1,0),    //down
		(0,1),   //right	
	    ]
    dir_len = direction.length;
    let x = ini_pos[0];
    let y = ini_pos[1];
    //for direction every direction in direction.
    for(let i=0; i<dir_len; i++){
        let n_x = x + direction[i][0];
        let n_y = y + direction[i][1];

        // if(is the rght pos){
        //     return true;
        // }

        if(isValid((n_x,n_y)) && !border((n_x,n_y))){
            n_pos = (n_x,n_y);
            BOARD[n_pos[0]][n_pos[1]].style.backgroundColor = start_color;
            update_pos(n_pos);
        }
        else if(!isValid((n_x,n_y)) || border((n_x,n_y))) {
            continue;
        }
        
    }
}



function main(pos){
    update_board();
    update_pos(pos);
}



// main();