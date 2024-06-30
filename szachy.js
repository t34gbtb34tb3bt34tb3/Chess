const chessboard = document.getElementById("chessboard");
const divSize = 80 //Math.min(window.innerWidth, window.innerHeight) * 0.12;
plansza = Array(64).fill()
startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
const offset = [8,-8,-1,1,7,-7,9,-9];
const knightOffset = [15, -15, 17, -17, 6, -6, 10, -10];
kolorDoPoruszenia = "w";
numSquaresToEdge = []; //inicjowanie zmiennej bo js jest kijowy
highlighted = []
whiteKing = 4
blackKing = 60

function createBoard(){
	for (let row = 7; row >= 0; row--) {
		for (let col = 0; col < 8; col++) {
			const cell = document.createElement('div');
			const pos = row * 8 + col;
			cell.className = ((row+col)%2===0) ? "square coordinate-light" : "square coordinate-dark";
			cell.id = pos;
			chessboard.appendChild(cell);
		}
	}
}
function assignPiecesToBoard(){ //pokaz bierki
	//usuwanie wszystkich zdjec z klasa .img (pijane cos)
	elements = Array.from(document.getElementsByTagName("img")) //sprawdz czy sa elementy z klasa
	imgs = Array.from(elements)
	imgs.forEach(img => { 
		if(img.classList.contains("img")){img.remove()}
	});
	//przypisywanie bierek do pozycji
	for(var i = 0; i<64; i++){
		if(plansza[i] != null){ //jesli pozycja nie jest pusta
			piece = plansza[i][0]+plansza[i][1] //jaka bierka (kolor, bierka)
			pieceEle = document.createElement('img'); //utworz child
			pieceEle.width = divSize //wielkosc
			pieceEle.height = divSize
			pieceEle.className = piece+" img" //zdjecie przez klase css / pijane 
			document.getElementById(i).appendChild(pieceEle)
		}
	}
}
function isLetter(str) { //dziekuje stackoverflow
  return str.length === 1 && str.match(/[a-z]/i);
}
function isNumber(str) { //dziekuje stackoverflow + javascript jest zwalony (Number.isInteger('7') = false)
  return str.length === 1 && str.match(/[0-9]/i);
}
function loadFEN(fen){
	file = 0; rank = 7; //file = x; rank = y;
	for(var i = 0; i<fen.length; i++){
		symbol = fen[i];
		if(symbol == '/'){
			file = 0;
			rank--;
		}else{
			if(isNumber(symbol)){
				file+=parseInt(symbol);
			}else if(isLetter(symbol)){
				color = (symbol === symbol.toUpperCase()) ? "w" : "b";
				piece = symbol.toLowerCase();
				plansza[rank*8+file] = [color, piece];
				file++;
			}
		}
	}
}

