import * as THREE from 'three';

global.THREE = global.THREE || THREE;

export const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export const setUV = (uv: THREE.Vector2, texture: THREE.Texture, ratio = 1 / 1) => {
  const imgRatio = texture.image.width / texture.image.height;
  const u = ratio > imgRatio ? 1 : ratio / imgRatio;
  const v = ratio > imgRatio ? imgRatio / ratio : 1;
  uv.set(u, v);
};
