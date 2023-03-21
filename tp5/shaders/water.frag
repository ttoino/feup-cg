#version 300 es

#ifdef GL_ES
precision highp float;
#endif

in vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

out vec4 oColor;

void main() {
  vec4 color = texture(uSampler, vTextureCoord);

  oColor = color;
}
