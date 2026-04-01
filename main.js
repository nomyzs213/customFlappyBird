const game = document.getElementById("game");

if (game.getContext) {
    const ctx = game.getContext("2d");
    ctx.heigth = 500;
    ctx.width = 700;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0 , 0 , ctx.width , ctx.heigth);

    // importowanie standardowego ptaka
    import("./scripts/bird.js")
        .then(module => {
            module.drawBird(ctx); 
        })
        .catch(err => {
            throw new Error(err);
        })


}
else{
    alert("Your browser does not support canvas");
}


const main = () => {

}