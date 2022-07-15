const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 600
console.log(c);

const background = new Image()
background.src = './img/PelletTown.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

// const boundarie = new Image
// boundarie.src = './img/boundarie.png'

background.onload = () => {
  c.drawImage(background, -492, -910)
    c.drawImage(
      playerImage,
      0,
      0,
      playerImage.width / 4,
      playerImage.height,
      canvas.width/2 - (playerImage.width / 4) /2, // Center Player in the middle of the canvas  
      canvas.height/2 - playerImage.height /4,
      playerImage.width / 4,
      playerImage.height
    )
}
