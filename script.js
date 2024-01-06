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
            //console.log(k)
        }
        if (i % 2 != 0) {
            k = 2;  
        } else {
            k = 1;  
        }
    }
}
function str(input){
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
    z = document.getElementById(str(value[1]));
    z.appendChild(img);
}
function assignPiecesToBoard(){
    try{
        for(let [key, value] of Object.entries(plansza)){
        document.getElementById("img").remove()
        }} catch (error){console.log(error)}

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






plansza = {}

for (let p = 0; p < 8; p++) {
    plansza["w" + p] = ["wp", [p, 1]];
}
for (let p = 0; p < 8; p++) {
    plansza["b" + p] = ["bp", [p, 6]];
    console.log(p)
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
plansza["bk"][1] = [2,3]

temp = {}
document.addEventListener('click', function(event){
    if(event.target.id == "img"){
        for(let [key, value] of Object.entries(plansza)){
            if(value[1]==event.target.id){
                temp = key
            }
        }
        console.log(temp)
    }
    if(event.target.id != "img" && temp != {}){
        console.log(event.target.id)
        temp[1] = event.target.id
        assignPiecesToBoard()
    }
})