function possibleMoves(){
	for(var file = 0; file < 8; file++){
		for(var rank = 0; rank < 8; rank++){
			var N = 7-rank;
			var S = rank;
			var W = file;
			var E = 7-file;

			var squareIndex = rank*8+file;
			
			NW = Math.min(N, W); //skosy
			SE = Math.min(S, E);
			NE = Math.min(N, E);
			SW = Math.min(S, W);
			numSquaresToEdge[squareIndex] = [N,S,W,E,NW,SE,NE,SW];
		}
	}
}
highlighted = {}
function highlight(array, cssClass){
	if(highlighted.hasOwnProperty(cssClass)){
		for(i = 0; i<highlighted[cssClass].length; i++){
			document.getElementById(highlighted[cssClass][i]).classList.remove(cssClass)
		}
		highlighted[cssClass] = [];
	}else {
        highlighted[cssClass] = [];
    }
	if(array === undefined){return 0}
	console.table(array)
	for(i = 0; i<array.length; i++){
		let e = document.getElementById(array[i]);
		if(!isNaN(e.id)){
			e.classList.add(cssClass);
			highlighted[cssClass].push(array[i]);
		}
	}
}
function generateSlidingMoves(start, piece){ //po skosie
	startIndex = (piece[1] == "b") ? 4 : 0;
	endIndex = (piece[1] == "r") ? 4 : 8;
	moves = [];
	for(var index = startIndex; index<endIndex; index++){
		for(var n = 0; n<numSquaresToEdge[start][index]; n++){
			var target = start + offset[index] * (n+1); //next pos
			if(plansza[target] != null){
				if(plansza[target][0] === piece[0]){ //czy ten sam kolor
					break;
				}
				moves.push(target)
				if(plansza[target][0] != piece[0]){
					break;
				}
			}
			moves.push(target);
		}
	}
	console.table(moves)
	return moves;
}
function ruch(start, target, array){
	array[target] = array[start];
	array[start] = null;
}

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function moveHelper(start, target){
	highlight([], "hint"); //usuń highlight
	if(plansza[start][0] === kolorDoPoruszenia){ // czyja tura
		if(plansza[target] != null && plansza[target][0] == kolorDoPoruszenia){
			return 0
		}
		if(plansza[start][1] == "b" || plansza[start][1] == "r" || plansza[start][1] == "q"){
			if(generateSlidingMoves(start, plansza[start]).includes(target)){
				console.log("ruch")
				let poRuchu = deepCopy(plansza);
				ruch(start, target, poRuchu);
				if(findCheck(((kolorDoPoruszenia == "w") ? whiteKing : blackKing), poRuchu)){
					ruch(start, target, plansza);
					assignPiecesToBoard();
					kolorDoPoruszenia = (kolorDoPoruszenia == "w") ? "b" : "w";
					document.getElementById("tomove").innerHTML = "To move: " + kolorDoPoruszenia;
				}else{
					alert("szach")
				}
			}else{
				alert("nie legalny ruch")
			}
		}else if(plansza[start][1] == "p"){
			if(generatePawnMoves(start, plansza[start]).includes(target)){
				console.log("ruch")
				let poRuchu = deepCopy(plansza);
				ruch(start, target, poRuchu);
				poRuchu = promowaniePiona(poRuchu);
				if(findCheck(((kolorDoPoruszenia == "w") ? whiteKing : blackKing), poRuchu)){
					plansza = deepCopy(poRuchu)
					assignPiecesToBoard();
					kolorDoPoruszenia = (kolorDoPoruszenia == "w") ? "b" : "w";
					document.getElementById("tomove").innerHTML = "To move: " + kolorDoPoruszenia;
				}else{
					alert("szach")
				}
			}else{
				alert("nie legalny ruch")
			}
		}else if(plansza[start][1] == "n"){
			if(generateKnightMoves(start, plansza[start]).includes(target)){
				console.log("ruch")
				let poRuchu = deepCopy(plansza);
				ruch(start, target, poRuchu);
				if(findCheck(((kolorDoPoruszenia == "w") ? whiteKing : blackKing), poRuchu)){
					ruch(start, target, plansza);
					assignPiecesToBoard();
					kolorDoPoruszenia = (kolorDoPoruszenia == "w") ? "b" : "w";
					document.getElementById("tomove").innerHTML = "To move: " + kolorDoPoruszenia;
				}else{
					alert("szach")
				}
			}else{
				alert("nie legalny ruch")
			}
		}
		else if(plansza[start][1] == "k"){
			if(generateKingMoves(start, plansza[start]).includes(target)){
				console.log("ruch")
				let poRuchu = deepCopy(plansza);
				let kingPos = ((kolorDoPoruszenia == "w") ? whiteKing : blackKing);
				ruch(start, target, poRuchu);
				if (kolorDoPoruszenia === "w") {
					whiteKing = target;
				} else {
					blackKing = target;
				}
				if(findCheck(target, poRuchu)){
					ruch(start, target, plansza);
					assignPiecesToBoard();
					kolorDoPoruszenia = (kolorDoPoruszenia == "w") ? "b" : "w";
					document.getElementById("tomove").innerHTML = "To move: " + kolorDoPoruszenia;
				}else{
					if (kolorDoPoruszenia === "w") {
						whiteKing = kingPos;
					} else {
						blackKing = kingPos;
					}
					alert("szach")
				}
			}else{
				alert("nie legalny ruch")
			}
		}
	}
}
function promowaniePiona(poRuchu){
    for(let i = 56; i<64; i++){
        if(poRuchu[i] != null && poRuchu[i][1] == "p" && poRuchu[i][0] == "w"){
            let opcja = prompt('Na co chcesz promować białego piona: q(ueen), r(ook), n(ight), b(ishop)?');
            poRuchu[i][1] = opcja.toLowerCase();
        }
    }
    for(let i = 0; i<8; i++){
        if(poRuchu[i] != null && poRuchu[i][1] == "p" && poRuchu[i][0] == "b"){
            let opcja = prompt('Na co chcesz promować czarnego piona: q(ueen), r(ook), n(ight), b(ishop)?');
            poRuchu[i][1] = opcja.toLowerCase();
        }
    }
    return poRuchu;
}




