import MetaTags from '@components/Common/MetaTags';
import NewPost from '@components/Composer/Post/New';
import {
  APP_NAME,
  IS_MAINNET,
  STATIC_IMAGES_URL
} from '@lenster/data/constants';
import { PAGEVIEW } from '@lenster/data/tracking';
import type { Profile } from '@lenster/lens';
import { useProfileQuery } from '@lenster/lens';
import formatHandle from '@lenster/lib/formatHandle';
import { GridItemEight, GridItemFour, GridLayout, Modal } from '@lenster/ui';
import { Leafwatch } from '@lib/leafwatch';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ProfileFeedType } from 'src/enums';
import Custom404 from 'src/pages/404';
import Custom500 from 'src/pages/500';
import { useAppStore } from 'src/store/app';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import Achievements from './Achievements';
import Cover from './Cover';
import Details from './Details';
import Feed from './Feed';
import FeedType from './FeedType';
import FollowDialog from './FollowDialog';
import NftGallery from './NftGallery';
import ProfilePageShimmer from './Shimmer';

const ViewProfile: NextPage = () => {
  const {
    query: { username, type, followIntent }
  } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const lowerCaseProfileFeedType = [
    ProfileFeedType.Feed.toLowerCase(),
    ProfileFeedType.Replies.toLowerCase(),
    ProfileFeedType.Media.toLowerCase(),
    ProfileFeedType.Collects.toLowerCase(),
    ProfileFeedType.Gallery.toLowerCase(),
    ProfileFeedType.Stats.toLowerCase()
  ];
  const [feedType, setFeedType] = useState(
    type && lowerCaseProfileFeedType.includes(type as string)
      ? type.toString().toUpperCase()
      : ProfileFeedType.Feed
  );

  useEffectOnce(() => {
    Leafwatch.track(PAGEVIEW, { page: 'profile' });
  });

  const handle = formatHandle(username as string, true);
  const { data, loading, error } = useProfileQuery({
    variables: { request: { handle }, who: currentProfile?.id ?? null },
    skip: !handle
  });

  const profile = data?.profile;
  const [following, setFollowing] = useState<boolean | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const isFollowedByMe =
    Boolean(currentProfile) && Boolean(profile?.isFollowedByMe);

  const followType = profile?.followModule?.__typename;
  const initState = following === null;
  // profile is not defined until the second render
  if (initState && profile) {
    const canFollow =
      followType !== 'RevertFollowModuleSettings' && !isFollowedByMe;
    if (followIntent && canFollow) {
      setShowFollowModal(true);
    }
    setFollowing(isFollowedByMe);
  }

  // Profile changes when user selects a new profile from search box
  useUpdateEffect(() => {
    if (profile) {
      setFollowing(null);
    }
  }, [profile]);

  useUpdateEffect(() => {
    if (following) {
      setShowFollowModal(false);
    }
  }, [following]);

  if (loading || !data) {
    return <ProfilePageShimmer />;
  }

  if (!data?.profile) {
    return <Custom404 />;
  }

  if (error) {
    return <Custom500 />;
  }

  return (
    <>
      <Modal show={showFollowModal} onClose={() => setShowFollowModal(false)}>
        <FollowDialog
          profile={profile as Profile}
          setFollowing={setFollowing}
          setShowFollowModal={setShowFollowModal}
        />
      </Modal>
      {profile?.name ? (
        <MetaTags
          title={`${profile?.name} (@${formatHandle(
            profile?.handle
          )}) • ${APP_NAME}`}
        />
      ) : (
        <MetaTags title={`@${formatHandle(profile?.handle)} • ${APP_NAME}`} />
      )}
      <Cover
        cover={
          profile?.coverPicture?.__typename === 'MediaSet'
            ? profile?.coverPicture?.original?.url
            : `${STATIC_IMAGES_URL}/patterns/2.svg`
        }
      />
      <GridLayout className="pt-6">
        <GridItemFour>
          <Details
            profile={profile as Profile}
            following={Boolean(following)}
            setFollowing={setFollowing}
          />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType} />
          {currentProfile?.id === profile?.id ? <NewPost /> : null}
          {feedType === ProfileFeedType.Feed ||
          feedType === ProfileFeedType.Replies ||
          feedType === ProfileFeedType.Media ||
          feedType === ProfileFeedType.Collects ? (
            <Feed profile={profile as Profile} type={feedType} />
          ) : null}
          {feedType === ProfileFeedType.Gallery ? (
            <NftGallery profile={profile as Profile} />
          ) : null}
          {feedType === ProfileFeedType.Stats && IS_MAINNET ? (
            <Achievements profile={profile as Profile} />
          ) : null}
        </GridItemEight>
      </GridLayout>
    </>
  );
};

export default ViewProfile;
