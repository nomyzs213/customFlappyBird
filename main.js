import { drawBird } from "./scripts/bird.js";
import { drawPipes } from "./scripts/pipes.js";

const game = document.getElementById("game");

const startDrawing = () => {
if (game.getContext) {
    const ctx = game.getContext("2d");
    game.height = 500;
    game.width = 800;

    const {updateBird} = drawBird(ctx , game);
    let {updatePipes , pipeGap , pipeWidth} = drawPipes(ctx , game);

    pipeWidth -=100;
    let score = 0;
    const animate = () => {
        ctx.clearRect(0 , 0 ,  game.width , game.height);

        
        // sprawdzanie czy ptak uderzyl w sufit lub podłoge
        const {stillRunning , birdInfo} = updateBird()  
        if(!stillRunning) return;
        
        
        const allPipesInfo = updatePipes();
        let closestPipes = allPipesInfo.find(pipes => pipes.x + pipeWidth > birdInfo.x)
        console.log( "before foreach:" , closestPipes , " y: " ,   birdInfo.y, " h: " , birdInfo.h,  " gap: " , pipeGap);

        if(!closestPipes) {requestAnimationFrame(animate); return; } 
    



        if(   (birdInfo.x >= closestPipes.x && birdInfo.x < closestPipes.x + pipeWidth) // kolizja na x 
                    &&
            ( (birdInfo.y + birdInfo.h - 65 < closestPipes.h || birdInfo.y + birdInfo.h -65 > closestPipes.h + pipeGap ) )// kolizja na y                                                                                                         
        )
        {   
            console.log("after foreach:" , closestPipes , " y: " ,   birdInfo.y, " h: " , birdInfo.h,  " gap: " , pipeGap , closestPipes.h , birdInfo.x , pipeWidth);
            return;
        }
       

                allPipesInfo.forEach(pipe => {
            if(birdInfo.x > pipe.x + pipeWidth && !pipe.scored) {
                pipe.scored = true;
                score++;
                document.getElementById("score").textContent = score;
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
});




