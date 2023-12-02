import React, { useRef, useEffect, useCallback } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { MapControls } from 'drei';
import { useSpring } from 'react-spring';
import * as THREE from 'three';
import { CAMERA_Z, MAX_DISTANCE, vFOV, UseThree, MIN_DISTANCE } from '.';
import { isObject } from '../../lib/utils';

const Environment = ({ setOffset, zoomCamera = [0, 0, 0], zoomedIn }) => {
  const { camera, invalidate } = useThree() as UseThree;
  const controls = useRef<MapControls>();

  /** Handle MapControls drag end */
  useEffect(() => {
    function handleDrag() {
      const hFOV = vFOV * camera.aspect;
      const x = Math.round(camera.position.x / hFOV);
      const y = Math.round(camera.position.y / vFOV);
      setOffset((offset) => (x !== offset[0] || y !== offset[1] ? [x, y] : offset));
    }
    const { current } = controls;
    current?.addEventListener('end', handleDrag);
    return () => current?.removeEventListener('end', handleDrag);
  }, [setOffset, camera.aspect, camera.position]);

  const getTarget = useCallback(
    () => (controls.current ? (controls.current.target as THREE.Vector3).toArray() : [0, 0, 0]),
    []
  );

  /** Animate camera position */
  // TODO restore when react-spring 9.0.0 is released
  // const [, set] = useSpring(() => ({
  //   from: { cameraXYZ: [0, 0, 0], targetXYZ: getTarget() },
  //   cameraXYZ: [0, 0, CAMERA_Z],
  //   targetXYZ: [0, 0, 0],
  //   onChange: ({ cameraXYZ, targetXYZ }) => {
  //     const [cx, cy, cz] = cameraXYZ;
  //     const [tx, ty, tz] = targetXYZ;
  //     camera.position.set(cx, cy, cz);
  //     camera.updateProjectionMatrix();
  //     controls.current && (controls.current.target as THREE.Vector3).set(tx, ty, tz);
  //     controls.current?.update();
  //     invalidate();
  //   },
  // }));

  // react-spring 9.0.0-rc.3 bug workaround
  // TODO remove when react-spring 9.0.0 is released
  const [, setCameraPosition] = useSpring(() => ({
    from: { cameraXYZ: [0, 0, 0] },
    cameraXYZ: [0, 0, CAMERA_Z],
    onChange: (value) => {
      const cameraXYZ = isObject(value) ? value.cameraXYZ : value;
      const [cx, cy, cz] = cameraXYZ;
      camera.position.set(cx, cy, cz);
      camera.updateProjectionMatrix();
      // invalidate();
    },
  }));

  // react-spring 9.0.0-rc.3 bug workaround
  // TODO remove when react-spring 9.0.0 is released
  const [, setTargetPosition] = useSpring(() => ({
    from: { targetXYZ: getTarget() },
    targetXYZ: [0, 0, 0],
    onChange: (value) => {
      const targetXYZ = isObject(value) ? value.targetXYZ : value;
      const [tx, ty, tz] = targetXYZ;
      controls.current && (controls.current.target as THREE.Vector3).set(tx, ty, tz);
      controls.current?.update();
      // invalidate();
    },
  }));

  /** Handle camera reset */
  useEffect(() => {
    const cx = zoomCamera[0] === null ? camera.position.x : zoomCamera[0];
    const cy = zoomCamera[1] === null ? camera.position.y : zoomCamera[1];
    const cz = zoomCamera[2];
    const tx = zoomCamera[0] === null ? getTarget()[0] : zoomCamera[0];
    const ty = zoomCamera[1] === null ? getTarget()[1] : zoomCamera[1];
    // TODO restore when react-spring 9.0.0 is released
    // set({
    //   from: { cameraXYZ: camera.position.toArray(), targetXYZ: getTarget() },
    //   cameraXYZ: [cx, cy, cz],
    //   targetXYZ: [tx, ty, 0],
    //   reset: true,
    // });

    // react-spring 9.0.0-rc.3 bug workaround
    // TODO remove when react-spring 9.0.0 is released
    setCameraPosition({
      from: { cameraXYZ: camera.position.toArray() },
      cameraXYZ: [cx, cy, cz],
      reset: true,
    });
    setTargetPosition({
      from: { targetXYZ: getTarget() },
      targetXYZ: [tx, ty, 0],
      reset: true,
    });
  }, [zoomCamera, camera, invalidate, /*set,*/ setCameraPosition, setTargetPosition, getTarget]);

  useEffect(() => {
    document.addEventListener('mousemove', invalidate);
    return () => document.removeEventListener('mousemove', invalidate);
  }, [invalidate]);

  useFrame(({ camera, mouse }) => {
    const { x, y, z } = camera.position;
    const [tx, ty] = getTarget();
    const speed = Math.pow((z * 10) / MAX_DISTANCE, 4) / 1000000;
    camera.position.x += (mouse.x - x + tx) * speed;
    camera.position.y += (mouse.y - y + ty) * speed;

    if (z <= MIN_DISTANCE && zoomedIn[0] === false) {
      zoomedIn[1](true);
    } else if (z > MIN_DISTANCE && zoomedIn[0] === true) {
      zoomedIn[1](false);
    }
  });

  return (
    <>
      <MapControls
        ref={controls}
        enableRotate={false}
        minDistance={0}
        maxDistance={MAX_DISTANCE}
        screenSpacePanning
        zoomSpeed={0.3}
        panSpeed={0.4}
      />
    </>
  );
};

export default Environment;
