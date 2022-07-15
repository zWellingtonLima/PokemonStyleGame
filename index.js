const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576
console.log(c);

const background = new Image()
background.src = './img/PelletTown.png'

c.drawImage(background,0,0)