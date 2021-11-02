/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60
  const w = window.innerWidth
  const h = window.innerHeight
  // #endregion

  let inaneThoughts = []
  let palette = new Palette()

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h)
    canvas = p5canvas.canvas
    sketch.frameRate(framerate)

    const a = sketch.createVector(0.2,0.2,0.2);
    const b = sketch.createVector(0.2,0.2,0.2);
    const c = sketch.createVector(0.4,0.4,0.4);
    const d = sketch.createVector(0.0, 0.33, 0.67);
    palette = new Palette(sketch,a,b,c,d);

    sketch.background(sketch.color(0,0,0,255))
  }

  sketch.draw = function() {
    sketch.background(sketch.color(0,0,0,50))
    if (inaneThoughts.length > 0) {
      for (let i = inaneThoughts.length - 1; i >= 0; i--) {
        const it = inaneThoughts[i]
        const { x, y } = it.getPointOnPath(sketch, it.time)
        if (
          x < -50 || x > sketch.width + 50 ||
          y < -50 || y > sketch.height + 50
        ) {
          inaneThoughts.splice(i, 1)
          console.log(inaneThoughts.length)
        } else {
          it.draw(sketch)
        }
      }
    }

    if (sketch.frameCount % 10 === 0) {
      inaneThoughts.push(
        new InaneThought(
          sketch, 
          palette.getColor(sketch.random())
        )
      )
    }
  }
  // #endregion
}

var sketch = new p5(s, document.getElementById('sketch'))
