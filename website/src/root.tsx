import { server$ } from '@resolid/nxt-run/server';
import { ColorModeScript, NxtProvider } from '@resolid/nxt-ui';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';
import { AuthProvider } from '~/common/components/AuthProvider';
import { LazyLoader } from '~/common/components/LazyLoader';
import { getSession } from '~/foundation/session';

export const loader = server$(async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return { user: session.has('id') ? session.data : null };
});

export default function Root() {
  const { t } = useTranslation();

  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ['zod'] } }));

  return (
    <>
      <ColorModeScript />
      <Helmet prioritizeSeoTags defaultTitle={'Resolid Nxt'} titleTemplate={'%s - Resolid Nxt'}>
        <meta name="description" content="Get your app up and running with React" />
      </Helmet>
      <NxtProvider>
        <AuthProvider>
          <Suspense fallback={<LazyLoader />}>
            <Outlet />
          </Suspense>
        </AuthProvider>
      </NxtProvider>
      <ScrollRestoration />
    </>
  );
}
