const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
const tempImage = canvas.toDataURL();
const oldWidth = canvas.width;
const oldHeight = canvas.height;

canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
ctx.lineCap = "round";
ctx.lineWidth = ctx.lineWidth || 4;

const img = new Image();
img.src = tempImage;
img.onload = function(){
    ctx.drawImage(img, 0, 0);
}
}
resizeCanvas();
window.addEventListener("resize" , resizeCanvas);

let drawing = false;

/////////// Pen Style ///////////////////
ctx.strokeStyle = "#00ff99";
ctx.lineWidth = 4;
ctx.lineCap = "round";

////////// Mouse Events //////////////////
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", stopDraw); 
canvas.addEventListener("mouseleave", stopDraw);
canvas.addEventListener("mousemove", (e) => {
    if(!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});


///////////////////// Functions /////////////////

function stopDraw(e) {
    drawing = false;
    ctx.beginPath();
}

function drawMouse(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); 
    ctx.stroke();
}

function setColor(color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    canvas.style.cursor = "crosshair";
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setEraser(){
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 20;
    canvas.style.cursor = "grab";
}
//////////////Mobile Touch Support////////

canvas.addEventListener("touchstart" , (e) => {
    drawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
});

canvas.addEventListener("touchmove" , (e) => {
    if(!drawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
    e.preventDefault();

});

canvas.addEventListener("touchend" , () => drawing = false);
canvas.addEventListener("touchcancel" , stopDraw);
