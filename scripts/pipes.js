export const drawPipes = (ctx , canvas)=> {
    const upperPipe = new Image();
    const lowerPipe = new Image();

    upperPipe.src = "./assets/pipes/upperPipe.png";
    lowerPipe.src = "./assets/pipes/lowerPipe.png";

    const minHeight = 50;
    const maxHeight = 280;
    const pipeWidth =  190;
    const pipeGap = 150;

    let moveSpeed = 2;

    let pipeArr = [];
    let frameCount = 0;
    let screenWidth = canvas.width;
   
     const updatePipes  = () => {
        frameCount++;
        createPipe();

        pipeArr = pipeArr.filter(pipe => pipeWidth + pipe.x > 0)

        
        pipeArr.forEach(pipe => {
            pipe.x -= moveSpeed;
            const lowerPipeHeight = canvas.height - pipe.h - pipeGap;
            ctx.drawImage(upperPipe, pipe.x , 0 , pipeWidth , pipe.h);
            ctx.drawImage(lowerPipe, pipe.x , pipe.h + pipeGap , pipeWidth ,  lowerPipeHeight );
        }
        )
        return {updatePipes};
    }

    const createPipe = () => {
        if(frameCount % 80 === 0 && screenWidth > 0){
            const uppePipeHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
            pipeArr.push({x: screenWidth ,  h: uppePipeHeight})
         } 
    }

    return {updatePipes};
}

