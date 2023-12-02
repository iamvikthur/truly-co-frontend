import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { a } from 'react-spring/three';
import { Text } from 'drei';
import * as THREE from 'three';
import { setUV } from '../../lib/three';
import { isObject } from '../../lib/utils';
import { vertexShader, fragmentShader } from './Crossroad.shaders';

const COUNT = 9;
const INDEXES = Float32Array.from(Array(COUNT).keys());
const tempObject = new THREE.Object3D();

const Crossroad = ({ items, refChange }) => {
  const mesh = useRef(null);
  const title1 = useRef(null);
  const title2 = useRef(null);
  const { gl, size, viewport, invalidate } = useThree();

  const height = useMemo(() => viewport.height / COUNT, [viewport.height]);
  const instanceAttr = useMemo(() => new THREE.InstancedBufferAttribute(INDEXES, 1), []);

  useEffect(() => {
    refChange.current = (value) => {
      if (!mesh.current || !title1.current || !title2.current) return null;
      const y = isObject(value) ? value.y : value; // react-spring 9.0.0-rc.3 bug workaround

      for (let i = 0; i < COUNT; i++) {
        tempObject.rotation.x = y * Math.PI;
        tempObject.updateMatrix();
        mesh.current.setMatrixAt(i, tempObject.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;

      // title1.current.position.setY(y - 0.3);
      title1.current.material.opacity = 1 - y;
      // title2.current.position.setY(y - 0.7);
      title2.current.material.opacity = y;

      invalidate();
    };
  }, [refChange, invalidate]);

  const materialArgs = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const uniforms = { uCount: { value: COUNT } };

    items?.forEach((item, index) => {
      if (!item.storyImage) return;
      const uvRate = new THREE.Vector2(1, 1);
      const image = loader.load(item.storyImage, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        setUV(uvRate, texture, size.width / size.height);
        invalidate();
      });
      uniforms[`uTexture${index + 1}`] = { value: image };
      uniforms[`uRate${index + 1}`] = { value: uvRate };
    });

    return { uniforms, vertexShader, fragmentShader };
  }, [items, size.width, size.height, invalidate]);

  const textArgs = useMemo(() => {
    return {
      font: 'fonts/open-sans-condensed/open-sans-condensed-v14-latin-300.woff',
      fontSize: 0.4,
      textAlign: 'center' as 'left' | 'right' | 'center' | 'justify',
      maxWidth: viewport.width - 1,
      onUpdate: invalidate,
    };
  }, [viewport.width, invalidate]);

  useEffect(() => {
    const preventOverscroll = (event) => event.preventDefault();
    gl.domElement.addEventListener('touchmove', preventOverscroll);
    return () => gl.domElement.removeEventListener('touchmove', preventOverscroll);
  }, [gl.domElement]);

  useFrame(() => {
    for (let i = 0; i < COUNT; i++) {
      tempObject.position.set(0, i * height + height / 2 - viewport.height / 2, 0);
      tempObject.updateMatrix();
      mesh.current.setMatrixAt(i, tempObject.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (!mesh.current.geometry.attributes.instance) {
      mesh.current.geometry.setAttribute('instance', instanceAttr);
    }
  });

  return (
    <>
      <a.instancedMesh ref={mesh} args={[null, null, COUNT]}>
        <planeBufferGeometry attach="geometry" args={[viewport.width, height]} />
        <shaderMaterial attach="material" args={[materialArgs]} side={THREE.DoubleSide} />
      </a.instancedMesh>

      {items.length > 1 && (
        <>
          <Text ref={title1} position={[0, 0.7, 1]} anchorY="bottom" {...textArgs}>
            {items[0].storyName}
          </Text>
          <Text ref={title2} position={[0, -0.7, 1]} anchorY="top" {...textArgs}>
            {items[1].storyName}
          </Text>
        </>
      )}
    </>
  );
};

export default Crossroad;
