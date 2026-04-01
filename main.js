import { drawBird } from "./scripts/bird.js";
import { drawPipes } from "./scripts/pipes.js";

const game = document.getElementById("game");

const startDrawing = () => {
if (game.getContext) {
    const ctx = game.getContext("2d");
    game.height = 500;
    game.width = 800;

    const {updateBird} = drawBird(ctx , game);
    const {updatePipes} = drawPipes(ctx , game);

    const animate = () => {
        ctx.clearRect(0 , 0 ,  game.width , game.height);
        let collission = false;
        const {stillRunning , birdInfo}= updateBird()  
        if(!stillRunning) return;
        const allPipesInfo = updatePipes();
        allPipesInfo.forEach(pipe => {

            const pipeGap = 150;
            const lowerPipeHeight = game.height - pipe.h - pipeGap;
            const pipeWidth =  190;

            if(birdInfo.x + 50 < pipe.x + pipeWidth &&
                birdInfo.x +  50+ birdInfo.w > pipe.x &&
                (birdInfo.y + 50 < pipe.h || birdInfo.y + birdInfo.h + 50 > pipe.h + pipeGap)){
                    
                ctx.clearRect(0 , 0 ,  game.width , game.height);
                collission = true;
                return;
            }
            
        })
        if(collission) return;
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




