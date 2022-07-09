console.debug('tapcomp.js start')




const GameSpace = document.getElementById("thegame");



if (GameSpace.getContext) {
    console.debug('canvas found')

    const resize = () => {
        GameSpace.width = window.innerWidth;
        GameSpace.height = window.innerHeight;
      }
      
    resize()
    window.addEventListener('resize', resize)

    GameSpace.width = document.body.clientWidth; //document.width is obsolete
    GameSpace.height = document.body.clientHeight; //document.height is obsolete
    var canvasW = GameSpace.width;
    var canvasH = GameSpace.height;

    var ctx = GameSpace.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, 50, 50)
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

}
else {
    console.error('canvas does not exist???')
}
/* function init()
{
    canvas = document.getElementById("thegame");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;

    if( canvas.getContext )
    {
        setup();
        setInterval( run , 33 );
    }
}

function setup () {

}

function run() {

} */