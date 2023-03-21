#version 300 es

in vec3 aVertexPosition;
in vec3 aVertexNormal;
in vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

out vec2 vTextureCoord;

void main() {
  vTextureCoord = aTextureCoord + vec2(2, 1) * timeFactor * .01;

  vec4 position = vec4(aVertexPosition, 1.0);
  vec4 bump = texture(uSampler2, vTextureCoord);
  position.xyz += aVertexNormal * bump.r * .05;

  gl_Position = uPMatrix * uMVMatrix * position;
}
