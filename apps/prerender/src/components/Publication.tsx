import { APP_NAME, DEFAULT_OG } from '@hey/data/constants';
import type { AnyPublication, Comment } from '@hey/lens';
import getAvatar from '@hey/lib/getAvatar';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import sanitizeDStorageUrl from '@hey/lib/sanitizeDStorageUrl';
import truncateByWords from '@hey/lib/truncateByWords';
import type { FC } from 'react';
import { BASE_URL } from 'src/constants';

import DefaultTags from './Shared/DefaultTags';
import SinglePublication from './Shared/SinglePublication';
import Tags from './Shared/Tags';

interface PublicationProps {
  publication: AnyPublication;
  comments: Comment[];
}

const Publication: FC<PublicationProps> = ({ publication, comments }) => {
  if (!publication) {
    return <DefaultTags />;
  }

  const targetPublication = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;

  const { metadata } = targetPublication;
  const metadataType = metadata.__typename;
  const media =
    metadataType === 'ImageMetadataV3'
      ? metadata.asset.image.optimized?.uri
      : metadataType === 'VideoMetadataV3'
      ? metadata.asset.cover?.optimized?.uri
      : null;
  const profile = targetPublication.by;
  const title = `${targetPublication.__typename} by @${publication.by.handle} • ${APP_NAME}`;
  const description = truncateByWords(metadata?.marketplace?.description, 30);
  const image = media
    ? sanitizeDStorageUrl(media)
    : profile
    ? getAvatar(profile)
    : DEFAULT_OG;

  return (
    <>
      <Tags
        title={title}
        description={description}
        image={image}
        publishedTime={publication?.createdAt}
        cardType={media ? 'summary_large_image' : 'summary'}
        url={`${BASE_URL}/posts/${publication.id}`}
      />
      <header>
        <SinglePublication publication={publication} h1Content />
      </header>
      <div data-testid="comment-feed">
        {comments?.map((comment) => {
          const { id } = comment;
          return (
            <div key={id}>
              <SinglePublication publication={comment} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Publication;
