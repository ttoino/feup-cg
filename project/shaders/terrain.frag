#version 300 es

#ifdef GL_ES
precision highp float;
#endif

in vec2 vTextureCoord;
in vec2 vAltimetryCoord;

uniform sampler2D uSampler;
uniform sampler2D uHeightSampler;
uniform sampler2D uAltimetrySampler;

out vec4 oColor;

void main() {
  vec4 color = texture(uSampler, vTextureCoord);
  vec4 altimetry = texture(uAltimetrySampler, -vAltimetryCoord);

  oColor = color * .7 + altimetry * .3;
}
