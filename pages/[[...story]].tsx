import { Suspense, useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Transition, animated, config } from 'react-spring';
import { isSSR } from '../lib/fetcher';
import ErrorBoundary from '../components/ErrorBoundary';
import Story from '../components/story/Story';
import Space, { SpaceMsg } from '../components/space';
import StoryPreloader from '../components/story/StoryPreloader';
import usePrevious from '../lib/usePrevious';
import { BrandContext } from '../lib/context';
import { NextSeo } from 'next-seo';

const StoryPage = ({ data }) => {
  const router = useRouter();
  const story = router.query.story ? `${router.query.story}` : null;
  const prevStory = usePrevious(story);
  const [, refresh] = useState(null);

  const [, setBrand] = useContext(BrandContext);
  useEffect(() => void (story === null && setBrand(null)), [story, setBrand]);

  return (
    <>
      {data ? (
        <NextSeo
          title={data.storyName}
          description={`A story by ${data.authorName}`}
          openGraph={{
            title: data.storyName,
            description: `A story by ${data.authorName}`,
            url: `${process.env.BASE_URL}/${data.storySlug}`,
            type: 'article',
            article: {
              publishedTime: data.createdAt,
              modifiedTime: data.updatedAt,
              tags: data.tags,
            },
            images: [
              {
                url: `${process.env.BASE_URL}${data.storyImage}`,
                width: 512,
                height: 512,
              },
            ],
          }}
        />
      ) : (
        <NextSeo title="Truly Co" titleTemplate="%s" openGraph={{ title: 'Truly Co' }} />
      )}
      <Space />
      <main>
        <Transition
          items={[{ story }]}
          keys={(item) => item.story}
          from={() => ({ transform: `translate3d(${prevStory ? 200 : 0}%,0,0)` })}
          enter={{ transform: 'translate3d(0%,0,0)' }}
          leave={() => ({ transform: `translate3d(${story ? -200 : -9999}%,0,0)` })}
          config={config.slow}
          onProps={() => !prevStory && refresh({})}
        >
          {(styles, { story }, t) =>
            story && (
              <animated.div style={{ ...styles }}>
                {!isSSR && (
                  <ErrorBoundary fallback={<SpaceMsg>Can’t fetch story, please refresh.</SpaceMsg>}>
                    <Suspense fallback={<StoryPreloader />}>
                      {t.phase === 'mount' ? <StoryPreloader /> : <Story story={story} />}
                    </Suspense>
                  </ErrorBoundary>
                )}
              </animated.div>
            )
          }
        </Transition>
      </main>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const headers = new Headers({ Accept: 'application/json' });
  const response = query.story
    ? await fetch(`${process.env.BASE_URL}/api/stories/${query.story}`, { headers })
    : null;

  return { props: { data: response?.ok ? await response.json() : null } };
}

export default StoryPage;
