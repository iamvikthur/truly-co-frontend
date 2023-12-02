import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import GlobalStyles from '../components/GlobalStyles';
import Logo from '../components/Logo';
import ProfilePanel from '../components/profile/ProfilePanel';
import ProfileButton from '../components/profile/ProfileButton';
import { AboutProject } from '../components/StaticPage.styles';
import Subscribe from '../components/Subscribe';
import { BrandContext, HeaderContext, Header, ProfileContext } from '../lib/context';
import * as gtag from '../lib/gtag';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const brand = useState(null);
  const header = useState<Header>([true, true, null]);
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  useEffect(() => {
    setIsProfileOpened(!!router.query.reset || !!router.query.verify);
  }, [router.query.reset, router.query.verify]);

  useEffect(() => {
    if (router.asPath === '/password/reset' || router.asPath === '/register') {
      router.replace({ pathname: `/[[...story]]` }, `/`).then(() => setIsProfileOpened(true));
    }
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <DefaultSeo
        titleTemplate="%s — Truly Co"
        title="Truly Co"
        description="Find your oohs, your ahhs, your wows in our universe of stories"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: process.env.BASE_URL,
          site_name: 'Truly Co',
          images: [
            {
              url: `${process.env.BASE_URL}/smm.jpg`,
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      <GlobalStyles />
      <ProfileContext.Provider value={[isProfileOpened, setIsProfileOpened]}>
        <HeaderContext.Provider value={header}>
          <BrandContext.Provider value={brand}>
            <Logo />
            {router.asPath === '/' && <AboutProject />}
            <ProfileButton />
            <ProfilePanel />

            {!isProfileOpened && <Subscribe />}
            <Component {...pageProps} />
          </BrandContext.Provider>
        </HeaderContext.Provider>
      </ProfileContext.Provider>
    </>
  );
};

export default App;
