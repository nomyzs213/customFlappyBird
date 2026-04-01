export const drawBird = (ctx , canvas) => {

    const bird = new Image();
    bird.src = "./assets/defaultBird/bird.png";

    let positionX = 100;
    let positionY = 100;
    let velocityY = 1;
    let gravity = 0.1;
    bird.onload = () => {
        ctx.drawImage(bird, positionX , positionY , 110, 120);
        animate();
    };


    document.addEventListener("keydown" , (e) => {
        const buttons = [" " , "ArrowUp" , "KeyW"];
        if (buttons.includes(e.key)) {
            velocityY = -2;
        }
      
    });

    const animate = () => {
        ctx.clearRect(0 , 0, canvas.width , canvas.height);
        velocityY += gravity;   
        positionY += velocityY; 
        if( positionY + 50 >= canvas.height 
            || positionY <= 0 
        )
            {
                document.getElementById("game-info").textContent = "Game Over";
                return;
            }
        ctx.drawImage(bird , positionX , positionY , 110, 120);
        requestAnimationFrame(animate);
        
    };

};