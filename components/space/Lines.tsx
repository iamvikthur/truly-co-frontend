import { useMemo } from 'react';
import { Line } from 'drei';
import { useThree } from 'react-three-fiber';
import { StoryInfo } from '../../lib/models';

const isEqual = (arr1, arr2) => arr1.every((v, i) => v === arr2[i]);
const isArrayHasTheSameItem = (arr, item) =>
  arr.some(
    (i) =>
      (isEqual(i[0], item[0]) && isEqual(i[1], item[1])) ||
      (isEqual(i[0], item[1]) && isEqual(i[1], item[0]))
  );

const Lines = ({ stories, positions, isAdmin }) => {
  const { size } = useThree();
  const lineWidth = size.width < 768 ? 0.8 : 0.4;

  /** Calculate solid lines positions */
  const lines = useMemo(() => {
    const lines = [];
    const pos = positions;
    const isAvailable = (story) => (isAdmin ? true : story.status === 'published');

    stories.forEach((story: StoryInfo) => {
      isAvailable(story) &&
        story.type.toLowerCase() !== 'crowdfunding' &&
        story.linkedStories.forEach((slug) => {
          const linkedStory = stories.find((s) => isAvailable(s) && s.storySlug === slug);
          if (
            linkedStory &&
            linkedStory.type.toLowerCase() !== 'crowdfunding' &&
            pos[story.storySlug] &&
            pos[slug]
          ) {
            const line = [pos[story.storySlug], pos[slug]];
            if (!isArrayHasTheSameItem(lines, line)) {
              lines.push(line);
            }
          }
        });
    });
    return lines;
  }, [stories, positions, isAdmin]);

  /** Calculate transparent lines positions */
  const transparentLines = useMemo(() => {
    const solidLines = [];
    const dashedLines = [];
    const pos = positions;
    stories.forEach((s1: StoryInfo, i) => {
      stories.forEach((s2: StoryInfo, j) => {
        if (
          i == j ||
          s1.type.toLowerCase() === 'crowdfunding' ||
          s2.type.toLowerCase() === 'crowdfunding' ||
          (!isAdmin && (s1.status !== 'published' || s2.status !== 'published'))
        )
          return;

        const sameAuthor = s1.authorName === s2.authorName;
        const sameTag = s1.tags.some((tag) => s2.tags.includes(tag));

        if (pos[s1.storySlug] && pos[s2.storySlug]) {
          const line = [pos[s1.storySlug], pos[s2.storySlug]];
          if (!isArrayHasTheSameItem(lines, line)) {
            if (sameAuthor && sameTag) {
              if (!isArrayHasTheSameItem(solidLines, line)) solidLines.push(line);
            } else if (sameAuthor || sameTag) {
              if (!isArrayHasTheSameItem(dashedLines, line)) dashedLines.push(line);
            }
          }
        }
      });
    });
    return [solidLines, dashedLines];
  }, [stories, positions, lines, isAdmin]);

  return (
    <group>
      {lines.map((points, key) => (
        <Line key={key} points={points} color="white" linewidth={lineWidth} />
      ))}
      {transparentLines.map((l, i) =>
        l.map((points, key) => (
          <Line
            key={key}
            points={points}
            color="white"
            transparent
            opacity={0.1}
            linewidth={lineWidth}
            defines={i ? { USE_DASH: '' } : {}}
            dashed={!!i}
            dashScale={10}
            dashSize={1}
            gapSize={1}
          />
        ))
      )}
    </group>
  );
};

export default Lines;
