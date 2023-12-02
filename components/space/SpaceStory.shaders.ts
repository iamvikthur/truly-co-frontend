export const vertexShader = `
uniform vec2 uRate;

varying vec2 vUV;
varying vec2 vUVimage;

void main() {
  vUV = uv;

  vUVimage = uv - 0.5;
  vUVimage *= uRate.xy;
  vUVimage += 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const fragmentShader = `
uniform sampler2D uImage;
uniform sampler2D uAlpha;

varying vec2 vUV;
varying vec2 vUVimage;

void main() {
  vec4 image = texture2D(uImage, vUVimage);
  vec4 alpha = texture2D(uAlpha, vUV);
  gl_FragColor = vec4(image.rgb, alpha.a);
}
`;
