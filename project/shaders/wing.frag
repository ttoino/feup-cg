#version 300 es

#ifdef GL_ES
precision highp float;
#endif

out vec4 oColor;

void main() {
  oColor = vec4(0.2823529, 0.149, 0.05098, 1);
}
