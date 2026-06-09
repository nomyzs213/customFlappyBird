export const drawBird = (ctx , canvas) => {

    const bird = new Image();
    bird.src = "./assets/defaultBird/bird.png";

    const birdHeight = 50;
    const birdWidth = 60;
    let positionX = 100;
    let positionY = 100;
    let velocityY = 2.5;
    let gravity = 0.03;
    bird.onload = () => {
        ctx.drawImage(bird, positionX , positionY , birdWidth, birdHeight);
    };

    let canJump = true;
     const buttons = [" " , "ArrowUp" , "w"];

    const handleKeyDown = (e) => {
        if( (buttons.includes(e.key) && canJump) ||  (e.type === "pointerdown" && canJump) ) {
            velocityY = -1.5;
            canJump = false;
        }
        
    };

    const handleKeyUp = (e) => {
        if(buttons.includes(e.key)) canJump = true;
    };

    document.addEventListener("pointerdown", handleKeyDown);
    document.addEventListener("pointerup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);


    const stopBird = () => {
        document.removeEventListener("pointerdown", handleKeyDown);
        document.removeEventListener("pointerup", handleKeyUp);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
    };
    
    const updateBird =  () => {
        velocityY += gravity;   
        positionY += velocityY; 
        
        ctx.drawImage(bird , positionX , positionY , birdWidth, birdHeight);
        return { stillRunning: true, birdInfo: { x: positionX, y: positionY, w: birdWidth, h: birdHeight } }        
    };
    
    const drawStartingPosition = () => {
        ctx.drawImage(bird, positionX , positionY , birdWidth, birdHeight);
    }

    return {updateBird , stopBird , drawStartingPosition};

};