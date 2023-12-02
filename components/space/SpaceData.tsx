import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { useThree } from 'react-three-fiber';
import { fetcher } from '../../lib/fetcher';
import { LIMIT, vFOV, UseThree } from '.';
import SpaceStory from './SpaceStory';
import Lines from './Lines';
import usePrevious from '../../lib/usePrevious';
import useUser from '../../lib/useUser';

const SpaceData = ({ brand, offset, onStoryClick, onStoryHover }) => {
  const { camera } = useThree() as UseThree;
  const hFOV = useMemo(() => vFOV * camera.aspect, [camera.aspect]);

  const { user } = useUser();
  const key = (i: number) =>
    `/api/stories?${brand ? `brand=${brand}&` : ``}offset=${i * LIMIT}&limit=${LIMIT}`;
  const config = { suspense: true };
  const { data, size, setSize } = useSWRInfinite(key, fetcher, config);
  const stories = useMemo(() => (data ? [].concat(...data) : []), [data]);
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < LIMIT);

  const getStoredOffsets = () => {
    const storedOffsets = sessionStorage.getItem(`offsets`);
    const parsedOffsets = storedOffsets ? JSON.parse(storedOffsets) : [];
    return Array.isArray(parsedOffsets) ? parsedOffsets : [];
  };

  /** Save new offset as used and load more stories */
  const usedOffsets = useRef([]);
  useEffect(() => {
    usedOffsets.current = getStoredOffsets().slice(0, size);
    const isInitial = !usedOffsets.current.length;
    const isUsed = usedOffsets.current.some((o) => o[0] === offset[0] && o[1] === offset[1]);

    if (isInitial || (!isUsed && !isReachingEnd)) {
      usedOffsets.current.push(offset);
      !isInitial && setSize((size) => size + 1);
    }
    sessionStorage.setItem(`offsets`, JSON.stringify(usedOffsets.current));
  }, [offset, size, isReachingEnd, setSize]);

  /** Calculate stories positions */
  const prevBrand = usePrevious(brand);
  const [positions, setPositions] = useState({});
  useEffect(() => {
    const isNewBrand = brand !== prevBrand;
    const pos = {};
    usedOffsets.current.forEach((offset, i) => {
      if (data[i]) {
        data[i]
          .sort((a, b) => b.activeDiscussionsCount - a.activeDiscussionsCount)
          .forEach((story, index) => {
            const isExists = Object.prototype.hasOwnProperty.call(positions, story.storySlug);
            if (isNewBrand || !isExists) {
              pos[story.storySlug] = [
                Math.random() * hFOV + hFOV * offset[0] - hFOV / 2,
                Math.random() * vFOV + vFOV * offset[1] - vFOV / 2,
                LIMIT - (index % LIMIT),
              ];
            }
          });
      }
    });
    if (Object.keys(pos).length) {
      setPositions((p) => (isNewBrand ? pos : { ...p, ...pos }));
    }
  }, [offset, brand, prevBrand, data, hFOV, positions]);

  const isAdmin = useMemo(() => user?.role === 'Admin' || user?.role === 'Super admin', [
    user?.role,
  ]);

  const positionsLength = Object.keys(positions).length;

  return (
    <>
      <group renderOrder={1}>
        {stories.map(
          (story, k) =>
            k < positionsLength &&
            story.type.toLowerCase() !== 'crowdfunding' &&
            (isAdmin ? true : story.status === 'published') && (
              <SpaceStory
                key={k}
                position={positions[story.storySlug]}
                story={story}
                onClick={onStoryClick}
                onHover={onStoryHover}
              />
            )
        )}
      </group>
      <Lines stories={stories} positions={positions} isAdmin={isAdmin} />
    </>
  );
};

export default SpaceData;
