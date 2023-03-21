#version 300 es

#ifdef GL_ES
precision highp float;
#endif

in float vVertexYPosition;

out vec4 color;

void main() {
	if (vVertexYPosition > 0.5) {
		color = vec4(1, 1, 0, 1);
	} else {
		color = vec4(0, 0, 1, 1);
	}
}