function generatePawnMoves(start, piece){
	let moves = []
	if(piece[0] == "w"){ //jesli bialy
		if(start > 7 && start < 16){ //ruch o dwa do przodu
			if(plansza[start+offset[0]] == null){
				moves.push(start+offset[0]);
				if(plansza[start+2*offset[0]] == null){
					moves.push(start+2*offset[0]);
				}
			}
		}else if(start > 15){ // do przodu
			if(plansza[start+offset[0]] == null){
				moves.push(start+offset[0]);
			}
		}
		if(plansza[start+offset[4]] != null && plansza[start+offset[4]][0] == "b"){
			if(start%8==0 && start+offset[4]%8==7){
				console.log("ok")
			}else{
				moves.push(start+offset[4]);
			}
		}
		if(plansza[start+offset[6]] != null && plansza[start+offset[6]][0] == "b"){ 
			if(start%8==7 && start+offset[6]%8!=0){
				console.log("ok")
			}else{
				moves.push(start+offset[6]);
			}
		}
	}else if(piece[0] == "b"){ //jesli bialy 
		if(start > 47 && start < 56){ //ruch o dwa do przodu
			if(plansza[start+offset[1]] == null){
				moves.push(start+offset[1]);
				if(plansza[start+2*offset[1]] == null){
					moves.push(start+2*offset[1]);
				}
			}
		}else if(start < 56){ // do przodu
			if(plansza[start+offset[1]] == null){
				moves.push(start+offset[1]);
			}
		}
		if(plansza[start+offset[5]] != null && plansza[start+offset[5]][0] == "w"){ 
			if(start%8==0 && start+offset[5]%8!=7){
				console.log("ok")
			}else{
				moves.push(start+offset[5]);
			}
		}
		if(plansza[start+offset[7]] != null && plansza[start+offset[7]][0] == "w"){ 
			if(start%8==7 && start+offset[7]%8!=0){
				console.log("ok")
			}else{
				moves.push(start+offset[7]);
			}
		}
	}
	console.log("returning")
	return moves
}

function start(){
	alert("Jeśli coś nie działa to napisz na email: domiksad@gmail.com (nie przeczytam)")
	alert("Brak funkcjonalności bicia w przelocie, roszady, i sprawdzeniu mata")
	alert('Czyli jak sie nie mozesz ruszyc bo caly czas masz powiadomienie: "szach" to możliwe że jest mat')
	createBoard();
	loadFEN(startFEN);
	assignPiecesToBoard();
	possibleMoves(); // generate array for moves
	document.getElementById("tomove").innerHTML = "To move: " + kolorDoPoruszenia; // kolor do poruszania
}

