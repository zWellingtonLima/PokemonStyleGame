//There was a little bug on sprite Class and it needed to be refactored this way. 
// const embyImage = new Image()
// embyImage.src = 

// const draggleImage = new Image()
// draggleImage.src = 

const pokemons = {
  Emby: {
    name: 'Emby',
    health: 100,
    position: {
      x: 290,
      y: 340
    },
    image: {
      src: './img/embySprite.png',
    },
    frames: {
      max: 4,
      speed: 30
    }, 
    animate: true,
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Draggle: {
    name: 'Draggle',
    health: 100,
    position: {
      x: 800,
      y: 100
    },
    image: {
      src: './img/draggleSprite.png',
    },
    frames: {
      max: 4,
      speed: 30
    },
    animate: true,
    isEnemy: true,
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}