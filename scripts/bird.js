export const drawBird = (ctx , canvas) => {

    const bird = new Image();
    bird.src = "./assets/defaultBird/bird.png";

    let positionX = 100;
    let positionY = 100;
    let velocityY = 1;
    let gravity = 0.05;
    bird.onload = () => {
        ctx.drawImage(bird, positionX , positionY , 110, 120);
    };


    document.addEventListener("keydown" , (e) => {
        const buttons = [" " , "ArrowUp" , "w"];
        if (buttons.includes(e.key)) {
            velocityY = -2;
        }
      
    });

    const updateBird =  () => {
        velocityY += gravity;   
        positionY += velocityY; 
        if( positionY + 50 >= canvas.height 
            || positionY <= 0 
        )
            {
                document.getElementById("game-info").textContent = "Game Over";
                return {stillRunning: false , birdInfo:null};

            } 
        ctx.drawImage(bird , positionX , positionY , 110, 120);
        return { stillRunning: true, birdInfo: { x: positionX, y: positionY, w: 110, h: 120 } }        
    };
    
    return {updateBird};

};