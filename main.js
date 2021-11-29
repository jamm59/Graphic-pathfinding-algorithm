// constants 
const node = document.querySelectorAll('.node');
const board = document.querySelector('.board');
const start = document.querySelector('.start');
const addBorder = document.querySelector('.border');
const btn = document.querySelector('.btn');
const end = document.querySelector('.stop');
const CURRENT_COLOR = (x,y) => {
    return getComputedStyle(BOARD[x][y],'backgroundColor').backgroundColor;
}
let start_color = 'rgb(248, 72, 94)';                     // i used rgb colors because it 
const stop_color =  'rgb(255, 130, 67)';                     //  is easier for comparisons
const node_color = 'rgb(247, 246, 242)';
const border_color = 'rgb(0,0,0)'; 
// non constants
let node_num = 0;
let nodes_on_board = [];
let BOARD = [[],[],[],[],[],[]];
let started = false;
let clicked_n = false;

// chosing a start and stop position 


for (let i=0; i < node.length; i++){
    node[i].addEventListener('click' ,() => {
        // only select a starting and stopping position if 
        // the started button has not been clicked
        if (node_num < 2 && !started && !clicked_n){
            node[i].style.backgroundColor = start_color;
            start_color = stop_color;
            node_num ++;
            if (node_num >= 2){
                start_color = 'rgb(248, 72, 94)';
                node_num = 0;
                clicked_n = true;
            }
        }
    });
    
}

//done
function update_board(){
    let count = 0;
    let start = 0;
    let stop_ = 10;
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
            let n_color = getComputedStyle(BOARD[i][j],'backgroundColor').backgroundColor;
             if (n_color == start_color) {
                //if it finds the start node return the index 
                return [i,j];
             }
        }
    }
    return null;
}
function isValid(pos){
    let x=pos[0],y=pos[1];
    if (CURRENT_COLOR(x,y) === border_color){
        return false;
    }
    return true;
}
function border(pos) {
    let x=pos[0],y=pos[1];
    if (x > BOARD.length - 1 || y > BOARD[0].length - 1 || x < 0 || y < 0){
        console.log('We found a border turn back')
        return true;
    }  
    return false;
}
function find_end(ini_pos){
    // look up down left and right 
    let x=ini_pos[0];
    let y=ini_pos[1];
    if (CURRENT_COLOR(x,y) == stop_color){
        return true;
    }
    direction = [
        [-1,0],     //top
        [0,-1],    //left
		[1,0],    //down
		[0,1],   //right	
	    ]
    dir_len = direction.length;
    // for direction every direction in direction.
    for(let i=0; i<dir_len; i++){
        let n_x = x + direction[i][0];
        let n_y = y + direction[i][1];

        if (CURRENT_COLOR(n_x,n_y) == stop_color){
            return true;
        }

        if (border([n_x,n_y]) || !isValid([n_x,n_y])) {
            continue
        }

        if(isValid([n_x,n_y]) && !border([n_x,n_y])){
            BOARD[n_x][n_y].style.backgroundColor = start_color;
            n_pos = [n_x,n_y];
            setTimeout(find_end,200,n_pos);
            // BOARD[n_pos[0]][n_pos[1]].style.backgroundColor = stop_color;
            
        } 
    }
}



function main(pos){
    update_board();
    if (find_end(pos)){
        window.alert('Path found');
    }
}


let start_pos = null;

// console.log(start_pos)
start.addEventListener('click', ()=> {
    if (clicked_n){
        started = true;
    }
    else {
        window.alert('Please select a start and stop position first');
    }
    if(started){
        window.alert('started');
        getstart();
    }else {
        window.alert('Unable to start');
    }
});


addBorder.addEventListener('click', ()=> {
    update_board();
    main(getstart());
})
end.addEventListener('click',()=>{
    started = false;
    node_num = 0;
});
