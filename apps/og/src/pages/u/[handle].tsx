import type { GetServerSidePropsContext, NextPage } from 'next';

import SEO from '@components/SEO';

export const config = {
  unstable_runtimeJS: false
};

const UserProfile: NextPage<{ HANDLE: string }> = ({ HANDLE }) => {
  return <SEO image={`/api/u/${HANDLE}`} />;
};

export default UserProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const HANDLE = context.params?.handle;
  return {
    props: {
      HANDLE
    }
  };
}
