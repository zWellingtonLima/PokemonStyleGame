
const battleBackgroundImage  = new Image()
battleBackgroundImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage,
})

const emby = new Pokemons(pokemons.Emby)
const draggle = new Pokemons(pokemons.Draggle)

// To put fireball behind emby changing the z-index through array methods.
const renderedSprites = [draggle, emby]

//Creates a versatile button generator using the data associate with each attack that pokemon may have.
emby.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksMenu').append(button)
})

const queue = []

//Our event listeners for our buttons (attack)
document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e) => {
    //This way is faster than loop an array because it chooses directly inside the attacks object why I'm looking for after clicking on attack button.
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    emby.attack({
      attack: selectedAttack,
      recipient: draggle,
      renderedSprites
    })

    if(draggle.health <= 0){
      queue.push(() => {
        draggle.faint()
      })
    }

    //Enemy Ramdom Attack here
    const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

    queue.push(() => {
        draggle.attack({
        attack: randomAttack,
        recipient: emby,
        renderedSprites
      })
    })

    if(emby.health <= 0){
      queue.push(() => {
        emby.faint()
      })
    }
  })

  button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('#attackTypeText').innerHTML = selectedAttack.type
    document.querySelector('#attackTypeText').style.color = selectedAttack.color
  })

  button.addEventListener('mouseleave', () => {
    document.querySelector('#attackTypeText').innerHTML = 'Attack Type'
    document.querySelector('#attackTypeText').style.color = 'black'
  })
})

function animateBattle(){
  requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

//To hide our dialogueBox after show battle message.
document.querySelector('#battleDialogueBox').addEventListener('click', (e) => {
  if(queue.length > 0){
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})



animateBattle()
// const battleDialogueBox = document.querySelector('#battleDialogueBox')
// battleDialogueBox.addEventListener('click', () => {
//   battleDialogueBox.style.display = 'none'
// })