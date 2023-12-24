import React, { useRef, useMemo } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './SpaceStory.shaders';
import { Text } from 'drei';
import { setUV } from '../../lib/three';
import useMobile from '../../lib/useMobile';

const pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

interface SpaceStory {
  position: [number, number, number];
  story: any;
  onClick: (position: [number, number, number], slug: string) => void;
  onHover: (hover: boolean) => void;
}

const SpaceStory = ({ position = [0, 0, 0], story, onClick, onHover }: SpaceStory) => {
  const mesh = useRef(null);
  const title = useRef(null);
  const discussions = useRef(null);
  const { invalidate } = useThree();
  const [x, y, z] = position;
  const touch = useRef([0, 0]);
  const isMobile = useMobile();

  const args = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const uvRate = new THREE.Vector2(1, 1);
    loader.crossOrigin = 'anonymous';
    const image = loader.load(story.storyImage, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      setUV(uvRate, texture);
      invalidate();
    });
    const alpha = loader.load(
      `/alpha/${story.brandSlug === 'originals' ? 'original' : story.brandSlug}.svg`,
      invalidate
    );

    return {
      uniforms: {
        uImage: { value: image },
        uAlpha: { value: alpha },
        uRate: { value: uvRate },
      },
      vertexShader,
      fragmentShader,
    };
  }, [invalidate, story.storyImage, story.brandSlug]);

  const textArgs = useMemo(() => {
    return {
      font: 'fonts/open-sans-condensed/open-sans-condensed-v14-latin-300.woff',
      textAlign: 'center' as 'left' | 'right' | 'center' | 'justify',
      maxWidth: 1,
      anchorY: 0,
      onUpdate: invalidate,
    };
  }, [invalidate]);

  const handleStoryClick = (e) => {
    const [x, y] = touch.current;
    if ((x === e.pageX && y === e.pageY) || !isMobile) {
      e.stopPropagation();
      onClick(position, story.storySlug);
    }
    touch.current = [e.pageX, e.pageY];
  };

  const handleStoryContextClick = (e) => {
    e.stopPropagation();
    window.open(`${window.location.origin}/${story.storySlug}`, '_blank');
  };

  useFrame(({ camera }) => {
    const distance = camera.position.z - z;
    const opacity = distance > 10 ? 0 : distance > 5 ? Math.abs(distance - 10) / (10 - 5) : 1;
    title.current.material.opacity = opacity;
    discussions.current.material.opacity = opacity;
    discussions.current.position.setY(y - 0.6 - title.current.textRenderInfo?.totalBounds[2] || 0);
  });

  return (
    <>
      <mesh
        ref={mesh}
        position={position}
        onPointerUp={handleStoryClick}
        onPointerDown={(e) => (touch.current = [e.pageX, e.pageY])}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        onContextMenu={handleStoryContextClick}
      >
        <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <shaderMaterial attach="material" args={[args]} transparent depthTest={false} />
      </mesh>
      <Text ref={title} position={[x, y - 0.6, z]} fontSize={0.1} {...textArgs}>
        {`${story.storyName}`}
      </Text>
      <Text
        ref={discussions}
        position={[x, y - 1, z]}
        fontSize={0.06}
        visible={story.activeDiscussionsCount > 0}
        {...textArgs}
      >
        {pluralize(story.activeDiscussionsCount, 'discussion')}
      </Text>
    </>
  );
};

export default SpaceStory;
