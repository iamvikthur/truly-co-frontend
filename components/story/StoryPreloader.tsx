import { useRouter } from 'next/router';
import { Main, Header, Title, Text } from './StoryPreloader.styles';

const StoryPreloader = () => {
  const router = useRouter();
  const { story } = router.query;

  return !story ? null : (
    <Main>
      <Header />
      <Title />
      <Text />
    </Main>
  );
};

export default StoryPreloader;
