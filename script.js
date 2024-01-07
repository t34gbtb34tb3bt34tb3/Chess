function gen(){
    k = 1;
    for(let i = 7; i >= 0; i--){
        h = document.getElementById(i);
        for(let j = 0; j < 8; j++){
            g = document.createElement("box"+k);
            g.className = "box"+k;
            g.id = "["+j+","+i+"]";
            h.appendChild(g);
            k++;
            if(k>=3){k=1};
        }
        if (i % 2 != 0) {
            k = 2;  
        } else {
            k = 1;  
        }
    }
}
function stri(input){
    return JSON.stringify(input);
}


wp = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png';
wn = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png';
wr = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png';
wb = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png';
wq = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png';
wk = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png';
bp = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png';
bn = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png';
bb = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png';
br = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png';
bq = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png';
bk = 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png';

function helper(image, value){
    var img = document.createElement("img");
    img.src = image;
    img.width = 80;
    img.height = 80;
    img.id = "img";
    z = document.getElementById(stri(value[1]));
    z.appendChild(img);
}
function assignPiecesToBoard(){
    for(let i = 7; i >= 0; i--){
        h = document.getElementById(i);
        for(let j = 0; j < 8; j++){
            del = document.getElementById("["+j+","+i+"]");
            try{
                del.remove()
            }catch(error){console.log(error)}
    }}
    gen()
    for(let [key, value] of Object.entries(plansza)){
        switch (value[0]){
            case "wp":
                helper(wp, value);
                break;
            case "wn":
                helper(wn, value);
                break;
            case "wr":
                helper(wr, value);
                break;
            case "wb":
                helper(wb, value);
                break;
            case "wq":
                helper(wq, value);
                break;
            case "wk":
                helper(wk, value);
                break;
            case "bp":
                helper(bp, value);
                break;
            case "bn":
                helper(bn, value);
                break;
            case "br":
                helper(br, value);
                break;
            case "bb":
                helper(bb, value);
                break;
            case "bq":
                helper(bq, value);
                break;
            case "bk":
                helper(bk, value);
                break;
            default:
                console.log("Nieznana bierka: ", value[0]);
                break;
        }
    }
}
function textToArray(text){
    x = text.replace("[", "").replace("]", "").split(",")
    result = x.map(function (a) { 
        return parseInt(a); 
    });
    return result
}
function checkPos(pos){
    for(let [key,value] of 
    Object.entries(plansza)){
      if(stri(value[1])
      ==stri(pos)){return key;}
}
function pawn(piece, target, color){
    if(color == "w"){
        if(piece[1][1] == 2){
            if(checkPos(target) && checkPos(target[1]+1) && piece[1] == target[1]+2){ //o dwa do przodu
                return true
            } else {return false}
        }
    }else{
        if(piece[1][1] == 6){
            if(checkPos(target) && checkPos(target[1]-1) && piece[1] == target[1]-2){ //o dwa do przodu
                return true
            } else {return false}
        }
    }
}

function canMove(piece, target){
    switch (piece){
        case "wp":
            pawn(piece,target,"w");
            break;
        case "wn":
            break;
        case "wr":
            break;
        case "wb":
            break;
        case "wq":
            break;
        case "wk":
            break;
        case "bp":
            pawn(piece,target,"b")
            break;
        case "bn":
            break;
        case "br":
            break;
        case "bb":
            break;
        case "bq":
            break;
        case "bk":
            break;
        default:
            console.log("Nieznana bierka: ", value[0]);
            break;
    }
    }
}



plansza = {}

for (let p = 0; p < 8; p++) {
    plansza["w" + p] = ["wp", [p, 1]];
}
for (let p = 0; p < 8; p++) {
    plansza["b" + p] = ["bp", [p, 6]];
}
plansza["wr1"] = ["wr", [0, 0]]
plansza["wr2"] = ["wr", [7, 0]]
plansza["wn1"] = ["wn", [1, 0]]
plansza["wn2"] = ["wn", [6, 0]]
plansza["wb1"] = ["wb", [2, 0]]
plansza["wb2"] = ["wb", [5, 0]]
plansza["wq"] = ["wq", [4, 0]]
plansza["wk"] = ["wk", [3, 0]]

plansza["br1"] = ["br", [0, 7]]
plansza["br2"] = ["br", [7, 7]]
plansza["bn1"] = ["bn", [1, 7]]
plansza["bn2"] = ["bn", [6, 7]]
plansza["bb1"] = ["bb", [2, 7]]
plansza["bb2"] = ["bb", [5, 7]]
plansza["bq"] = ["bq", [4, 7]]
plansza["bk"] = ["bk", [3, 7]]

gen();
assignPiecesToBoard();

temp = []
document.addEventListener('click', function(event){
    if(event.target.parentNode.className == "row" || event.target.parentNode.parentNode.className == "row"){
        //check czy dotyka planszy
        if(event.target.id == "img"){ //czy zaznaczam bierke
            for(let [key, value] of Object.entries(plansza)){ //przez kazda bierke z listy
                if(stri(value[1])==event.target.parentNode.id){ //czy pozycja bierki jest równa id pola
                    temp.push(key) //ustaw zaznaczona bierke
                }
            }
            doc = document.getElementById(event.target.parentNode.id) //kolor
            if(doc.className == "box2"){
                doc.style.backgroundColor = '#dde246';
            } else if(doc.className == "box1"){
                doc.style.backgroundColor = "#f7f783";
            }
        }

        if(temp.length > 0){
            if(temp.length == 1 && stri(plansza[temp[0]][1]) != event.target.parentNode.id && canMove(plansza[temp[0]], temp[0][1])){ //przesuwanie koloru bez bicia
                plansza[temp[0]][1] = textToArray(event.target.id)
                temp = []
                assignPiecesToBoard()
            } else if(temp.length == 2 && plansza[temp[0]][0] != plansza[temp[1]][0]){ //przesuwanie z biciem
                plansza[temp[0]][1] = plansza[temp[1]][1]
                delete plansza[temp[1]]
                console.log(plansza)
                temp = []
                assignPiecesToBoard()
            } else if(temp.length > 2){ //jesli wyjdzie poza to resetuj
                temp = []
            }
        }
    }
})