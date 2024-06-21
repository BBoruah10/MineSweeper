document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector(".grid");
    const flagsLeft=document.getElementById("flags-left")
    const width=10;
    let bombAmount=20;
    let squares=[];
    let isGameOver=false;
    const result=document.querySelector("#result");
    let flags=0;
    const square=document.createElement("div");
    //Create Board
    function createBoard()
    {
        flagsLeft.innerHTML=bombAmount;
        //get shuffled game array with random bombs
        const bombArray=Array(bombAmount).fill("bomb");
        //console.log(bombArray);
        const emptyArray=Array(width*width - bombAmount).fill('valid');
        //console.log(emptyArray);
        const gameArray=emptyArray.concat(bombArray);//concatenating
        //console.log(gameArray);
        const shuffledArray=gameArray.sort(()=>Math.random()-0.5);
        //console.log(shuffledArray);
        for(let i=0;i<width*width;i++){//100 times loop

            const square=document.createElement("div");
            square.id=i;
            //we will add a class list to the Square i.e. the DIV
            square.classList.add(shuffledArray[i]);

            grid.appendChild(square);

            squares.push(square);
           // console.log(squares);

           //normal click
           square.addEventListener("click",function() {
               clickSquare(square);
           })
           //cntrl and left click
           square.addEventListener("contextmenu",function() {
                addFlag(square);

           })

        }

        //add Numbers--> depending on the no of mines surrounding that number
        for(let i=0;i<squares.length;i++){
            let total=0;
            const isLeftEdge=(i%width === 0);
            const isRightEdge=(i%width === width-1);
            //console.log(squares);
            if(squares[i].classList.contains('valid')){
                if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
                if(i>9 && !isRightEdge && squares[i-1].classList.contains('bomb')) total++;
                if(i>10 && squares[i-width].classList.contains('bomb')) total++;
                if(i>11 && !isLeftEdge && squares[i-width-1].classList.contains('bomb')) total++;
                if(i<99 && squares[i+1].classList.contains('bomb')) total++;
                if(i<90 && !isLeftEdge && squares[i+width-1].classList.contains('bomb')) total++;
                if(i<88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++;
                if(i<89 && squares[i+width].classList.contains('bomb')) total++;


                squares[i].setAttribute('data',total);//data attribute added



            }


        }
    }
    createBoard();
    //add floag with right click
    function addFlag(square)
    {
        if(isGameOver) return;
        if(!square.classList.contains('checked') && (flags<bombAmount)){
            if(!square.classList.contains('flag')){
                square.classList.add('flag');
                flags++;
                square.innerHTML='🚩';
                flagsLeft.innerHTML=bombAmount-flags;
                checkWin()
            }else{
                square.classList.remove('flag');
                flags--;
                square.innerHTML=''
                flagsLeft.innerHTML=bombAmount-flags;

            }
        }

    }
    function clickSquare(square)
    {
         //console.log(square);
         if(isGameOver) return;
         if(square.classList.contains('checked')||square.classList.contains('flag')) return;
         if(square.classList.contains('bomb')){
                gameOver();
                playAgain();
               
         }else{
            let total=square.getAttribute("data");
            if(total!=0){
                square.classList.add("checked");
                if(total==1) square.classList.add('one');
                if(total==2) square.classList.add('two');
                if(total==3) square.classList.add('three');
                if(total==4) square.classList.add('four');
                square.innerHTML=total;
                return;
            }
            checkSquare(square);//zero thakile
         }
         square.classList.add('checked');
    }
    function checkSquare(square){
        const currentId=square.id;
        const isLeftEdge=(square.id % width=== 0);
        const isRightEdge=(square.id % width === width-1);

        setTimeout(function(){
            if(currentId>0 && !isLeftEdge){
                const newId=squares[parseInt(currentId)-1].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
                
            }
            if(currentId>9 && !isRightEdge){
                const newId=squares[parseInt(currentId)+1-width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId>10){
                const newId=squares[parseInt(currentId)-width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId>11 && !isLeftEdge){
                const newId=squares[parseInt(currentId)-1-width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId<98 && !isRightEdge){
                const newId=squares[parseInt(currentId)+1].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId<90 && !isLeftEdge){
                const newId=squares[parseInt(currentId)-1+width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId<88 && !isRightEdge){
                const newId=squares[parseInt(currentId)+1+width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }
            if(currentId<89){
                const newId=squares[parseInt(currentId)+width].id;
                const newSquare=document.getElementById("newId");
                clickSquare(newSquare);
            }

        },10)
    }
    function checkWin(){
        let matches=0;
        for(let i=0;i<squares.length;i++){
            if(squares[i].classList.contains('flag') && squares.classList.contains('bomb')){
                matches++;
            }
            if(matches===bombAmount){
                result.innerHTML="You Win!"
                isGameOver = true;

            }
        }
    }
    
    function gameOver()
    {
        result.innerHTML="BOOM! Game Over!"
        isGameOver=true;
        //Show all bombs
        squares.forEach(function(square){
            if(square.classList.contains('bomb')){
                square.innerHTML="💣";
                square.classList.remove('bomb');
                square.classList.add('checked');
             

            }
        })
    }
    function playAgain(){
        const play=document.createElement("button");
        play.setAttribute("class","playA");
        play.innerText="Play Again ▶️";
        result.append(play);
        play.addEventListener("click",()=>{
            window.location.reload();//reloads
        })
        
    }
})