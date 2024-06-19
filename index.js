document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector(".grid");
    const flagsLeft=document.getElementById("flags-left")
    const width=10;
    let bombAmount=20;
    //Create Board
    function createBoard()
    {
        
        for(let i=0;i<width*width;i++){//100 times loop

            const square=document.createElement("div");
            square.id=i;
            grid.appendChild(square);

        }
    }
    createBoard();
})