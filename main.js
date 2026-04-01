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

        const {stillRunning , birdInfo}= updateBird()
        if(!stillRunning) return;
        const allPipesInfo = updatePipes();
        allPipesInfo.foreach(pipe => {
            if(pipe.)


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




