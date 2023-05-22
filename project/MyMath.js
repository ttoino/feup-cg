/**
 * @param {number} a 
 * @param {number} b 
 * @param {number} t 
 * @returns {number}
 */
export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 * @param {number} d 
 * @param {number} t 
 * @param {number} s 
 * @returns {number}
 */
export const lerp2 = (a, b, c, d, t, s) =>
    lerp(lerp(a, b, t), lerp(c, d, t), s);

/**
 * @param {[number, number, number]} pos1
 * @param {[number, number, number]} pos2
 */
export const dist = ([x1, y1, z1], [x2, y2, z2]) => {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y1)*(y1-y1) + (z1-z2)*(z1-z2));
}