
//classes ill be used because we going to create many diferents images. So, killing the need to create a lot of new variables with each propertie isolated like position.x, position.y frames etc.
//Using an object as constructor's parameter its easier because I don't need to remember or check the order of it. 
class Sprite {
  constructor({
    position,
    image,
    frames = {max: 1}, //If our image are not a sprite, it should have 1 max frame
    sprites
  }){
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0}
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.sprites = sprites
    this.moving = false
  }

  draw(){
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

    if(!this.moving) return //If our player isn't moving, return. This is another way instead put all beneath code inside curly brackets.
    if(this.frames.max > 1){
      this.frames.elapsed++
    }

    if(this.frames.elapsed % 10 === 0){
      if(this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
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
