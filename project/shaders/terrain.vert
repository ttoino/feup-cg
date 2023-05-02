#version 300 es

in vec3 aVertexPosition;
in vec3 aVertexNormal;
in vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uHeightSampler;
uniform sampler2D uAltimetrySampler;
uniform float uScaleFactor;

out vec2 vTextureCoord;
out vec2 vAltimetryCoord;

void main() {
  vTextureCoord = aTextureCoord;

  vec4 position = vec4(aVertexPosition, 1.0);
  vec4 bump = texture(uHeightSampler, vTextureCoord);
  position.xyz += aVertexNormal * bump.r * uScaleFactor;
  vAltimetryCoord = vec2(0, bump.r);

  gl_Position = uPMatrix * uMVMatrix * position;
}
