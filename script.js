// 9 boxes (0-8)
// player1(X) ,  player2 (O). ..alternative chalte h 
// jeetene ke orientation horizontal , vertical , daigonal
/* 1- Horizontal winning pattern = (0,1,2) (3,4,5)(6,7,8)
   2- Vertical winning pattern = (0,3,6)(1,4,7)(2,5,8)
   3- Daigonal winning pattern = (0,4,8)(2,4,6)
 */
   let resetBtn = document.querySelector("#reset");
   let newGameBtn = document.querySelector("#new-btn");
   let msg = document.querySelector("#msg");
   let msgContainer = document.querySelector(".msgContainer"); // Assuming there's only one msgContainer.
   
// first we need to which player will get the first turn player1 or player2
let turnO  = true;//playerX , playerO
//to store the winning patterns need to initialize an 2D - array
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
//to reset the game if any player wants to
const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}


// as we know that every button will have some reacting onclick now add event listener for each btn
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO==true){//playerO turn
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText="X";//PlayerX turn
            turnO= true;
        }
        //this one is so that after clicking on any btn the value will remain there must not be any change in it .
        box.disabled= true;
        // check winner function creation : to get winner we need to check every winning pattern to be true and have the same value at all of the three indexes
        checkWinner();
    });
});
const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
//similarly asa we got the winner new game needs to be started so we will create a function to enable the buttons
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const showWinner = (winner)=>{
    msg.innerText = `congratulation, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    //as soon as we got one winner we need to disable all the rest of the boxes
    disableBoxes();
}
 const checkWinner=()=>{
    for(let pattern of winPatterns){
       let pos1Val=  boxes[pattern[0]].innerText;
       let pos2Val=  boxes[pattern[1]].innerText;
       let pos3Val=  boxes[pattern[2]].innerText;
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

        // console.log(
        //      boxes[pattern[0]].innerText,
        //      boxes[pattern[1]].innerText, 
        //      boxes[pattern[2]].innerText
        //     );
        //when all the three positions are not empty then only we'll check the winning patterns
        if(pos1Val!=""&&pos2Val!=""&&pos3Val!=""){
            if(pos1Val==pos3Val&&pos2Val==pos3Val){
                console.log("winner",pos1Val);
                //to show the winner
                showWinner(pos1Val);
            }
        }

    }
}
//after getting the winner two functions need to be created reset game and new game button 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
