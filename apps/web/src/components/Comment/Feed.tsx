import QueuedPublication from '@components/Publication/QueuedPublication';
import SinglePublication from '@components/Publication/SinglePublication';
import PublicationsShimmer from '@components/Shared/Shimmer/PublicationsShimmer';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import type { AnyPublication, Comment, PublicationsRequest } from '@hey/lens';
import { CustomFiltersType, LimitType, usePublicationsQuery } from '@hey/lens';
import { Card, EmptyState, ErrorMessage } from '@hey/ui';
import { t } from '@lingui/macro';
import type { FC } from 'react';
import { useInView } from 'react-cool-inview';
import { OptmisticPublicationType } from 'src/enums';
import { useTransactionPersistStore } from 'src/store/transaction';

interface FeedProps {
  publication?: AnyPublication;
}

const Feed: FC<FeedProps> = ({ publication }) => {
  const publicationId =
    publication?.__typename === 'Mirror'
      ? publication?.mirrorOn?.id
      : publication?.id;
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);

  // Variables
  const request: PublicationsRequest = {
    where: {
      commentOn: { id: publicationId },
      customFilters: [CustomFiltersType.Gardeners]
    },
    limit: LimitType.TwentyFive
  };

  const { data, loading, error, fetchMore } = usePublicationsQuery({
    variables: { request },
    skip: !publicationId
  });

  const comments = data?.publications?.items ?? [];
  const pageInfo = data?.publications?.pageInfo;
  const hasMore = pageInfo?.next;

  const queuedCount = txnQueue.filter(
    (o) => o.type === OptmisticPublicationType.NewComment
  ).length;
  const hiddenCount = comments.filter(
    (o) => o?.__typename === 'Comment' && o.isHidden
  ).length;
  const hiddenRemovedComments = comments?.length - hiddenCount;
  const totalComments = hiddenRemovedComments + queuedCount;

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (!inView || !hasMore) {
        return;
      }

      await fetchMore({
        variables: { request: { ...request, cursor: pageInfo?.next } }
      });
    }
  });

  if (loading) {
    return <PublicationsShimmer />;
  }

  if (error) {
    return (
      <ErrorMessage title={t`Failed to load comment feed`} error={error} />
    );
  }

  if (!publication?.isHidden && totalComments === 0) {
    return (
      <EmptyState
        message={t`Be the first one to comment!`}
        icon={<ChatBubbleLeftRightIcon className="text-brand h-8 w-8" />}
      />
    );
  }

  return (
    <Card
      className="divide-y-[1px] dark:divide-gray-700"
      dataTestId="comments-feed"
    >
      {txnQueue.map(
        (txn) =>
          txn?.type === OptmisticPublicationType.NewComment &&
          txn?.parent === publication?.id && (
            <div key={txn.id}>
              <QueuedPublication txn={txn} />
            </div>
          )
      )}
      {comments?.map((comment, index) =>
        comment?.__typename !== 'Comment' || comment.isHidden ? null : (
          <SinglePublication
            key={`${comment.id}`}
            isFirst={index === 0}
            isLast={index === comments.length - 1}
            publication={comment as Comment}
            showType={false}
          />
        )
      )}
      {hasMore ? <span ref={observe} /> : null}
    </Card>
  );
};

export default Feed;
