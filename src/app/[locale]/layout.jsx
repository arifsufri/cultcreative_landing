import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { GoogleTagManager } from "@next/third-parties/google";

// export const metadata = {
//   metadataBase: new URL("https://www.cultcreativeasia.com"),
//   title: {
//     // Apparently, using a hyphen instead of a pipe as a separator improves SEO:
//     // https://www.semrush.com/blog/case-study-should-you-add-pipes-or-dashes-to-your-title-ag-/
//     // template: "%s - Cult Creative",
//     default: "Cult Creative",
//   },
// };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LocaleLayout = async ({ children, params }) => {
  // Await params as it's now a Promise in Next.js 15
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "n43cc9a95y");
        `,
        }}
      />
      <Script
        id="tiktok"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){
                t[e]=function(){
                  t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                }
              };
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){
                for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
                return e
              };
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",
                o=n&&n.partner;
                ttq._i=ttq._i||{};
                ttq._i[e]=[];
                ttq._i[e]._u=r;
                ttq._t=ttq._t||{};
                ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};
                ttq._o[e]=n||{};
                n=document.createElement("script");
                n.type="text/javascript";
                n.async=!0;
                n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e)
              };

              ttq.load('D2MLFNJC77U9PLHERQK0');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />
      <Script
        id="meta-pixel-direct"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1139430254837126');
            fbq('track', 'PageView');
          `,
        }}
      />

      <GoogleTagManager gtmId="GTM-M4L62GBP" />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1139430254837126&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      <GoogleAnalytics gaId="G-NP1X4Y7S7R" />
    </>
  );
};

export default LocaleLayout;
