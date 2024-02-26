const holder = document.getElementById("all");
const divSize = 80

function Empty2DArray(rows, cols) { //y; x
    return Array.from({ length: rows },
        () => Array(cols).fill(null));
}
function createHtmlBoard(){
	k = 0 //kolor
	for(y = 7; y >= 0; y--){
		row = document.createElement('div');
		row.className = "row"
		row.id = "row"+y
		for(x=0; x<=7; x++){
			cell = document.createElement('div');
			cell.className = (k == 1) ? "piece coordinate-light" : "piece coordinate-dark";
			cell.id = y.toString()+x.toString()
			row.appendChild(cell);
			k++;
			k = (k == 2) ? 0 : 1 //idk cos wymyslilem jak bylem na haju/zmeczony
		}
		k++
		holder.appendChild(row);
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
	for(y = 0; y<=7; y++){
		for(x=0; x<=7; x++){ 
			if(plansza[y][x] != null){ //jesli pozycja nie jest pusta
				piece = plansza[y][x][0]+plansza[y][x][1] //jaka bierka (kolor + bierka)
				
				pieceEle = document.createElement('img'); //utworz child
				pieceEle.width = divSize //wielkosc
				pieceEle.height = divSize
				pieceEle.className = piece+" img" //zdjecie przez klase css / pijane 
				document.getElementById(y.toString()+x.toString()).appendChild(pieceEle)
			}
		}
	}
}

function assignStartPosition(){ //skonczone, dziala
	//assign pieces
	//kolor, pionek (angielski skrot)
	for(i=0;i<=7;i++){ //i=x
		plansza[1][i]=["w","p"];
		plansza[6][i]=["b","p"];
	}
	plansza[0][0] = ["w","r"] //2x biale wieze
	plansza[0][7] = ["w","r"] 
	plansza[7][0] = ["b","r"] //2x czarne wieze
	plansza[7][7] = ["b","r"]

	plansza[0][1] = ["w","n"] //2x biale skoczki
	plansza[0][6] = ["w","n"] 
	plansza[7][1] = ["b","n"] //2x czarne skoczki
	plansza[7][6] = ["b","n"]

	plansza[0][2] = ["w","b"] //2x biale gonce
	plansza[0][5] = ["w","b"] 
	plansza[7][2] = ["b","b"] //2x czarne gonce
	plansza[7][5] = ["b","b"]

	plansza[0][3] = ["w","q"] //biala damka
	plansza[0][4] = ["w","k"] //bialy krol
	plansza[7][3] = ["b","q"] //czarna damka
	plansza[7][4] = ["b","k"] //czarny krol
}

function start(){
	assignStartPosition() //przypisz poczatkowa pozycje bierek
	createHtmlBoard() //stworz plansze na stronie
	assignPiecesToBoard(false) //wyswietl bierki na stronie
}

function raycast(origin){
	originX = origin 
	
}
function checkClassicMove(ax, ay, bx, by){ //a przesun na b + c jest dla pionkow
	if(ax<0 || ax>7 || ay<0 || ay>7 || bx<0 || bx>7 || by<0 || by>7){return false} //jesli wartosc jest poza szachownica to anuluj
	console.log("przeszlo 1")
	if(!(ax == bx && ay == by)){ //czy to nie to samo
		console.log("przeszlo 2")
		if(plansza[ay][ax][1] === "p"){ //pion
			console.log("przeszlo 3")
			if(plansza[by][bx] != null){
				if(ax == bx && (ay + 2 == by && ay == 1) || (ay - 2 == by && ay == 6)){ //y+=2 x=x 
					return true
				}else if(ax == bx && ay+1 == by && plansza[by][bx] === null){ //pion o jeden do przodu dla bialego
					return true
				}else if(ax == bx && ay-1 == by && plansza[by][bx] === null){ //pion o jeden do przodu dla czarnego
					return true
				}else if(ay+1 == by && ax-1 == bx && (plansza[ay][ax][0] == "w" && plansza[by][bx][0] == "b")){ //bicie po lewym skosie dla bialego
					return true	
				}else if(ay+1 == by && ax+1 == bx && (plansza[ay][ax][0] == "w" && plansza[by][bx][0] == "b")){ //bicie po prawym skosie dla bialego
					return true	
				}else if(ay-1 == by && ax-1 == bx && (plansza[ay][ax][0] == "b" && plansza[by][bx][0] == "w")){ //bicie po lewym skosie dla czarnego
					return true	
				}else if(ay-1 == by && ax+1 == bx && (plansza[ay][ax][0] == "b" && plansza[by][bx][0] == "w")){ //bicie po prawym skosie dla czarnego
					return true	
				}
				return false
			}else{
				console.log("sprawdzam enpassant")
				if(ay+1 == by && ax-1 == bx && (plansza[ay][ax][0] == "w" && plansza[ay][ax-1][0] == "b") && ay == 5){ //enpasant dla bialych po lewym skosie
					return true
				}else if(ay+1 == by && ax+1 == bx && (plansza[ay][ax][0] == "w" && plansza[ay][ax+1][0] == "b") && ay == 5){ //enpasant dla bialych po prawym skosie
					return true
				}else if(ay-1 == by && ax-1 == bx && (plansza[ay][ax][0] == "b" && plansza[ay][ax-1][0] == "w") && ay == 4){ //enpasant dla czarnych po lewym skosie
					return true
				}else if(ay-1 == by && ax+1 == bx && (plansza[ay][ax][0] == "b" && plansza[ay][ax+1][0] == "w") && ay == 4){ //enpasant dla bialych po prawym skosie
					return true
				}
			}
		}
	}
	return false //default
}
function move(ax, ay, bx, by){
	plansza[by][bx] = plansza[ay][ax]
	plansza[ay][ax] = null
	assignPiecesToBoard()
}
function splitInHalf(input){ //suport dla listenera + dziala
	input = input.toString()
	return [parseInt(input[0]),parseInt(input[1])]
}
highlighted = []
function highlight(target, czyDel){ //podswietl + dziala
	if(czyDel === false){
		console.log("dziala")
		highlighted.push(target)
		target.classList.add("highlight")
	}else{
		highlighted.forEach(del =>{
			del.classList.remove("highlight")
		})
	}
}

function debugHtmlLegalMove(){
	ax = document.getElementById("ax").value-1
	ay = document.getElementById("ay").value-1
	bx = document.getElementById("bx").value-1
	by = document.getElementById("by").value-1
	document.getElementById("debug").innerHTML = checkClassicMove(ax, ay, bx, by)
}
function debugHtmlMove(){
	ax = document.getElementById("ax").value-1
	ay = document.getElementById("ay").value-1
	bx = document.getElementById("bx").value-1
	by = document.getElementById("by").value-1
	move(ax,ay,bx,by)	
}
fClick = null //zmienne dla funkcji klikania; first
sClick = null //second

document.addEventListener('click', function(event){ //klikanie / poruszanie
	target = event.target
	if(target.classList.contains("img")){ //bierka
		if(fClick === null){ //za duzo tlumaczenia
			fClick = splitInHalf(target.parentNode.id) //zamien na pozycje
			highlight(target, false) //podswietl
		}else if(plansza[fClick[0]][fClick[1]][0] == plansza[splitInHalf(target.parentNode.id)[0]][splitInHalf(target.parentNode.id)[1]][0]){ //zapomnialem i jest zapozno na takie myslenie
			fClick = splitInHalf(target.parentNode.id) //zamien na pozycje
			highlight() //usun podswietlenie
			highlight(target, false) //podswietl
		}else if(sClick === null){ //wypelnij druga
			sClick = splitInHalf(target.parentNode.id) //zamien na pozycje
			highlight(target, false) //podswietl
			move()
		}else{ 
			fClick = sClick = null //wyzeruj wybor
			highlight() //usun podswietlenie
		}
		
	}else if(target.parentNode.classList == "row"){ //rzad - puste pole
		if(fClick != null && sClick === null){ //wypelnij druga
			sClick = splitInHalf(target.id) //zamien na pozycje
			highlight(target, false) //podswietl
			move(fClick,sClick) //zrob ruch
		}else{ 
			fClick = sClick = null //wyzeruj wybor
			highlight() //usun podswietlenie
		}
	}else{ //domyślnie
		fClick = sClick = null //wyzeruj wybor
		highlight() //usun podswietlenie
	}
})

//sekwencja startowa
plansza = Empty2DArray(8,8) //stworz plansze
start()
