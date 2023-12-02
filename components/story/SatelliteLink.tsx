import Link from 'next/link';
import { SatelliteContainer, SatelliteImage } from './SatelliteLink.styles';
import { StoryChapter } from '../../lib/models';

const SatelliteLink = ({ brand, chapter }: { brand: string; chapter: StoryChapter }) => {
  return (
    <SatelliteContainer brand={brand} color={chapter.type === 'video' ? '#fff' : '#000'}>
      <Link href={`/[[...story]]`} as={`/${chapter.satelliteSlug}`}>
        <a>
          {chapter.satelliteImage && (
            <SatelliteImage
              alt={chapter.satelliteTitle}
              brand={chapter.satelliteBrandSlug}
              src={chapter.satelliteImage}
            />
          )}
          <p>
            Change the Story
            <br />
            <b>{chapter.satelliteTitle}</b>
          </p>
        </a>
      </Link>
    </SatelliteContainer>
  );
};

export default SatelliteLink;
