import { NextSeo } from 'next-seo';
import Space from '../components/space';
import About from '../components/About';

const description =
  'We believe that every story is connected, and we have built our platform to highlight those connections; to demonstrate how one event could potentially have an impact on something else millions of miles or even years away.';

const AboutPage = () => (
  <>
    <NextSeo
      title="About"
      description={description}
      openGraph={{
        title: 'About',
        description: description,
        url: `${process.env.BASE_URL}/about`,
      }}
    />
    <Space />
    <About />
  </>
);

export default AboutPage;
