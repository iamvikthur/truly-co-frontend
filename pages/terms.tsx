import { NextSeo } from 'next-seo';
import Space from '../components/space';
import Terms from '../components/Terms';

const description =
  'Truly Co. is a digital media (storytelling) company, telling compelling human-centred stories across a range of issues, ideas and histories, in a bid to create social awareness and policy impact.';

const TermsPage = () => (
  <>
    <NextSeo
      title="Terms of Use"
      description={description}
      openGraph={{
        title: 'Terms of Use',
        description: description,
        url: `${process.env.BASE_URL}/terms`,
      }}
    />
    <Space />
    <Terms />
  </>
);

export default TermsPage;
