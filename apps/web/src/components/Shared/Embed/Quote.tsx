import QuotedPublication from '@components/Publication/QuotedPublication';
import type { AnyPublication } from '@lenster/lens';
import { usePublicationQuery } from '@lenster/lens';
import type { FC } from 'react';

import PublicationShimmer from '../Shimmer/PublicationShimmer';
import Wrapper from './Wrapper';

interface QuoteProps {
  publicationId: string;
}

const Quote: FC<QuoteProps> = ({ publicationId }) => {
  const { data, loading, error } = usePublicationQuery({
    variables: { request: { publicationId } }
  });

  if (loading) {
    return (
      <Wrapper zeroPadding>
        <PublicationShimmer showActions={false} quoted />
      </Wrapper>
    );
  }

  if (error || !data?.publication) {
    return null;
  }

  return (
    <Wrapper zeroPadding>
      <QuotedPublication publication={data.publication as AnyPublication} />
    </Wrapper>
  );
};

export default Quote;
