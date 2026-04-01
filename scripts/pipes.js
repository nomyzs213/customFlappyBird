export const drawPipes = (ctx , canvas)=> {
    const upperPipe = new Image();
    const lowerPipe = new Image();

    upperPipe.src = "./assets/pipes/upperPipe.png";
    lowerPipe.src = "./assets/pipes/lowerPipe.png";

    const minHeight = 50;
    const maxHeight = 280;
    const pipeWidth = 70;
    const pipeGap = 150;

    const upperPipeHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    const lowerPipeHeight = upperPipeHeight - pipeGap;

    
   
}

