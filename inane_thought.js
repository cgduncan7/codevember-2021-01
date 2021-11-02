
function InaneThought(sketch, color) {
  let startX, startY
  this.color = color
  switch (sketch.floor(sketch.random(0, 4))) {
    case 0: // N
      startX = sketch.random(-50, sketch.width + 50)
      startY = -50
      break
    case 1: // E
      startX = sketch.width + 50
      startY = sketch.random(-50, sketch.height + 50)
      break
    case 2: // S
      startX = sketch.random(-50, sketch.width + 50)
      startY = sketch.height + 50
      break
    case 3: // W
      startX = -50
      startY = sketch.random(-50, sketch.width + 50)
      break
  }
  this.startLocation = {
    x: startX,
    y: startY
  }
  this.endLocation = { x: sketch.width / 2, y: sketch.height / 2}
  this.time = 0
  this.pathPoints = [
    { x: this.startLocation.x, y: this.startLocation.y },
    { x: sketch.random(0, sketch.width), y: sketch.random(0, sketch.height) },
    { x: sketch.random(0, sketch.width), y: sketch.random(0, sketch.height) },
    { x: this.endLocation.x, y: this.endLocation.y },
  ]

  sketch.noFill()
  sketch.noStroke()
  this.path = sketch.bezier(
    this.pathPoints[0].x, this.pathPoints[0].y,
    this.pathPoints[1].x, this.pathPoints[1].y,
    this.pathPoints[2].x, this.pathPoints[2].y,
    this.pathPoints[3].x, this.pathPoints[3].y,
  )
}

InaneThought.prototype.getPointOnPath = function(sketch, t) {
  return {
    x: sketch.bezierPoint(
      this.pathPoints[0].x,
      this.pathPoints[1].x,
      this.pathPoints[2].x,
      this.pathPoints[3].x,
      t
    ),
    y: sketch.bezierPoint(
      this.pathPoints[0].y,
      this.pathPoints[1].y,
      this.pathPoints[2].y,
      this.pathPoints[3].y,
      t
    ),
  }
}

InaneThought.prototype.draw = function(sketch) {
  const { x, y } = this.getPointOnPath(sketch, this.time)
  sketch.fill(this.color)
  const dist = 0.01 * sketch.dist(x, y, sketch.width / 2, sketch.height / 2)
  sketch.circle(x, y, 20 + 50 * (1 / sketch.max(0.2, dist)))
  this.time += 0.01
}