/**
 * Generates a palette based on Inigo Quilez's wonderful article
 * http://www.iquilezles.org/www/articles/palettes/palettes.htm
 * 
 * @param {p5.Vector} a 
 * @param {p5.Vector} b 
 * @param {p5.Vector} c 
 * @param {p5.Vector} d 
 * @returns {Object}
 */

 function Palette(s,a,b,c,d) {
  this.s = s;
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
}

/**
 * Returns a p5.color object in RGB space
 * @returns {color}
 */
Palette.prototype.getColor = function(t) {
  const l = p5.Vector.add(this.a, this.b);
  const r = p5.Vector.mult(this.c, t).add(this.d).mult(Math.PI * 2.0);
  const cr = this.s.createVector(Math.cos(r.x), Math.cos(r.y), Math.cos(r.z));
  const result = p5.Vector.mult(cr, l);
  return this.s.color(this.s.map(result.x, -1, 1, 0, 255), this.s.map(result.y, -1, 1, 0, 255), this.s.map(result.z, -1, 1, 0, 255));
}