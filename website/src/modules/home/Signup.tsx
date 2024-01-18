import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ResolidLogo from '~/assets/images/resolid-logo.svg';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';

export default function HomeSignup() {
  const { t } = useTranslation('common');

  return (
    <>
      <Helmet>
        <title>{t('signup')}</title>
      </Helmet>
      <DefaultLayout>
        <div className={'flex justify-center'}>
          <div className={'mt-10 w-96'}>
            <div className={'flex justify-center'}>
              <img width={50} alt={'Resolid Nxt'} src={ResolidLogo} />
            </div>
            <AuthSignupForm />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
