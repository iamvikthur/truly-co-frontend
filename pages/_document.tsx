import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
// import dynamic from 'next/dynamic';
import { ServerStyleSheet } from 'styled-components';
import { GA_TRACKING_ID } from '../lib/gtag';

// const DynamicComponentWithNoSSR = dynamic(() => import('@lottiefiles/lottie-player'), {
//   ssr: false,
// });

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,700;1,300&family=Open+Sans:ital,wght@0,300;0,400;1,300;1,400&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <script
            async
            src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
          ></script>
          <script async src="https://js.braintreegateway.com/web/3.6.2/js/client.js"></script>
          <script
            async
            src="https://js.braintreegateway.com/web/3.6.2/js/hosted-fields.js"
          ></script>
          <script
            async
            type="text/javascript"
            src="https://www.globalgiving.org/javascript/partner/client-donation.js"
          ></script>
          <script
            async
            src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          ></script>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          {/* <DynamicComponentWithNoSSR /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
