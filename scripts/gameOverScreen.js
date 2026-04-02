
export const drawGameOver = (ctx , canvas , score) => {

ctx.fillStyle ="rgba(0, 0, 0, 0.25  )";
ctx.fillRect(0 , 0  , canvas.width , canvas.height);
ctx.font = "70px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 100);
ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 80    );


}