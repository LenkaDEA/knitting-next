'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-explicit-any*/
declare global {
  interface Window {
    ym: (id: number, method: string, ...args: any[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID);

  useEffect(() => {
    if (!YM_ID) return;
    const url = window.location.href;

    if (typeof window.ym === 'function') {
      window.ym(YM_ID, 'hit', url);
    }
  }, [pathname, searchParams, YM_ID]);

  if (!YM_ID) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}', 'ym');

        ym(${YM_ID}, 'init', {
            defer: true,
            ssr:true, 
            webvisor:true, 
            clickmap:true, 
            ecommerce:"dataLayer", 
            referrer: document.referrer, 
            url: location.href, 
            accurateTrackBounce:true, 
            trackLinks:true});
      `}
    </Script>
  );
}
