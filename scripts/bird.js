export const drawBird = (ctx) => {
    const birdImg = new Image();
    birdImg.src = "./assets/defaultBird.png";
    birdImg.height = "40px";
    birdImg.width = "40px";
    ctx.drawImage(birdImg , 50 , 30);
};