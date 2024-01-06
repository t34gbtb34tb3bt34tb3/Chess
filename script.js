function gen(){
    k = 1;
    for(let i = 0; i != 8; i++){
        h = document.getElementById(i);
        for(let j = 0; j != 8; j++){
            g = document.createElement("box"+k);
            g.className = "box"+k;
            g.id = j+","+i;
            h.appendChild(g);
            k++;
            if(k>=3){k=1};
            console.log(k)
        }
        if (i % 2 == 0) {
            k = 2;  
        } else {
            k = 1;  
        }
    }
}
function str(input){
    return JSON.stringify(input);
}
  function checkPos(pos){
    for(let [key,value] of 
    Object.entries(biali)){
      //console.log(value[1])
      if(str(value[1])
      ==str(pos)){return key;}
    }
    for(let [key,value] of
    Object.entries(czarni)){
      //console.log(key)
      if(str(key[1])
      ==str(pos)){return key;}
    }
    return false
}
  function checkMove(piece, targetPos){
    key = checkPos(targetPos)
    if(key != false){
      if(str(piece[2])==str(key[2])){
        return false;
      }else{
        return true;
    }}
    return false
}
  function pawn(piece, target){
    //czy pionek; czy te samo x; czy cos tam nie stoi
    var local = [piece[0], piece[1] + 1]
    if(str(piece[0])==str("p")){
      if(piece[1][0] == target[0] && !checkPos(target) && !checkPos([piece[0], piece[1] + 1])){ //do przodu
        return true;
      }else if([piece[0]+1, piece[1]+1] == [target[0]+1,target[1]+1] && 
      checkPos([piece[0]+1, piece[1]+1] == [target[0]+1,target[1]+1])) {
        return true; //bicie
      }else if([piece[0]-1, piece[1]+1] == [target[0]-1,target[1]+1] && 
      checkPos([piece[0]-1, piece[1]+1] == [target[0]-1,target[1]+1])){
          return true;
      }
    
    else{
      return false;}
      
    }
}
wp = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png'; //pion
wn = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png';
wr = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png';
wb = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png';
wq = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png';
wk = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png';
bp = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png';
bn = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png';
bb = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png';
br = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png';
bq = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png';
bk = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png';

function assignPiecesToBoard(){
    for(let [key,value] of Object.entries(biali)){
        switch (value[0]){
            case "wp":
                var img = document.createElement(img);
                img.src = wp;
                document.getElementById(str(value[1])).appendChild(img);
        }
    }

}






biali = {}
czarni = {}

for(let i = 0; i != 8; i++){
    biali[i] = ["wp", [i, 1]]
    czarni[i] =["bp", [i, 6],]
}
biali["r1"] = ["wr", [0, 0]]
biali["r2"] = ["wr", [7, 0]]
biali["n1"] = ["wn", [1, 0]]
biali["n2"] = ["wn", [6, 0]]
biali["b1"] = ["wb", [2, 0]]
biali["b2"] = ["wb", [5, 0]]
biali["q"] = ["wq", [4, 0]]
biali["k"] = ["wk", [5, 0]]
czarni["r1"] = ["br", [0, 7]]


czarni[1][1] = [2,2]
var test = pawn(biali[3],[2,2]);
console.log(test);

gen();
assignPiecesToBoard();