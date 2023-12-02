import Link from 'next/link';
import { useRouter } from 'next/router';
import { Page, Heading, Footer } from './ErrorPage.styles';

const ErrorPage = ({ onClick = undefined }) => {
  const router = useRouter();

  const handleClick = () => router.push('/[[...story]]', '/').then(onClick);

  return (
    <Page onClick={handleClick}>
      <Heading>
        Once upon a time, there was an error called 404, a page that doesn’t exist.
        <br />
        <br />
        <Link href="/">
          <a>Go home</a>
        </Link>
      </Heading>
      <Footer>
        <a href="https://www.instagram.com/bytrulyco/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://www.twitter.com/bytrulyco/" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </Footer>
    </Page>
  );
};

export default ErrorPage;
