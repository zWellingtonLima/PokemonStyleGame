const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

//It's vital transform the json collision file into 2D array.
const collisionsMap = []
for(let i = 0; i < collisions.length; i += 85){
  collisionsMap.push(collisions.slice(i, 85 + i))
//85width x 50height are my map dimensions created on Tiled.
}

const battleZonesMap = []
for(let i = 0; i < battleZonesData.length; i += 85){
  battleZonesMap.push(battleZonesData.slice(i, 85 + i))
}

// background.onload = () => { At first, this method was used to load our image in canvas but it was moved to animate function.
// }

const boundaries = []

//Add a commom position to background and boundaries.
const offSet = {
  x: -492,
  y: -910
}

collisionsMap.forEach((row, index) => {
  row.forEach((symbol, index2) => {
    if(symbol === 1026)
    boundaries.push( new Boundary({
      position: {
        x: index2 * Boundary.width + offSet.x,
        y: index * Boundary.height + offSet.y - 55 
      }
    }))
  })
})

const battleZones = []
battleZonesMap.forEach((row, index) => {
  row.forEach((symbol, index2) => {
    if(symbol === 376 ||symbol ===  312 ||symbol ===  343 ||symbol ===  340 || symbol === 345)
    battleZones.push( new Boundary({
      position: {
        x: index2 * Boundary.width + offSet.x,
        y: index * Boundary.height + offSet.y - 55 
      }
    }))
  })
})

const backgroundImage = new Image()
backgroundImage.src = './img/PelletTown.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foreground.png'

const playerImageDown = new Image()
playerImageDown.src = './img/playerDown.png'
const playerImageUp = new Image()
playerImageUp.src = './img/playerUp.png'
const playerImageLeft = new Image()
playerImageLeft.src = './img/playerLeft.png'
const playerImageRight = new Image()
playerImageRight.src = './img/playerRight.png'

const bulbasaurImageDown = new Image()
bulbasaurImageDown.src = './img/bulbasaurSpriteDown.png'

const backgroundMain = new Sprite({
  position: {
    x: offSet.x,
    y: offSet.y
  },
  image: backgroundImage,
})

const foreground = new Sprite({
  position: {
    x: offSet.x,
    y: offSet.y
  },
  image: foregroundImage
})

const playerSprite = new Sprite({
  position: {
    x: canvas.width / 2 - 215 / 4 /2, // Center Player in the middle of the canvas. Static values are faster showed.
    y: canvas.height / 2 - 69 / 4
  },
  image: playerImageDown,
  frames: {
    max: 4,
    speed: 10
  },
  sprites: {
    down: playerImageDown,
    up: playerImageUp,
    left: playerImageLeft,
    right: playerImageRight
  },
  animate: true
})

const bulbasaurSprite = new Sprite({
  position: {
    x: canvas.width / 2 - 215 / 4 /2, // Center Player in the middle of the canvas. Static values are faster showed.
    y: 550
  },
  image: bulbasaurImageDown,
  frames: {
    max: 4
  },
  animate: true
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
const movables = [backgroundMain, ...boundaries, foreground, bulbasaurSprite, ...battleZones]
//Animate function creates an infinite loop to catch all frames and movements our player does. So, we need to move drawImage to the function.
function rectangularCollision({rectangle1, rectangle2 }){
  return (
    rectangle1.position.x + rectangle1.width - 15 >= rectangle2.position.x &&
    rectangle1.position.x + 10 <=  rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height - 10 >= rectangle2.position.y &&
    rectangle1.position.y + 25 <= rectangle2.position.y + rectangle2.height
  )
}

const battle = {
  initiated: false
}

function animate(){
  const animationId = window.requestAnimationFrame(animate) 
  backgroundMain.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
  })
  battleZones.forEach(boundary => {
    boundary.draw()
  })
  bulbasaurSprite.draw()
  playerSprite.draw()
  foreground.draw()
  
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
       //deactivate current animation loop
        battle.initiated = true
        audio.map.stop()
        audio.initBattle.play()
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
        audio.battle.play()
        break
        } 
    }
  }

//This if statement only works if player object exists. At first, we only drew our player using c.drawImage() method.
  if(keys.w.pressed && lastKey === 'w'){
    playerSprite.animate = true
    playerSprite.image = playerSprite.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(
        rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: {...boundary,
        position:{
          x: boundary.position.x,
          y: boundary.position.y + 3
        }}
      })
      ){
        moving = false
        break
        } 
    }

    if(moving)
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  } else if(keys.s.pressed && lastKey === 's'){
    playerSprite.animate = true
    playerSprite.image = playerSprite.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(
        rectangularCollision({
          rectangle1: playerSprite,
          rectangle2: {...boundary,
            position:{
              x: boundary.position.x,
              y: boundary.position.y - 3
            }}
          })
          ){
            moving = false
            break
          } 
        }
        
    if(moving)
    movables.forEach((movable) => {
      movable.position.y -= 3
    })  
  } else if(keys.a.pressed && lastKey === 'a'){
    playerSprite.animate = true
    playerSprite.image = playerSprite.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(
        rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: {...boundary,
        position:{
          x: boundary.position.x + 3,
          y: boundary.position.y
        }}
      })
      ){
        moving = false
        break
        } 
    }
    
    if(moving)
    movables.forEach((movable) => {
      movable.position.x += 3
    })
  } else if(keys.d.pressed && lastKey === 'd'){
    playerSprite.animate = true
    playerSprite.image = playerSprite.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(
        rectangularCollision({
        rectangle1: playerSprite,
        rectangle2: {...boundary,
        position:{
          x: boundary.position.x - 3,
          y: boundary.position.y
        }}
      })
      ){
        moving = false
        break
        } 
    }
    
    if(moving)
    movables.forEach((movable) => {
      movable.position.x -= 3
    })
  } 
  
}

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
  if(!clicked){
    audio.map.play()
    clicked = true
  }
})