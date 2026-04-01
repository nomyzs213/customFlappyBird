const game = document.getElementById("game");


document.addEventListener("DOMContentLoaded", () =>{

    startDrawing();
});


const startDrawing = () => {
if (game.getContext) {
    const ctx = game.getContext("2d");
    game.height = 500;
    game.width = 800;


    import("./scripts/bird.js")
        .then(module => {
            module.drawBird(ctx , game); 
        })
        .catch(err => {
            console.error("Error loading bird module:", err);
        })


}
else{
    alert("Your browser does not support canvas");
}

}

