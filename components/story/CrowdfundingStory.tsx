import { useState } from 'react';
import { NextSeo } from 'next-seo';
import useSWR from 'swr';
import ChapterHeader from './ChapterHeader';
import { ButtonSupport, CrowdfundingStorySection } from './CrowdfundingStory.styles';
import TextChapterContent from './TextChapterContent';
import TextChapterCover from './TextChapterCover';
import CrowdfundingSupport from './CrowdfundingSupport';
import useConfig from '../../lib/useConfig';
import { fetcher } from '../../lib/fetcher';

const CrowdfundingStory = ({ data }) => {
  const config = useConfig();
  const {
    data: gg,
  } = useSWR(
    `https://api.globalgiving.org/api/public/projectservice/projects/${data.fundingProjectId}?api_key=${config.globalgiving_api_key}`,
    fetcher,
    { suspense: true }
  );
  const [supportIsOpened, setSupportIsOpened] = useState(false);

  const handleCloseSupport = () => {
    setSupportIsOpened(false);
  };

  return (
    <>
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

      <ChapterHeader
        brand={data.brandSlug}
        crowdfunding={gg.project}
        crowdfundingSupportIsOpened={supportIsOpened}
        onCloseCrowdfundingSupport={handleCloseSupport}
      />
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <CrowdfundingStorySection>
          <TextChapterCover
            bgColor={data.chapters[0]?.bgColor}
            bgImage={data.chapters[0]?.image}
            embed={data.chapters[0]?.embed}
            epigraph={data.chapters[0]?.epigraph}
            textColor={data.chapters[0]?.textColor}
            title={data.chapters[0]?.title}
          />

          <TextChapterContent brand={data.brand} content={data.chapters[0]?.htmlContent} />
        </CrowdfundingStorySection>

        <CrowdfundingSupport
          isOpened={supportIsOpened}
          project={gg.project}
          onCloseSupport={handleCloseSupport}
        />
        <ButtonSupport onClick={() => setSupportIsOpened(true)}>Support</ButtonSupport>
      </div>
    </>
  );
};

export default CrowdfundingStory;
