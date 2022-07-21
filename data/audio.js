const audio = {
  Map: new Howl({
    src: './audio/map.wav',
    html5: true,
    volume: .3
  }),
  InitBattle: new Howl({
    src: './audio/initBattle.wav',
    html5: true,
    volume: .1
  }),
  Battle: new Howl({
    src: './audio/battle.mp3',
    html5: true,
    volume: .1
  }),
  InitFireball: new Howl({
    src: './audio/initFireball.wav',
    html5: true,
    volume: .2
  }),
  FireballHit: new Howl({
    src: './audio/fireballHit.wav',
    html5: true,
    volume: .2
  }),
  TackleHit: new Howl({
    src: './audio/tackleHit.wav',
    html5: true,
    volume: .2
  }),
  Victory: new Howl({
    src: './audio/victory.wav',
    html5: true,
    volume: .3
  })
}