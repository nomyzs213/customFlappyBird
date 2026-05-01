import { drawBird} from "./scripts/bird.js";
import { drawPipes } from "./scripts/pipes.js";
import { drawGameOver } from "./scripts/gameOverScreen.js";

const game = document.getElementById("game");
const retry = document.getElementById("retry");

let isRendering = false;
let running = false;
let pbScoreLoc = localStorage.getItem("pbScore") ? parseInt(localStorage.getItem("pbScore")) : undefined;
let pbScore = 0;
const pbEl = document.getElementById("pb-score");
const pbAlert = document.getElementById("pb-alert")

pbEl.textContent = `obecny rekord: ${typeof pbScoreLoc === "undefined" ? 0 : pbScoreLoc} pkt!`;



const startDrawing = () => {
if (game.getContext) {

    isRendering = true;
    const ctx = game.getContext("2d");
    game.height = 500;
    game.width = 800;

    const {updateBird , stopBird , drawStartingPosition} = drawBird(ctx , game);
    let {updatePipes , pipeGap , pipeWidth} = drawPipes(ctx , game);

    pipeWidth -=100;
    let score = 0;
    
   
    const animate = () => {
        ctx.clearRect(0 , 0 ,  game.width , game.height);

        
        // sprawdzanie czy ptak uderzyl w sufit lub podłoge
        const allPipesInfo = updatePipes();
        const {birdInfo} = updateBird()  
        
        allPipesInfo.sort((a , b) => a.x - b.x);
        
        let closestPipes = allPipesInfo.find(pipes => pipes.x + pipeWidth > birdInfo.x)

        

        if(!closestPipes) {requestAnimationFrame(animate); return; } 
    
        if(  ( (birdInfo.x >= closestPipes.x && birdInfo.x < closestPipes.x + pipeWidth) // kolizja na x 
                    &&
            ( (birdInfo.y + birdInfo.h + 40  < closestPipes.h || birdInfo.y + birdInfo.h - 120 > closestPipes.h + pipeGap ) ) // kolizja na y        
              )
              ||
                (birdInfo.y <= 0 || birdInfo.h + birdInfo.y > game.height)
                                                                                                             
        )
        {   // gra zakonczona: usun score bo jest na ekranie , sprawdz czy jest nowe pb , wyswietl retry button , przestan rederowac klatki , zatrzywanie wszystkiego  
            console.log("after foreach:" , closestPipes , " birdY: " ,   birdInfo.y, " birdH: " , birdInfo.h,  " gap: " , pipeGap , " pipeH: " , closestPipes.h , " birdX: " , birdInfo.x , " pipeW: " , pipeWidth); // debugging 
            running = false;
            drawGameOver(ctx , game , score);
            document.getElementById("score").textContent = "";

            retry.style.display = "block"; 
            retry.textContent = "retry ↺"

            isRendering = false;
            stopBird();

             if(typeof pbScore === "undefined") {
                pbScore = score;
                localStorage.setItem("pbScore" , pbScore);
                }

            if(score > pbScore ) {
                pbScore = score;
                localStorage.setItem("pbScore" , pbScore);
                pbAlert.style.display = "block";
                pbAlert.textContent = `nowy rekord: ${pbScore} pkt!`
                pbEl.textContent = `obecny rekord: ${pbScore} pkt!`;
                localStorage.setItem("pbScore" , pbScore);
            };
            
        }
        else{
            running = true;
        }
       

                allPipesInfo.forEach(pipe => {
            if(birdInfo.x > pipe.x + pipeWidth && !pipe.scored) {
                pipe.scored = true;
                score++;
                document.getElementById("score").textContent = "score:" + score + " pkt";
            }
        }) 
        if(!running) return;
        setTimeout(() => {animate();} , 500/60);
        }


    animate();
}
else{
    alert("Your browser does not support canvas");  
}

}


document.addEventListener("DOMContentLoaded", () =>{

    document.addEventListener("pointerdown" , handleStart
    , {once: true}) // once bo szukany tylko pierwszego wystapienia by sie nie psulo skakanie w grze
    document.addEventListener("keydown" , handleStart , {once: true}) // once bo szukany tylko pierwszego wystapienia by sie nie psulo skakanie w grze

    retry.addEventListener("click" , () => {
        // chowanie co nie potrzebne przy retry
        if(!isRendering) {
            pbAlert.style.display = "none";
            retry.style.display = "none";
            startDrawing() ;  // 
        }

    })

    function handleStart(e) {
        if(isRendering) return; // zabezpieczenie przed ponownym startem gry podczas trwania gry
        if(e.repeat) return; // zabezpieczenie przed przytrzymaniem klawisza i psuciem skakania

        document.getElementById("before-start").textContent = ""; 
        startDrawing();
    }
});