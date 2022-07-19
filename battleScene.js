
//Our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e) => {
    //This way is faster than loop an array because it chooses directly inside the attacks object why I'm looking for after clicking on attack button.
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites
    })

    queue.push(() => {
        draggle.attack({
        attack: attacks.Tackle,
        recipient: emby,
        renderedSprites
      })
    })
  })
})

const battleBackgroundImage  = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage,
})

const embyImage = new Image()
embyImage.src = './img/embySprite.png'
const emby = new Sprite({
  position: {
    x: 290,
    y: 340
  },
  image: embyImage,
  frames: {
    max: 4,
    speed: 30
  }, 
  animate: true,
  name: 'Emby'
})

const draggleImage = new Image()
draggleImage.src = './img/draggleSprite.png'
const draggle = new Sprite({
  position: {
    x: 800,
    y: 100
  },
  image: draggleImage,
  frames: {
    max: 4,
    speed: 30
  },
  animate: true,
  isEnemy: true,
  name: 'Draggle'
})

// To put fireball behind emby changing the z-index through array methods.
const renderedSprites = [draggle, emby]
function animateBattle(){
  requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}
animateBattle()

const queue = []

//To hide our dialogueBox after show battle message.
document.querySelector('#battleDialogueBox').addEventListener('click', (e) => {
  if(queue.length > 0){
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})

// const battleDialogueBox = document.querySelector('#battleDialogueBox')
// battleDialogueBox.addEventListener('click', () => {
//   battleDialogueBox.style.display = 'none'
// })