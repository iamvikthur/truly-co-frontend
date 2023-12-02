import React, { useState, Suspense, useCallback, useContext } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { Stars } from 'drei';
import { isSSR } from '../../lib/fetcher';
import ErrorBoundary from '../ErrorBoundary';
import SpaceData from './SpaceData';
import Environment from './Environment';
import BrandSelector from './BrandSelector';
import { Preloader } from './Preloader';
import { CAMERA_OFFSET, CAMERA_Z, MAX_DISTANCE, Overlay, SpaceMsg, Notification, ZoomOut } from '.';
import { useRouter } from 'next/router';
import ZoomInOut from './ZoomInOut';
import { clamp } from '../../lib/three';
import { ProfileContext } from '../../lib/context';

const Space = () => {
  const dpr = typeof window === 'undefined' ? 2 : Math.max(2, window.devicePixelRatio);
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [offset, setOffset] = useState([0, 0]);
  const [cameraPosition, zoomCamera] = useState<Parameters<THREE.Vector3['set']>>([0, 0, CAMERA_Z]);
  const [isProfileOpened, setIsProfileOpened] = useContext(ProfileContext);
  const isFullyZoomedIn = useState(false);

  const handleBrandChange = (b) => {
    setBrand(b);
    setOffset([0, 0]);
    zoomCamera([0, 0, CAMERA_Z]);
  };

  const handleZoomOutClick = () => {
    setOffset([0, 0]);
    zoomCamera([0, 0, CAMERA_Z]);
  };

  const handleStoryClick = useCallback(
    (position, slug) => {
      const [x, y, z] = position;
      const [cx, cy, cz] = cameraPosition;
      if (cx === x && cy === y - 0.3 && cz === z + 1.5) {
        router.push(`/[[...story]]`, `/${slug}`);
      } else {
        zoomCamera([x, y - 0.3, z + 1.5]);
      }
    },
    [cameraPosition, router]
  );

  const handleZoomClick = (zoom?: boolean) => {
    const [, , cz] = cameraPosition;
    zoomCamera([null, null, clamp(cz + (zoom ? -1 : 1), CAMERA_OFFSET, MAX_DISTANCE)]);
  };

  const [isHover, setIsHover] = useState(false);
  const handleStoryHover = useCallback((hover) => setIsHover(hover), []);

  const handleOverlayClick = () => {
    isProfileOpened ? setIsProfileOpened(false) : router.push(`/[[...story]]`, `/`);
  };

  const isRoot = router.asPath === '/';
  const isStaticPage = router.asPath === '/terms';

  return (
    <ErrorBoundary fallback={<SpaceMsg>Could not fetch stories</SpaceMsg>}>
      <Overlay
        visible={(!isRoot && !isStaticPage) || isProfileOpened}
        elevate={isProfileOpened}
        onClick={handleOverlayClick}
      />
      <Canvas
        pixelRatio={dpr}
        invalidateFrameloop
        camera={{ fov: 75, near: 1, position: cameraPosition }}
        style={{ cursor: isHover ? 'pointer' : null }}
        noEvents={!isRoot}
      >
        {!isSSR && (
          <Suspense fallback={null}>
            <SpaceData
              brand={brand}
              offset={offset}
              onStoryClick={handleStoryClick}
              onStoryHover={handleStoryHover}
            />
          </Suspense>
        )}
        <Stars depth={300} factor={15} saturation={1} fade />
        <Environment setOffset={setOffset} zoomCamera={cameraPosition} zoomedIn={isFullyZoomedIn} />
      </Canvas>
      <ZoomOut active={isFullyZoomedIn[0]} onClick={handleZoomOutClick} />
      <ZoomInOut onZoomIn={() => handleZoomClick(true)} onZoomOut={() => handleZoomClick()} />
      {!isSSR && (
        <Suspense fallback={<Preloader />}>
          <BrandSelector brand={brand} onChange={handleBrandChange} />
        </Suspense>
      )}
      <Notification>
        Welcome to the <img alt="truly co" src="/images/logo.svg" /> Trulyverse.
      </Notification>
    </ErrorBoundary>
  );
};

export default Space;
