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