function findCheck(kingId, array){
	let checks = []
	for(var index = 0; index<4; index++){ //po skosach dla figur r,q
		for(var n = 0; n<numSquaresToEdge[kingId][index]; n++){
			var target = kingId + offset[index] * (n+1); //next pos
			if(array[target] != null){
				if(array[target][0] === array[kingId][0]){ //czy ten sam kolor
					break;
				}
				if(array[target][0] != array[kingId][0]){ //czy nie ten sam kolor
					if(array[target][1] == "r" || array[target][1] == "q"){
						checks.push(target);
					}else{
						break;
					}
				}
			}
		}
	}
	for(var index = 4; index<8; index++){ //po skosach dla figur b,q
		for(var n = 0; n<numSquaresToEdge[kingId][index]; n++){
			var target = kingId + offset[index] * (n+1); //next pos
			if(array[target] != null){
				if(array[target][0] === array[kingId][0]){ //czy ten sam kolor
					break;
				}
				if(array[target][0] != array[kingId][0]){ //czy nie ten sam kolor
					if(array[target][1] == "b" || array[target][1] == "q"){
						checks.push(target);
					}else{
						break;
					}
				}
			}
		}
	}
	for(let i = 0; i < 8; i++){ //sprawdz skoczki
		let target = kingId + knightOffset[i];
		if((target > 0 && target < 64) && (array[target] != null && array[target][1] == "n" && array[target][0] != array[kingId][0])){
			if(i>3){
				if(!(Math.abs(kingId/8 - target/8) > 2 || Math.abs(kingId%8 - target%8) > 2)){
					checks.push(target);
				}
			}else{
				checks.push(target);
			}
		}
	}
	if(array[kingId][0] == "w"){ //czarne piony
		if(array[kingId+9] != null && array[kingId+9][0] == "b" && array[kingId+9][1] == "p"){
			checks.push(kingId+9);
		}
		if(array[kingId+7] != null && array[kingId+7][0] == "b" && array[kingId+7][1] == "p"){
			checks.push(kingId+7);
		}
	}else if(array[kingId][0] == "b"){ //czarne piony
		if(array[kingId-9] != null && array[kingId-9][0] == "w" && array[kingId-9][1] == "p"){
			checks.push(kingId-9);
		}
		if(array[kingId-7] != null && array[kingId-7][0] == "w" && array[kingId-7][1] == "p"){
			checks.push(kingId-7);
		}
	}
	console.log(checks)
	if(checks.length == 0){
		return true
	}else{
		return false
	}
}

function generateKingMoves(start, piece){
	let moves = []
	for(let i = 0; i < 8; i++){
		target = start + offset[i];
		if(target > 0 && target < 64 && (plansza[target] == null || plansza[target][0] != piece[0])){
			moves.push(target);
		}
	}
	return moves
}
function generateKnightMoves(start, piece){
	let moves = [];
	for(let i = 0; i < 8; i++){
		let target = start + knightOffset[i];
		if((target > 0 && target < 64) && (plansza[target] == null || plansza[target][0] != piece[0])){
			if(i>3){
				if(!(Math.abs(start/8 - target/8) > 2 || Math.abs(start%8 - target%8) > 2)){
					moves.push(target);
				}
			}else{
				moves.push(target);
			}
		}
	}
	return moves
}

start()

fclick = null;
sClick = null;
document.onclick = function(e){
	let target = e.target.classList;
	if(target.contains("img")){
		console.log("Zajęte pole")
		let id = e.target.parentNode.id;
		if(fclick == null || plansza[fclick][0] == plansza[parseInt(id)][0] && sClick == null){
			fclick = parseInt(id);
			console.log(id)
			if(kolorDoPoruszenia == plansza[id][0]){
				let whatToHighlight = (plansza[id][1] == "p") ? generatePawnMoves(fclick, plansza[fclick]) : (plansza[id][1] == "k") ? generateKingMoves(fclick, plansza[fclick]) : (plansza[id][1] == "n") ? generateKnightMoves(fclick, plansza[fclick]) : generateSlidingMoves(fclick, plansza[fclick]);
				highlight(whatToHighlight, "hint");
			}else{
				fclick = null
			}
		}else if(fclick != null && sClick == null){
			sclick = parseInt(id);
			moveHelper(fclick, sclick);
			fclick = null;
			sclick = null;
		}else{
			fclick = null;
			sclick = null;
		}
	}else{
		console.log("Puste pole")
		let id = e.target.id;
		if(!isNaN(id)){
			console.log("passed")
			if(fclick != null && sClick == null){
				sclick = parseInt(id);
				moveHelper(fclick, sclick);
				fclick = null;
				sclick = null;
			}else{
				fclick = null;
				sclick = null;
			}
		}
	}
}