biali = {}
czarni = {}

for(let i = 0; i != 8; i++){
    biali[i] = ["p", [i, 1],"w"]
    czarni[i] =["p", [i, 6],"b"]
}
biali["r1"] = ["r", [0, 0],"w"]
biali["r2"] = ["r", [7, 0],"w"]
biali["n1"] = ["n", [1, 0],"w"]
biali["n2"] = ["n", [6, 0],"w"]
biali["b1"] = ["b", [2, 0],"w"]
biali["b2"] = ["b", [5, 0],"w"]
biali["q"] = ["q", [4, 0],"w"]
biali["k"] = ["i k", [5, 0],"w"]
czarni["r1"] = ["r", [0, 7], "b"]

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
    checkPos([piece[0]-1, piece[1]+1] == [target[0]-1,target[1]+1]))
  
  else{
    return false;}
    
  }
}
czarni[1][1] = [2,2]
var test = pawn(biali[3],[2,2]);
console.log(test);