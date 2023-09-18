import type { Publication } from '@lenster/lens';
import getAppName from '@lenster/lib/getAppName';
import { formatDate, formatTime } from '@lib/formatTime';
import { type FC, useEffect, useRef } from 'react';

import PublicationActions from './Actions';
import FeaturedChannel from './FeaturedChannel';
import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationStats from './PublicationStats';
import PublicationType from './Type';

interface FullPublicationProps {
  publication: Publication;
}

const FullPublication: FC<FullPublicationProps> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const timestamp = isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  // Count check to show the publication stats only if the publication has a comment, like or collect
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const reactionCount = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const collectCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;
  const showStats = mirrorCount > 0 || reactionCount > 0 || collectCount > 0;
  const publicationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (publicationRef?.current) {
      publicationRef.current.style.scrollMargin = '4.2rem';
      publicationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <article className="p-5" data-testid={`publication-${publication.id}`}>
      <PublicationType publication={publication} showType />
      <div ref={publicationRef}>
        <PublicationHeader publication={publication} />
        <div className="ml-[53px]">
          {publication?.hidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody publication={publication} />
              <div className="flex items-center gap-x-3">
                <div className="lt-text-gray-500 my-3 text-sm">
                  <span title={formatTime(timestamp)}>
                    {formatDate(new Date(timestamp), 'hh:mm A · MMM D, YYYY')}
                  </span>
                  {publication?.appId ? (
                    <span> · Posted via {getAppName(publication.appId)}</span>
                  ) : null}
                </div>
                <FeaturedChannel tags={publication.metadata.tags} />
              </div>
              {showStats ? (
                <>
                  <div className="divider" />
                  <PublicationStats publication={publication} />
                </>
              ) : null}
              <div className="divider" />
              <PublicationActions publication={publication} showCount />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default FullPublication;
