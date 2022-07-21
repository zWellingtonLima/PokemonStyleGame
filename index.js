const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 600

//It's vital transform the json collision file into 2D array.
const collisionsMap = []
for(let i = 0; i < collisions.length; i += 85){
  collisionsMap.push(collisions.slice(i, 85 + i))
//85x50
}

class Boundary {
  static width = 48
  static height = 48
  constructor({position}){
    this.position = position
    this.width = 48
    this.height = 48 //These values are 48 cause our tiles have 12pixels wide but were zoomed in 400% (4 times). 12 x 4 = 48
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaryTest = new Boundary({
  position: {
    x: 500,
    y: 400
  }
})

const boundaries = []

//Add a commom position to background and boundaries.
const offSet = {
  x: -492,
  y: -910
}

collisionsMap.forEach((row, index) => {
  row.forEach((symbol, index2) => {
    if(symbol === 1026 || symbol === 2684355586  || symbol === 3221226498)
    boundaries.push( new Boundary({
      position: {
        x: index2 * Boundary.width + offSet.x,
        y: index * Boundary.height + offSet.y
      }
    }))
  })
})

const backgroundImage = new Image()
backgroundImage.src = './img/PelletTown.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

// background.onload = () => { This method was used to load our image in canvas but was moved to animate function.
// }

//classes ill be used because we going to create many diferents images. So, killing the need to create a lot of new variables with each propertie isolated like position.x, position.y frames etc.
//Using an object as constructor's parameter its easier because I don't need to remember or check the order of it. 
class Sprite {
  constructor({
    position,
    image,
    frames = {max: 1}, //If our image are not a sprite, it should have 1 max frame
    
  }){
    this.position = position
    this.image = image
    this.frames = frames
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
  }

  draw(){
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x, 
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
  }
}

const backgroundMain = new Sprite({
  position: {
    x: offSet.x,
    y: offSet.y
  },
  image: backgroundImage,
})

const playerSprite = new Sprite({
  position: {
    x: canvas.width / 2 - 215 / 4 /2, // Center Player in the middle of the canvas. Static values are faster showed.
    y: canvas.height / 2 - 69 / 4
  },
  image: playerImage,
  frames: {
    max: 4
  }
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

//It's easier to add one 'movable' here than add each new item movable inside if(key.pressed).
const movables = [backgroundMain, boundaryTest]
//Animate function creates an infinite loop to catch all frames and movements our player does. So, we need to move drawImage to the function.

function animate(){
  window.requestAnimationFrame(animate) 
  backgroundMain.draw()
  // boundaries.forEach(boundary => {
  //   boundary.draw()
  // })
  boundaryTest.draw()
  playerSprite.draw()
  
  let moving = true
  playerSprite.animate = false
//A optimized way to do this is copy in each key.pressed individually. 
// Activate a battle
if(battle.initiated) return
  if(keys.w.pressed || keys.s.pressed || keys.d.pressed || keys.a.pressed){
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea = 
      (Math.min(playerSprite.position.x + playerSprite.width, battleZone.position.x + battleZone.width) -
      Math.max(playerSprite.position.x, battleZone.position.x)) *
      (Math.min(playerSprite.position.y + playerSprite.height, battleZone.position.y + battleZone.height) -
      Math.max(playerSprite.position.y, battleZone.position.y))
      if(
        rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: battleZone
      }) &&
      overlappingArea > (playerSprite.width * playerSprite.height) / 2
      &&
      Math.random() > .97
      ){
        window.cancelAnimationFrame(animationId)
        audio.Map.stop()
        audio.InitBattle.play()
        audio.Battle.play()
       //deactivate current animation loop
        battle.initiated = true
          gsap.to('#battleTransitionBlack', {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            onComplete(){
              gsap.to('#battleTransitionBlack', {
                opacity: 1,
                duration: .4,
                onComplete(){
                  //activate a new animation loop
                  initBattle()
                  animateBattle()
                  gsap.to('#battleTransitionBlack', {
                    opacity: 0,
                    duration: .4
                  })
                }
              })
            }
          })
        break
        } 
    }
  }

//This if statement only works if player object exists. At first, we only drew our player using c.drawImage() method.
  if(playerSprite.position.x + playerSprite.width >= boundaryTest.position.x &&
    playerSprite.position.x + playerSprite.width <=  boundaryTest.position.x + boundaryTest.width){
      console.log('colliding') 
    }
    

  if(keys.w.pressed && lastKey === 'w'){
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  } else if(keys.s.pressed && lastKey === 's'){
    movables.forEach((movable) => {
      movable.position.y -= 3
    })  
  } else if(keys.a.pressed && lastKey === 'a'){
    movables.forEach((movable) => {
      movable.position.x += 3
    })
  } else if(keys.d.pressed && lastKey === 'd'){
    movables.forEach((movable) => {
      movable.position.x -= 3
    })
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
animate()

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

let clicked = false
window.addEventListener('click', () => {
  if(!clicked)
  audio.Map.play()
  clicked = true
})
