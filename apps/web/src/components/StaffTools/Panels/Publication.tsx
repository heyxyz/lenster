import {
  HashtagIcon,
  RectangleStackIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import type { AnyPublication } from '@lenster/lens';
import { Card } from '@lenster/ui';
import { t, Trans } from '@lingui/macro';
import type { FC } from 'react';

import MetaDetails from './MetaDetails';

interface PublicationStaffToolProps {
  publication: AnyPublication;
}

const PublicationStaffTool: FC<PublicationStaffToolProps> = ({
  publication
}) => {
  const isComment = publication.__typename === 'Comment';

  return (
    <Card
      as="aside"
      className="mt-5 border-yellow-400 !bg-yellow-300/20 p-5"
      forceRounded
    >
      <div className="flex items-center space-x-2 text-yellow-600">
        <ShieldCheckIcon className="h-5 w-5" />
        <div className="text-lg font-bold">
          <Trans>Staff tool</Trans>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <MetaDetails
          icon={<HashtagIcon className="lt-text-gray-500 h-4 w-4" />}
          value={publication?.id}
          title={t`Publication ID`}
        >
          {publication?.id}
        </MetaDetails>
        {isComment ? (
          <MetaDetails
            icon={<HashtagIcon className="lt-text-gray-500 h-4 w-4" />}
            value={publication?.commentOn?.id}
            title={t`Comment on`}
          >
            {publication?.commentOn?.id}
          </MetaDetails>
        ) : null}
        {publication?.collectModule?.type ? (
          <MetaDetails
            icon={<RectangleStackIcon className="lt-text-gray-500 h-4 w-4" />}
            value={publication?.collectModule?.type}
            title={t`Collect module`}
          >
            {publication?.collectModule?.type}
          </MetaDetails>
        ) : null}
        {publication?.metadata.tags.length > 0 ? (
          <MetaDetails
            icon={<TagIcon className="lt-text-gray-500 h-4 w-4" />}
            value={JSON.stringify(publication?.metadata?.tags)}
            title={t`Tags`}
            noFlex
          >
            {publication?.metadata?.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </MetaDetails>
        ) : null}
      </div>
    </Card>
  );
};

export default PublicationStaffTool;
