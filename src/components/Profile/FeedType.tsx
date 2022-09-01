import { ProfileStats } from '@generated/types';
import { ChatBubbleLeftRightIcon, FilmIcon, PencilSquareIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Mixpanel } from '@lib/mixpanel';
import nFormatter from '@lib/nFormatter';
import clsx from 'clsx';
import React, { Dispatch, FC, ReactNode } from 'react';

interface Props {
  stats: ProfileStats;
  setFeedType: Dispatch<string>;
  feedType: string;
}

const FeedType: FC<Props> = ({ stats, setFeedType, feedType }) => {
  interface FeedLinkProps {
    name: string;
    icon: ReactNode;
    type: string;
    count?: number;
  }

  const FeedLink: FC<FeedLinkProps> = ({ name, icon, type, count = 0 }) => (
    <button
      type="button"
      onClick={() => {
        setFeedType(type);
        Mixpanel.track(`Switch to ${type.toLowerCase()} tab in profile`);
      }}
      className={clsx(
        {
          'text-brand bg-brand-100 dark:bg-opacity-20 bg-opacity-100 font-bold': feedType === type
        },
        'flex items-center space-x-2 rounded-lg px-4 sm:px-3 py-2 sm:py-1 text-brand hover:bg-brand-100 dark:hover:bg-opacity-20 hover:bg-opacity-100'
      )}
      aria-label={name}
    >
      {icon}
      <div className="hidden sm:block">{name}</div>
      {count ? (
        <div className="px-2 text-xs font-medium rounded-full bg-brand-200 dark:bg-brand-800">
          {nFormatter(count)}
        </div>
      ) : null}
    </button>
  );

  return (
    <div className="flex overflow-x-auto gap-3 px-5 pb-2 mt-3 sm:px-0 sm:mt-0 md:pb-0">
      <FeedLink
        name="Feed"
        icon={<PencilSquareIcon className="w-4 h-4" />}
        type="FEED"
        count={stats?.totalPosts + stats?.totalMirrors}
      />
      <FeedLink
        name="Replies"
        icon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
        type="REPLIES"
        count={stats?.totalComments}
      />
      <FeedLink name="Media" icon={<FilmIcon className="w-4 h-4" />} type="MEDIA" />
      <FeedLink name="NFTs" icon={<PhotoIcon className="w-4 h-4" />} type="NFT" />
    </div>
  );
};

export default FeedType;
