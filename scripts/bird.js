export const drawBird = (ctx , canvas) => {

    const bird = new Image();
    bird.src = "./assets/defaultBird/bird.png";

    let positionX = 100;
    let positionY = 100;
    let velocityY = 1;
    let gravity = 0.0375;
    bird.onload = () => {
        ctx.drawImage(bird, positionX , positionY , 80, 80);
    };

    let canJump = true;
     const buttons = [" " , "ArrowUp" , "w"];

    document.addEventListener("keydown" , (e) => {
        if (buttons.includes(e.key)) {
           if(canJump) {
            velocityY = -2; 
            canJump = false;
        }

        }

   

    document.addEventListener("keyup" , (e) => {
        if(buttons.includes(e.key)) canJump = true;
    })
    });

    
    const stopBird = () => {
        document.removeEventListener("keydown");

    };
    
    const updateBird =  () => {
        velocityY += gravity;   
        positionY += velocityY; 
        
        ctx.drawImage(bird , positionX , positionY , 80, 80);
        return { stillRunning: true, birdInfo: { x: positionX, y: positionY, w: 80, h: 80 } }        
    };
    
    return {updateBird , stopBird};

};