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

function checkPos(pos){
    for(let [key,value] of 
    Object.entries(plansza)){
      //console.log(value[1])
      if(str(value[1])
      ==str(pos)){return key;}
    }
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

if(temp.length > 0){ //czy wybrane miejsce jest na planszy
    console.log(temp)
    if(temp.length == 1 ){ //jesli jest jeden element
        plansza[temp[0]][1] = textToArray(event.target.id) //ustaw pozycje
        temp = [] //oproznij
        assignPiecesToBoard() //wyswietl

    }else if(temp.length == 2){ //jesli sa 2 elementy
        plansza[temp[0]][1] = textToArray(plansza[temp[1]][1])
        console.log(plansza[temp[1]])
        temp = []
        assignPiecesToBoard()

    }else{temp = {}}
}