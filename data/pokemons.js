const embyImage = new Image()
embyImage.src = './img/embySprite.png'

const draggleImage = new Image()
draggleImage.src = './img/draggleSprite.png'

const pokemons = {
  Emby: {
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
    name: 'Emby',
    attacks: [attacks.Tackle, attacks.Fireball]
  },
  Draggle: {
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
    name: 'Draggle',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}