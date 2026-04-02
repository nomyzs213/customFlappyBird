import { drawBird} from "./scripts/bird.js";
import { drawPipes } from "./scripts/pipes.js";
import { drawGameOver } from "./scripts/gameOverScreen.js";

const game = document.getElementById("game");
const startGame = document.getElementById("start-game");
let isRendering = false;

 const startDrawing = () => {
if (game.getContext) {
    isRendering = true;
    const ctx = game.getContext("2d");
    game.height = 500;
    game.width = 800;

    const {updateBird , stopBird} = drawBird(ctx , game);
    let {updatePipes , pipeGap , pipeWidth} = drawPipes(ctx , game);

    pipeWidth -=100;
    let score = 0;
    
   
    const animate = () => {
        ctx.clearRect(0 , 0 ,  game.width , game.height);

        
        // sprawdzanie czy ptak uderzyl w sufit lub podłoge
        const {birdInfo} = updateBird()  
        
        const allPipesInfo = updatePipes();
        allPipesInfo.sort((a , b) => a.x - b.x);
        
        let closestPipes = allPipesInfo.find(pipes => pipes.x + pipeWidth > birdInfo.x)

        

        if(!closestPipes) {requestAnimationFrame(animate); return; } 
    
        if(  ( (birdInfo.x >= closestPipes.x && birdInfo.x < closestPipes.x + pipeWidth) // kolizja na x 
                    &&
            ( (birdInfo.y + birdInfo.h + 32 < closestPipes.h || birdInfo.y + birdInfo.h - 64  > closestPipes.h + pipeGap ) ) // kolizja na y        
              )
              ||
                (birdInfo.y <= 0 || birdInfo.h + birdInfo.y > game.height)
                                                                                                             
        )
        {   
            console.log("after foreach:" , closestPipes , " birdY: " ,   birdInfo.y, " birdH: " , birdInfo.h,  " gap: " , pipeGap , " pipeH: " , closestPipes.h , " birdX: " , birdInfo.x , " pipeW: " , pipeWidth); // debugging 
            drawGameOver(ctx , game , score);
            document.getElementById("score").textContent = "  score: " + score;
            startGame.textContent = "retry ↺"
            isRendering = false;
            stopBird();
            return;
        }
       

                allPipesInfo.forEach(pipe => {
            if(birdInfo.x > pipe.x + pipeWidth && !pipe.scored) {
                pipe.scored = true;
                score++;
                document.getElementById("score").textContent = "score:" + score;
            }
        }) 
        requestAnimationFrame(animate);
        }


    animate();
}
else{
    alert("Your browser does not support canvas");  
}

}

document.addEventListener("DOMContentLoaded", () =>{

    startDrawing();
    startGame.addEventListener("click" , () => {
        if(!isRendering) {
            startDrawing() ;
        }

    })
});