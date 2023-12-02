export const vertexShader = `
uniform vec2 uRate1;
uniform vec2 uRate2;
uniform float uCount;

attribute float instance;

varying vec2 vUV1;
varying vec2 vUV2;

void main() {
  vec4 mvPosition = vec4( position, 1.0 );
  #ifdef USE_INSTANCING
    mvPosition = instanceMatrix * mvPosition;
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * mvPosition;

  vUV1 = uv - 0.5;
  vUV1 *= uRate1.xy;
  vUV1 += 0.5;
  vUV1.y = vUV1.y / uCount + instance / uCount;

  vUV2 = uv - 0.5;
  vUV2 *= uRate2.xy;
  vUV2 += 0.5;
  vUV2.y = 1.0 - vUV2.y;
  vUV2.y = vUV2.y / uCount + instance / uCount;
}
`;

export const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec2 vUV1;
varying vec2 vUV2;

void main() {
  vec4 texture1 = texture2D(uTexture1, vUV1);
  vec4 texture2 = texture2D(uTexture2, vUV2);
  gl_FragColor = gl_FrontFacing ? texture1 : texture2;
}
`;
