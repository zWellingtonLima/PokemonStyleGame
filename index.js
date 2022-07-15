const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 600

const backgroundImage = new Image()
backgroundImage.src = './img/PelletTown.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

// const boundarie = new Image
// boundarie.src = './img/boundarie.png'

// background.onload = () => { This method was used to load our image in canvas but was moved to animate function.
// }

//classes ill be used because we going to create many diferents images. So, killing the need to create a lot of new variables with each propertie isolated like position.x, position.y frames etc.
//Using an object as constructor's parameter its easier because I don't need to remember or check the order of it. 
class Sprite {
  constructor({
    position,
    image
  }){
    this.position = position
    this.image = image
  }

  draw(){
    c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y
      )
  }
}

const backgroundMain = new Sprite({
  position: {
    x: -492,
    y: -910
  },
  image: backgroundImage,
})

const playerSprite = new Sprite({
  position: {
    x: '',
    y: ''
  },
  image: playerImage
})

const keys = {
  w: {
    pressed: false
  },
  s: {
    pressed: false
  },
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  e: {
    pressed: false
  }
}

//This function creates an infinite loop to catch all frames and movements our player does. So, we need to move drawImage to the function.
function animate(){
  window.requestAnimationFrame(animate) 
  backgroundMain.draw()
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

  if(keys.w.pressed && lastKey === 'w'){
    backgroundMain.position.y += 3
  } else if(keys.s.pressed && lastKey === 's'){
    backgroundMain.position.y -= 3
  } else if(keys.a.pressed && lastKey === 'a'){
    backgroundMain.position.x += 3
  } else if(keys.d.pressed && lastKey === 'd'){
    backgroundMain.position.x -= 3
  } 
}
animate()

let lastKey = ''
//Player movement using Window E-listener
//Whenever we key down we want to call whatever code is within the Arrow Function
window.addEventListener('keydown', (e) => {
  switch (e.key){
    case 'w':
      keys.w.pressed = true 
      lastKey = 'w'     
      break

    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
  }
})

//It's necessary put back on keys up to false when they're released.
window.addEventListener('keyup', (e) => {
  switch (e.key){
    case 'w':
      keys.w.pressed = false      
      break

    case 'a':
      keys.a.pressed = false
      break

    case 'd':
      keys.d.pressed = false
      break

    case 's':
      keys.s.pressed = false
      break
  }
})
