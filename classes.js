
//classes ill be used because we going to create many diferents images. So, killing the need to create a lot of new variables with each propertie isolated like position.x, position.y frames etc.
//Using an object as constructor's parameter its easier because I don't need to remember or check the order of it. 
class Sprite {
  constructor({
    position,
    image,
    frames = {max: 1, speed: 10}, //If our image are not a sprite, it should have 1 max frame
    sprites,
    animate = false,
    isEnemy = false,
    rotation = 0,
    name
  }){
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0}
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.sprites = sprites
    this.animate = animate
    this.opacity = 1
    this.health = 100
    this.isEnemy = isEnemy
    this.rotation = rotation
    this.name = name
  }

  draw(){
    c.save()
    c.translate(
      this.position.x + this.width /2,
      this.position.y + this.height /2,
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width /2,
      -this.position.y - this.height /2,
    )
    c.globalAlpha = this.opacity
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x, 
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    c.restore()

    if(!this.animate) return //If our player isn't moving, return. This is another way instead put all beneath code inside curly brackets.
    if(this.frames.max > 1){
      this.frames.elapsed++
    }

    if(this.frames.elapsed % this.frames.speed === 0){
      if(this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    } 
  }
  //If I need to create animation in succession directly after one but not at the same time I have to use gsap timeline.
  attack({ attack, recipient, renderedSprites }){
    document.querySelector('#battleDialogueBox').style.display = 'block'
    document.querySelector('#battleDialogueBox').innerHTML = `${this.name} usou ${attack.name} e causou ${attack.damage} de dano.` 

    this.health -= attack.damage

    let whosHealthbar = '#enemyGreenHealthBar'
    if(this.isEnemy) whosHealthbar = '#playerGreenHealthBar'

    switch(attack.name) {
      case 'Fireball':
        let rotation = 1.5
        if(this.isEnemy) rotation = -2.5
        const fireballImage = new Image()
        fireballImage.src = './img/fireball.png'
        const fireball = new Sprite({
          position:{
            x: this.position.x,
            y: this.position.y
          },
          image: fireballImage,
          frames: {
            max: 4,
            speed: 10
          },
          animate: true,
          rotation
        })
        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            //Enemy actually gets hit
            gsap.to(whosHealthbar, {
              width: this.health + '%'
           })
    
            gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            yoyo: true,
            repeat: 6,
            duration: .07,
              onComplete: () => {
                gsap.to(recipient.position, {
                  x: recipient.position.x - 10,
                  duration: .05
                })
              }
          })
            gsap.to(recipient, {
            opacity: 0,
            repeat: 5,
            duration: .08,
            yoyo: true,
            })
            //This splice removes fireball sprite after the animation.
            renderedSprites.splice(1, 1)
          }
        })

        break

      case 'Tackle':
        let movementDistance = 20
        if(this.isEnemy) movementDistance = -20
        const tl = gsap.timeline()
        tl.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: .15,
            onComplete: () => {
            //Enemy actually gets hit
            gsap.to(whosHealthbar, {
              width: this.health + '%'
            })
    
            gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            yoyo: true,
            repeat: 6,
            duration: .07,
              onComplete: () => {
                gsap.to(recipient.position, {
                  x: recipient.position.x - 10,
                  duration: .05
                })
              }
          })
          gsap.to(recipient, {
            opacity: 0,
            repeat: 5,
            duration: .08,
            yoyo: true,
          })
        }
        }).to(this.position, {
          x: this.position.x
        })
        break
      }
    }
}

class Boundary {
  static width = 48
  static height = 48
  constructor({ position }){
    this.position = position
    this.width = 48
    this.height = 48 //These values are 48 cause our tiles have 12pixels wide but were zoomed in 400% (4 times). 12 x 4 = 48
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
